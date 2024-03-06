"use client";

import { RootState } from "@/app/store";
import data from "@/types";
import { dateConverterToTime } from "@/utils";
import { useSelector } from "react-redux";
import Address from "./Address";
import { useTranslations } from "next-intl";

const Table = () => {
  const showUi = useSelector((state: RootState) => state.showUi.value);
  const data: data = useSelector((state: RootState) => state.newData.value);
  const t = useTranslations();
  // console.log(data);
  return (
    <>
      {showUi && (
        <div className="">
          <h1 className="font-bold text-xl mr-8 mb-4 text-end">
            {t("shipment details")}
          </h1>
          <div className="flex justify-between flex-row-reverse max-sm:justify-center max-sm:flex-wrap gap-3">
            <table className="h-[35vh] w-[60%] max-sm:w-[100%]">
              <thead>
                <tr>
                  <th>{t("details")}</th>
                  <th>{t("time")}</th>
                  <th>{t("date")}</th>
                  <th>{t("hub")}</th>
                </tr>
              </thead>
              <tbody>
                {data.TransitEvents?.map((event) => (
                  <tr key={event.timestamp} className="text-center h-10 ">
                    <td className="px-2">
                      <div className="">
                        {event.state}
                        <div className="text-yellow-500">{event.reason}</div>
                      </div>
                    </td>
                    <td className="px-2">
                      {dateConverterToTime(event.timestamp)}
                    </td>
                    <td className="px-2">
                      {event.timestamp.replace(
                        /T\d{2}:\d{2}:\d{2}\.\d{3}Z/,
                        ""
                      )}
                    </td>
                    <td className="px-2">{event.hub}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Address />
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
