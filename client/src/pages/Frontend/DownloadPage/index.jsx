import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dsection1 from "../../../Components/Dsection1";
import Dcards from "../../../Components/Dcards";
import Loader from "../../../Components/Loader";
import axios from "axios";
import { useAuthContext } from "../../../contexts/AuthContext";

export default function DownloadPage() {

    const { imageID } = useParams();
    const { userData, dispatch } = useAuthContext()

    const [imageDets, setImageDets] = useState({});
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchImage();
    }, []);

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

    const handleDownload = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_HOST}/frontend/image/download/${imageID}`, {
                userID: userData.userID,
            });

            const { status, data } = res;

            if (status === 200) {
                window.toastify(data.message, "success");

                dispatch({
                    type: "SET_PROFILE",
                    payload: {
                        user: {
                            ...userData,
                            dailyDownloadCount: data.dailyDownloadCount,
                        },
                    },
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
        }
    };


    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Dsection1 />
            <Dcards imageDets={imageDets} dimensions={dimensions} handleDownload={handleDownload} />
        </>
    );
}
