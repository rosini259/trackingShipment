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
  let checkOne = ""; // not used now
  let checkTwo = ""; // not used now
  let checkThree = ""; // not used now
  let checkFour = "";
  switch (data.CurrentStatus?.state) {
    case "DELIVERED":
      stateColor = "text-green-500";
      progressOne = "bg-emerald-700";
      progressTwo = "bg-emerald-700";
      progressThree = "bg-emerald-700";
      break;
    case "DELIVERED_TO_SENDER":
      stateColor = "text-yellow-500";
      progressOne = "bg-yellow-500";
      progressTwo = "bg-yellow-500";
      progressThree = "bg-transparent";
      checkFour = "hidden";
      break;
    case "CANCELLED":
      stateColor = "text-primary-red";
      progressOne = "bg-primary-red";
      progressTwo = "bg-primary-red";
      progressThree = "bg-transparent";
      checkFour = "hidden";
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
    <div className="flex justify-around my-20 h-[30vh]">
      {shipmentNumberState ? (
        <div className="border rounded-md w-[90%] flex flex-wrap h-auto">
          <div className="w-full border-b border-gray-400 flex justify-around">
            <div className="flex flex-wrap">
              <div className="w-full mx-2 my-2 text-gray-500">
                {`${t("shippment number")} ${data.TrackingNumber}`}
              </div>
              <div className={`w-full mx-2 my-2 font-bold  ${stateColor}`}>
                {data.CurrentStatus
                  ? `${t(`${data.CurrentStatus.state}`)}`
                  : "Loading..."}
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full mx-2 my-2 text-gray-500">
                {t("last update")}
              </div>
              <div className="w-full mx-2 my-2 font-bold">
                {data.CurrentStatus &&
                  `${dayName} ${data.CurrentStatus.timestamp.replace(
                    /T\d{2}:\d{2}:\d{2}\.\d{3}Z/,
                    ""
                  )} ${dateConverterToTime(`${dateLastUpdate}`)}`}
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full mx-2 my-2 text-gray-500">
                {t("trader name")}
              </div>
              <div className="w-full mx-2 my-2 font-bold">{t("amazon")}</div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full mx-2 my-2 text-gray-500">
                {t("delivery time")}
              </div>
              <div className="w-full mx-2 my-2 font-bold">
                {data.PromisedDate
                  ? `${data.PromisedDate.replace(
                      /T\d{2}:\d{2}:\d{2}\.\d{3}Z/,
                      ""
                    )}`
                  : "Loading..."}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-wrap">
            <div className="progressbar w-full flex justify-center items-center">
              <div className={`${checkOne}`}>✔️</div>
              <div className={`h-1 w-[30%]  ${progressOne}`}></div>
              <div className={`${checkTwo}`}>✔️</div>
              <div className={`h-1 w-[30%]  ${progressTwo}`}></div>
              <div className={`${checkThree}`}>✔️</div>
              <div className={`h-1 w-[30%]  ${progressThree} `}></div>
              <div className={`${checkFour}`}>✔️</div>
            </div>
            <div className="w-full flex justify-between items-center mx-2">
              <div className="">{t("The shipment has been created")}</div>
              <div className="">
                {t("The shipment has been received from the trader")}
              </div>
              <div className="">
                <div className="">{t("The shipment went for delivery")}</div>
                {data.CurrentStatus?.state == "DELIVERED_TO_SENDER" && (
                  <div className="text-center text-yellow-500">
                    {t(`${Reason}`)}
                  </div>
                )}
                {data.CurrentStatus?.state == "CANCELLED" && (
                  <div className="text-center text-primary-red">
                    {t(`${Reason}`)}
                  </div>
                )}
              </div>
              <div className="">{t("Delivered")}</div>
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
