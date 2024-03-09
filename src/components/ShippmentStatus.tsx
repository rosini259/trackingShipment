"use client";
import { RootState } from "@/app/store";
import { newData, showUi } from "@/features/counter/shipmentSlice";
import data from "@/types";
import { dateConverterToTime, fetchdata } from "@/utils";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const ShippmentStatus = () => {
  const dispatch = useDispatch();
  const data: data = useSelector((state: RootState) => state.newData.value);
  const shipmentNumberState = useSelector(
    (state: RootState) => state.shipmentNumber.value
  );
  useEffect(() => {
    if (shipmentNumberState != 0) {
      fetchdata(shipmentNumberState).then((data) => {
        dispatch(newData(data));
      });
    }
  }, [dispatch, shipmentNumberState]);

  const t = useTranslations();

  const dateLastUpdate = data.CurrentStatus
    ? new Date(data.CurrentStatus.timestamp)
    : new Date();

  const days = [
    t("Sunday"),
    t("Monday"),
    t("Tuesday"),
    t("Wednesday"),
    t("Thursday"),
    t("Friday"),
    t("Saturday"),
  ];
  const dayName = days[dateLastUpdate.getUTCDay()];

  let stateColor = "";
  let progressOne = "";
  let progressTwo = "";
  let progressThree = "";
  let progressFour = "";
  let checkOne = ""; // not used now
  let checkTwo = ""; // not used now
  let checkThree = ""; // not used now
  let checkFour = "";
  let CurrentStatusState = data.CurrentStatus?.state;
  switch (CurrentStatusState) {
    case "DELIVERED":
      stateColor = "text-green-500";
      progressOne = "bg-emerald-700";
      progressTwo = "bg-emerald-700";
      progressThree = "bg-emerald-700";
      progressFour = "bg-emerald-700";
      break;
    case "DELIVERED_TO_SENDER":
      stateColor = "text-yellow-500";
      progressOne = "bg-yellow-500";
      progressTwo = "bg-yellow-500";
      progressThree = "bg-gray-300";
      checkFour = "border shadow bg-white";
      break;
    case "CANCELLED":
      stateColor = "text-primary-red";
      progressOne = "bg-primary-red";
      progressTwo = "bg-primary-red";
      progressThree = "bg-gray-300";
      checkFour = "border shadow bg-white";
      break;

    default:
      break;
  }
  let Reason = "";
  data.TransitEvents?.map((e) => {
    if (e.reason != undefined) {
      Reason = e.reason;
    }
  });
  useEffect(() => {
    shipmentNumberState && dispatch(showUi(true));
  }, [dispatch, shipmentNumberState]);
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
                className={`w-full mx-2 my-2 font-semibold text-xl  ${stateColor} text-start`}
              >
                {data.CurrentStatus
                  ? `${t(`${data.CurrentStatus.state}`)}`
                  : "Loading..."}
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
                {CurrentStatusState === "DELIVERED" && (
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
                )}
                {CurrentStatusState === "DELIVERED_TO_SENDER" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    height="20"
                    width="20"
                  >
                    <path
                      fill="#ffffff"
                      d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                    />
                  </svg>
                )}
                {CurrentStatusState === "CANCELLED" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    height="20"
                    width="20"
                  >
                    <path
                      fill="#ffffff"
                      d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                    />
                  </svg>
                )}
              </div>
              <div
                className={`h-1 w-[30%] ${progressThree} max-sm:hidden `}
              ></div>
              <div
                className={`${checkFour}  ${
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
