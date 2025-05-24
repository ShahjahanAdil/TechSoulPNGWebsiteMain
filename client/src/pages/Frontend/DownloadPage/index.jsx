import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Dcards from "../../../Components/Dcards";
import Loader from "../../../Components/Loader";
import axios from "axios";
import { useAuthContext } from "../../../contexts/AuthContext";
import Search from "../../../components/Search";

export default function DownloadPage() {

    const { imageID } = useParams();
    const { userData, dispatch } = useAuthContext()
    const { pathname } = useLocation()

    const [imageDets, setImageDets] = useState({});
    const [similarImages, setSimilarImages] = useState([]);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [loading, setLoading] = useState(true);
    const [downloadLoading, setDownloadLoading] = useState(false);

    useEffect(() => {
        fetchImage()
    }, [pathname])

    useEffect(() => {
        if (imageDets.imageID) {
            fetchSimilarImages()
        }
    }, [imageDets, pathname])

    useEffect(() => {
        if (!imageDets?.imageURL) return;

        const img = new Image();
        img.src = `${import.meta.env.VITE_HOST}${imageDets.imageURL}`;

        img.onload = () => {
            setDimensions({
                width: img.naturalWidth,
                height: img.naturalHeight,
            });
        };
    }, [imageDets]);

    const fetchImage = () => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_HOST}/frontend/image?imageID=${imageID}`)
            .then((res) => {
                const { status, data } = res;
                if (status === 200) {
                    setImageDets(data.img);
                }
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchSimilarImages = () => {
        axios.get(`${import.meta.env.VITE_HOST}/frontend/similar-images?imageCategory=${imageDets?.category}`)
            .then((res) => {
                const { status, data } = res;
                if (status === 200) {
                    setSimilarImages(data.similarImgs);
                }
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
            })
    };

    const handleDownload = async () => {
        try {
            if (!userData.userID) {
                return window.toastify("Please login to continue downloading!", "info")
            }

            const isFreeUser = userData.plan === "free";
            const isFreeImage = imageDets.license === "free";

            if (isFreeUser && !isFreeImage) {
                return window.toastify("Upgrade to premium to download this image!", "error");
            }

            setDownloadLoading(true)
            const res = await axios.post(`${import.meta.env.VITE_HOST}/frontend/image/download/${imageID}?imageURL=${imageDets.imageURL}`, {
                userID: userData.userID,
            });

            const { status, data } = res;

            if (status === 200) {
                window.toastify(data.message, "success");

                dispatch({
                    type: "SET_PROFILE",
                    payload: { user: { ...userData, dailyDownloadCount: data.dailyDownloadCount, }, },
                });

                const response = await fetch(
                    `${import.meta.env.VITE_HOST}${imageDets.imageURL}`,
                    { mode: "cors" }
                );

                const blob = await response.blob();
                const blobUrl = URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = blobUrl;
                link.download = imageDets.title || "download.png";
                document.body.appendChild(link);
                link.click();
                link.remove();

                URL.revokeObjectURL(blobUrl);
            }
        } catch (err) {
            window.toastify(err.response?.data?.message || "Download failed", "error");
            console.error("Download failed:", err);
        } finally {
            setDownloadLoading(false)
        }
    };


    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Search />
            <Dcards imageDets={imageDets} setImageDets={setImageDets} similarImages={similarImages} setSimilarImages={setSimilarImages} dimensions={dimensions} handleDownload={handleDownload} downloadLoading={downloadLoading} />
        </>
    );
}
