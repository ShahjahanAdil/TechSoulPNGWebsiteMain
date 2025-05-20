import React from "react";
import crownImg from "../../../assets/images/crown.png";
import crown from "../../../assets/images/sale-crown.png";
export default function Subscription() {
  return (
    <div className="bg-white h-full rounded-[20px] !p-[30px] shadow-lg">
      <h5 className="!text-[#55AF7C]">Subscriptions</h5>

      {/* Enterprice Plan */}

      <div className="!mt-5 flex w-full flex-col-reverse xl:flex-row justify-between gap-10 !p-8 items-center bg-linear-65 from-[#FDF6ED] to-[#FDF1E4] min-h-[200px] rounded-[12px]">
        <div className="flex flex-col items-center justify-between w-full gap-10">
          {/* Upper Row */}
          <div className="flex flex-col lg:flex-row w-full gap-8">
            <div className="flex flex-col gap-3 justify-center items-center shadow-lg !py-5 flex-1 h-[150px] rounded-[12px] bg-white">
              <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#F88BB0] rounded-full ">
                <svg
                  x-pre=""
                  class="_tea4l2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  fill="none"
                  viewBox="0 0 27 27"
                >
                  <g fill="#fff" clip-path="url(#i1rlkkpha)">
                    <path d="M9.718 12.066C7.765 9.446 7.7 5.744 9.562 3.048c-2.115-.597-4.303.646-5.032 2.86s.242 4.656 2.236 5.62c-3.663.828-6.23 4.377-6.074 8.392 0 1.438.584 1.696 2.766 1.7.584-5.446 3.332-8.23 6.26-9.554"></path>
                    <path d="M17.684 12.544c2.185-1.26 3.292-3.953 2.687-6.536s-2.768-4.39-5.248-4.39-4.643 1.81-5.249 4.39c-.605 2.581.502 5.276 2.687 6.536-3.53.74-7.66 3.253-7.66 10.372 0 1.956 2.368 1.935 10.222 1.935 7.823 0 10.222 0 10.222-1.935 0-7.137-4.143-9.637-7.66-10.372"></path>
                  </g>
                  <defs>
                    <clipPath id="i1rlkkpha">
                      <path fill="#fff" d="M.016.234h26v26h-26z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div>
                <p className="text-center">
                  <span className=" text-[#F24A88] font-bold">
                    Multi-account
                  </span>{" "}
                  teamwork
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center !py-5 shadow-lg flex-1 h-[150px] rounded-[12px] bg-white">
              <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#69D5EE] rounded-full ">
                <svg
                  x-pre=""
                  class="_tea4l2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 30 30"
                >
                  <path
                    fill="#fff"
                    d="M25.387 25.815a.33.33 0 0 1-.225-.315v-.511a.876.876 0 0 0-.875-.876H6.927a.875.875 0 0 0-.876.876v.379a.33.33 0 0 1-.28.328 3.17 3.17 0 0 0-2.683 3.134h24.485a3.17 3.17 0 0 0-2.186-3.015m-18.816-7a.616.616 0 0 0 .776.063.622.622 0 0 0 .08-.963l-3.69-3.498a.616.616 0 0 0-.88.021.616.616 0 0 0 .024.878zm.687 2.11a.62.62 0 0 0-.714-.513l-4.578.754a.622.622 0 1 0 .203 1.227l4.578-.754a.62.62 0 0 0 .511-.714m20.819.006L18.8 12.29l3.335-3.334.002.002a.787.787 0 0 0 1.111 0l.033-.03a.79.79 0 0 0 0-1.114L17.336 1.87a.79.79 0 0 0-1.113 0l-.033.031a.785.785 0 0 0 0 1.113h.002l-8.307 8.307-.002-.002a.79.79 0 0 0-1.112 0l-.03.03a.79.79 0 0 0 0 1.114l5.946 5.947a.79.79 0 0 0 1.113 0l.03-.033a.786.786 0 0 0 0-1.111l-.002-.002 3.334-3.335 8.64 9.276a1.608 1.608 0 0 0 2.67-.495 1.61 1.61 0 0 0-.395-1.78"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="text-center">
                  Industry-leading{" "}
                  <span className="text-[#0083EE] font-bold">
                    legal protection
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* lower Row */}

          <div className="flex flex-col lg:flex-row w-full gap-8">
            <div className="flex flex-col gap-3 justify-center items-center shadow-lg !py-5 flex-1 h-[150px] rounded-[12px] bg-white">
              <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#9794FB] rounded-full ">
                <svg
                  x-pre=""
                  class="_tea4l2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="none"
                  viewBox="0 0 26 26"
                >
                  <g clip-path="url(#i17uvnoza)">
                    <path
                      fill="#fff"
                      d="M22.265 14.504c0-.402.134-.803.134-1.204s0-.802-.134-1.203l2.674-2.005c.267-.134.267-.535.134-.802l-2.54-4.278c-.134-.268-.535-.401-.803-.268l-3.074 1.203c-.669-.534-1.337-.935-2.14-1.203l-.4-3.342c0-.267-.268-.535-.669-.535h-4.946c-.268 0-.535.268-.669.535l-.4 3.342c-.803.268-1.472.669-2.14 1.203L4.217 4.744c-.267-.133-.535 0-.802.268L.875 9.29c-.134.267-.134.534.134.802l2.673 2.005c0 .401-.133.802-.133 1.203s0 .802.133 1.204L1.01 16.509c-.268.134-.268.535-.134.802l2.54 4.278c.134.268.535.401.802.268l3.075-1.204c.668.535 1.337.936 2.14 1.204l.4 3.342c0 .267.268.534.669.534h4.946c.268 0 .535-.267.669-.534l.4-3.343c.803-.267 1.471-.668 2.14-1.203l3.075 1.204c.267.133.534 0 .802-.268l2.54-4.278c.133-.267.133-.535-.134-.802zm-9.224 3.074c-2.407 0-4.278-1.871-4.278-4.278s1.871-4.278 4.278-4.278 4.278 1.872 4.278 4.278c0 2.407-1.872 4.278-4.278 4.278"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="i17uvnoza">
                      <path fill="#fff" d="M.516.734h25v25h-25z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div>
                <p className="text-center">
                  Digital asset{" "}
                  <span className="text-[#754DFD] font-bold">management</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center shadow-lg flex-1 !py-5 h-[150px] rounded-[12px] bg-white">
              <div className="flex items-center justify-center w-[50px] h-[50px] bg-linear-65 from-[#FAA787] to-[#FAC680] rounded-full ">
                <svg
                  x-pre=""
                  class="_tea4l2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="none"
                  viewBox="0 0 26 26"
                >
                  <g clip-path="url(#i17uvnoza)">
                    <path
                      fill="#fff"
                      d="M22.265 14.504c0-.402.134-.803.134-1.204s0-.802-.134-1.203l2.674-2.005c.267-.134.267-.535.134-.802l-2.54-4.278c-.134-.268-.535-.401-.803-.268l-3.074 1.203c-.669-.534-1.337-.935-2.14-1.203l-.4-3.342c0-.267-.268-.535-.669-.535h-4.946c-.268 0-.535.268-.669.535l-.4 3.342c-.803.268-1.472.669-2.14 1.203L4.217 4.744c-.267-.133-.535 0-.802.268L.875 9.29c-.134.267-.134.534.134.802l2.673 2.005c0 .401-.133.802-.133 1.203s0 .802.133 1.204L1.01 16.509c-.268.134-.268.535-.134.802l2.54 4.278c.134.268.535.401.802.268l3.075-1.204c.668.535 1.337.936 2.14 1.204l.4 3.342c0 .267.268.534.669.534h4.946c.268 0 .535-.267.669-.534l.4-3.343c.803-.267 1.471-.668 2.14-1.203l3.075 1.204c.267.133.534 0 .802-.268l2.54-4.278c.133-.267.133-.535-.134-.802zm-9.224 3.074c-2.407 0-4.278-1.871-4.278-4.278s1.871-4.278 4.278-4.278 4.278 1.872 4.278 4.278c0 2.407-1.872 4.278-4.278 4.278"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="i17uvnoza">
                      <path fill="#fff" d="M.516.734h25v25h-25z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div>
                <p className="text-center">
                  <span className="text-[#F74D3F] font-bold">Copyright</span>{" "}
                  protection
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full max-w-[250px] justify-center items-center gap-5">
          <img src={crownImg} alt="" className="w-[100px]" />
          <p className="!text-[24px] font-bold">Enterprice Plan</p>
          <button className="w-full bg-linear-to-t from-[#dfab62] to-[#fdce87]  !py-4 font-bold !text-[16px] !text-white rounded-[12px]">
            Join Enterprice Plan Now
          </button>
        </div>
      </div>

      {/* Individual Plan */}

      <div className="!mt-5 w-full flex flex-col-reverse xl:flex-row justify-between gap-10 !p-8 items-center bg-linear-65 from-[#FDF6ED] to-[#FDF1E4] min-h-[200px] rounded-[12px]">
        <div className="flex flex-1 flex-col items-center w-full justify-between gap-10">
          {/* Upper Row */}
          <div className="flex flex-col lg:flex-row w-full gap-8">
            <div className="flex flex-col gap-3 justify-center items-center !py-5 shadow-lg flex-1 h-[150px] rounded-[12px] bg-white">
              <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#F88BB0] rounded-full ">
                <svg
                  x-pre=""
                  class="_tea4l2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="none"
                  viewBox="0 0 26 26"
                >
                  <g fill="#fff" clip-path="url(#ioh77ana)">
                    <path d="m1.345 10.098 11.22 6.843a.86.86 0 0 0 .9 0l11.22-6.843a.863.863 0 0 0 0-1.474L13.463 1.782a.86.86 0 0 0-.899 0L1.345 8.624a.863.863 0 0 0 0 1.474"></path>
                    <path d="m23.803 12.536-10.787 6.577L2.23 12.536a.833.833 0 1 0-.867 1.423l11.22 6.842a.84.84 0 0 0 .867 0l11.22-6.842a.834.834 0 0 0-.867-1.423"></path>
                    <path d="m23.803 16.419-10.787 6.577L2.23 16.419a.835.835 0 0 0-1.257.583.83.83 0 0 0 .39.84l11.22 6.842a.84.84 0 0 0 .867 0l11.22-6.842a.834.834 0 0 0-.867-1.423"></path>
                  </g>
                  <defs>
                    <clipPath id="ioh77ana">
                      <path fill="#fff" d="M.516.734h25v25h-25z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div>
                <p className="text-center">
                  <span className="text-[#F24A88] font-bold">8,000,000+</span>{" "}
                  curated assets
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center shadow-lg !py-5 flex-1 h-[150px] rounded-[12px] bg-white">
              <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#69D5EE] rounded-full ">
                <svg
                  x-pre=""
                  class="_tea4l2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="23"
                  fill="none"
                  viewBox="0 0 20 23"
                >
                  <path
                    fill="#fff"
                    d="M12.11.234a2.095 2.095 0 0 1 2.094 2.095v9.426h4.2a1.571 1.571 0 0 1 1.034 2.752l-8.381 7.339a1.57 1.57 0 0 1-2.069 0L.595 14.508a1.57 1.57 0 0 1 1.035-2.753h4.195V2.329A2.095 2.095 0 0 1 7.92.234z"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="text-center">
                  <span className="text-[#0083EE] font-bold">Unlimited</span>{" "}
                  downloads forever
                </p>
              </div>
            </div>
          </div>

          {/* lower Row */}
          <div className="flex flex-col lg:flex-row w-full gap-8">
            <div className="flex flex-col gap-3 justify-center items-center shadow-lg !py-5 flex-1 h-[150px] rounded-[12px] bg-white">
              <div className="flex items-center justify-center w-[50px] h-[50px] bg-[#9794FB] rounded-full ">
                <svg
                  x-pre=""
                  class="_tea4l2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="none"
                  viewBox="0 0 26 26"
                >
                  <g clip-path="url(#i6ubzcja)">
                    <path
                      fill="#fff"
                      d="M13.016.734c6.9 0 12.5 5.6 12.5 12.5s-5.6 12.5-12.5 12.5-12.5-5.6-12.5-12.5 5.6-12.5 12.5-12.5m0 6.25c-3.45 0-6.25 2.8-6.25 6.25a6.252 6.252 0 0 0 11.61 3.215l-2.144-1.285a3.75 3.75 0 1 1 .001-3.858l2.143-1.288a6.25 6.25 0 0 0-5.36-3.034"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="i6ubzcja">
                      <path fill="#fff" d="M.516.734h25v25h-25z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div>
                <p className="text-center">
                  Valid{" "}
                  <span className="text-[#754DFD] font-bold">commercial</span>{" "}
                  licenses
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 justify-center items-center shadow-lg flex-1 !py-5 h-[150px] rounded-[12px] bg-white">
              <div className="flex items-center justify-center w-[50px] h-[50px] bg-linear-65 from-[#FAA787] to-[#FAC680] rounded-full ">
                <svg
                  x-pre=""
                  class="_tea4l2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="none"
                  viewBox="0 0 25 25"
                >
                  <g clip-path="url(#i1gzt5ga)">
                    <path
                      fill="#fff"
                      d="M.016 10.838C3.15-2.278 16.343 2.734 16.353 2.734l.862-1.856c.808-1.281 2.023-.205 2.023-.205l3.896 6.517c.724 1.336-.909 1.754-.909 1.754l-7.153 1.587c-2.55.38-1.762-1.439-1.762-1.439l.872-1.856C3.513 3.31.016 10.838.016 10.838m7.839 10.814-.817 1.921c-.788 1.346-2.013.27-2.013.27l-4.082-6.6c-.76-1.356.863-1.82.863-1.82l7.134-1.8c2.542-.455 1.81 1.438 1.81 1.438l-.836 1.922c10.799 3.778 14.102-4.029 14.102-4.029-2.802 13.524-16.161 8.698-16.161 8.698"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="i1gzt5ga">
                      <path fill="#fff" d="M.016.234h24v24h-24z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div>
                <p className="text-center">
                  Content is{" "}
                  <span className="text-[#F74D3F] font-bold">
                    updated continuously
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center w-full max-w-[250px] items-center gap-5">
          <img src={crown} alt="" className="w-[100px]" />
          <p className="!text-[24px] font-bold">Individual Plan</p>
          <button className="w-full bg-linear-to-r from-[#ffc76b] whitespace-nowrap to-[#ff910f] !py-[8px] md:!py-4 font-bold !text-[14px] md:!text-[16px] !text-white rounded-[12px]">
            Go Premium
          </button>
        </div>
      </div>
    </div>
  );
}
