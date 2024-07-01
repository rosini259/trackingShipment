import { newData } from "@/store/newDataSlice";
import { showUi } from "@/store/showUiSlice";
import { RootState } from "@/store/store";
import IData from "@/types";
import { fetchData } from "@/utils/fetchData";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useShippmentStatus = () => {
  const dispatch = useDispatch();
  const data: IData = useSelector((state: RootState) => state.newData.value);
  const shipmentNumberState = useSelector(
    (state: RootState) => state.shipmentNumber.value
  );
  useEffect(() => {
    if (shipmentNumberState != 0) {
      fetchData(shipmentNumberState).then((data) => {
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
  let CurrentStatusState = data.CurrentStatus?.state as string
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

  return {
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
  };
};

export default useShippmentStatus;
