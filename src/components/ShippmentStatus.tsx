"use client";

import useShippmentStatus from "@/hooks/useShippmentStatus";
import { dateConverterToTime } from "@/utils/dateConverterToTime";
import ProgressbarStatus from "./common/ProgressbarStatus";

const ShippmentStatus = () => {
  const {
    data,
    shipmentNumberState,
    stateColor,
    dateLastUpdate,
    CurrentStatusState,
    Reason,
    progressOne,
    progressTwo,
    progressThree,
    progressFour,
    checkFour,
    t,
    dayName,
    checkOne,
    checkTwo,
    checkThree,
  } = useShippmentStatus();
  return (
    <div className="container flex justify-center my-12 h-[30vh] max-sm:h-[100vh]">
      {shipmentNumberState ? (
        <div className="border rounded-md w-full flex flex-wrap h-auto px-3">
          <div className="w-full border-b border-gray-400 flex justify-between gap-4 max-sm:flex-wrap">
            <div className="flex flex-wrap">
              <div className="w-full mx-2 my-2 text-gray-400 text-lg text-start">
                {`${t("shippment number")} ${data.TrackingNumber}`}
              </div>
              <div
                className={`w-full mx-2 my-2 font-semibold text-xl ${stateColor} text-start`}
              >
                {data.CurrentStatus && `${t(`${data.CurrentStatus.state}`)}`}
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full mx-2 my-2 text-gray-400 text-lg">
                {t("last update")}
              </div>
              <div className="w-full mx-2 my-2 font-semibold text-xl">
                {data.CurrentStatus &&
                  `${dayName} ${data.CurrentStatus.timestamp.replace(
                    /T\d{2}:\d{2}:\d{2}\.\d{3}Z/,
                    ""
                  )} ${dateConverterToTime(`${dateLastUpdate}`)}`}
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full mx-2 my-2 text-gray-400 text-lg ">
                {t("trader name")}
              </div>
              <div className="w-full mx-2 my-2 font-semibold text-xl ">
                {t("amazon")}
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full mx-2 my-2 text-gray-400 text-lg text-end max-sm:text-start">
                {t("delivery time")}
              </div>
              <div className="w-full mx-2 my-2 font-semibold text-xl text-end max-sm:text-start">
                {data.PromisedDate
                  ? `${data.PromisedDate.replace(
                      /T\d{2}:\d{2}:\d{2}\.\d{3}Z/,
                      ""
                    )}`
                  : "Loading..."}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-wrap max-sm:flex-nowrap">
            <div className="progressbar w-full flex justify-center items-center max-sm:flex-wrap max-sm:w-auto max-sm:justify-around max-sm:flex-col">
              <div
                className={`${checkOne} w-7 h-7 rounded-full ${progressOne} text-white flex justify-center items-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  height="18"
                  width="18"
                >
                  <path
                    fill="#ffffff"
                    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                  />
                </svg>
              </div>
              <div
                className={`h-1 w-[30%]  ${progressOne} max-sm:hidden`}
              ></div>
              <div
                className={`${checkTwo} w-7 h-7 rounded-full ${progressTwo} text-white flex justify-center items-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  height="18"
                  width="18"
                >
                  <path
                    fill="#ffffff"
                    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                  />
                </svg>
              </div>
              <div
                className={`h-1 w-[30%]  ${progressTwo} max-sm:hidden`}
              ></div>
              <div
                className={`${checkThree} ${
                  CurrentStatusState === "DELIVERED" ? "w-7 h-7" : "w-12 h-12"
                }  rounded-full ${progressTwo} text-white flex justify-center items-center`}
              >
                <ProgressbarStatus CurrentStatusState={CurrentStatusState} />
              </div>
              <div
                className={`h-1 w-[30%] ${progressThree} max-sm:hidden `}
              ></div>
              <div
                className={`dedede${checkFour}  ${
                  CurrentStatusState === "DELIVERED" ? "w-7 h-7" : "w-12 h-12"
                } rounded-full ${progressFour} ${checkFour} text-white flex justify-center items-center`}
              >
                {CurrentStatusState === "DELIVERED" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    height="18"
                    width="18"
                  >
                    <path
                      fill="#ffffff"
                      d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    fill="#000000"
                    height="25"
                    width="25"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#bdbdbd"
                      d="M26 5.25h-2c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h1.25v22.5h-18.5v-22.5h1.25c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0h-2c-0.414 0-0.75 0.336-0.75 0.75v0 24c0 0.414 0.336 0.75 0.75 0.75h20c0.414-0 0.75-0.336 0.75-0.75v0-24c-0-0.414-0.336-0.75-0.75-0.75v0zM23.1 15.3h-7.133c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75h7.133c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM8.438 17.234l1.010 1.002 0.015 0.006 0.007 0.015c0.131 0.122 0.306 0.197 0.5 0.197 0.202 0 0.385-0.082 0.517-0.214v0l0.021-0.009 0.004-0.009 0.018-0.013 3.028-3.311c0.123-0.133 0.199-0.312 0.199-0.508 0-0.414-0.336-0.75-0.75-0.75-0.22 0-0.418 0.095-0.555 0.246l-0.001 0.001-2.501 2.733-0.455-0.452c-0.135-0.13-0.318-0.21-0.521-0.21-0.414 0-0.75 0.336-0.75 0.75 0 0.204 0.082 0.39 0.214 0.525l-0-0zM16.033 22.145c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h7.133c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM8.283 22.895c0 0 0 0 0 0 0 1.157 0.938 2.094 2.094 2.094s2.094-0.938 2.094-2.094c0-1.157-0.938-2.094-2.094-2.094-0 0-0 0-0.001 0h0c-1.156 0.002-2.092 0.938-2.094 2.094v0zM11 8.749h10c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0h-2.019c0.477-0.616 0.766-1.398 0.769-2.248v-0.001c0-2.071-1.679-3.75-3.75-3.75s-3.75 1.679-3.75 3.75v0c0.003 0.851 0.292 1.633 0.775 2.258l-0.006-0.009h-2.019c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0zM16 2.75c1.242 0 2.249 1.007 2.249 2.25s-1.007 2.25-2.25 2.25c-1.242 0-2.249-1.007-2.25-2.249v-0c0.002-1.242 1.008-2.248 2.25-2.25h0z"
                    ></path>
                  </svg>
                )}
              </div>
            </div>
            <div className="w-full flex justify-between items-center mx-2 max-sm:flex-wrap max-sm:flex-col max-sm:justify-around">
              <div className="font-semibold">
                {t("The shipment has been created")}
              </div>
              <div className="font-semibold">
                {t("The shipment has been received from the trader")}
              </div>
              <div className="">
                <div className="font-semibold">
                  {t("The shipment went for delivery")}
                </div>
                {data.CurrentStatus?.state == "DELIVERED_TO_SENDER" && (
                  <div className="text-center  text-yellow-500">
                    {t(`${Reason}`)}
                  </div>
                )}
                {data.CurrentStatus?.state == "CANCELLED" && (
                  <div className="text-center text-primary-red">
                    {t(`${Reason}`)}
                  </div>
                )}
              </div>
              <div className="font-semibold">{t("Delivered")}</div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="font-semibold text-2xl mt-24">
          {t("there is no data to show")}
        </h1>
      )}
    </div>
  );
};

export default ShippmentStatus;
