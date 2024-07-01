"use client";

import { RootState } from "@/store/store";
import data from "@/types";
import { dateConverterToTime } from "@/utils/dateConverterToTime";
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
        <div className="container h-auto flex sm:justify-between flex-row-reverse max-sm:justify-center max-sm:flex-wrap max-sm:gap-5">
          <div className="flex flex-col max-sm:w-full max-sm:overflow-x-scroll">
            <h1 className="font-semibold text-xl mb-4 text-end">
              {t("shipment details")}
            </h1>
            <div className="h-[45vh] max-sm:h-auto w-full sm:overflow-auto max-sm:overflow-x-scroll">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-gray-500 text-end">{t("details")}</th>
                    <th className="text-gray-500 text-end">{t("time")}</th>
                    <th className="text-gray-500 text-end">{t("date")}</th>
                    <th className="text-gray-500 text-end">{t("hub")}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.TransitEvents?.map((event) => (
                    <tr key={event.timestamp} className="text-end h-10 ">
                      <td className="">
                        <div className="text-sm">
                          {event.state}
                          <div className="text-yellow-500">{event.reason}</div>
                        </div>
                      </td>
                      <td className="text-sm">
                        {dateConverterToTime(event.timestamp)}
                      </td>
                      <td className="text-sm">
                        {event.timestamp.replace(
                          /T\d{2}:\d{2}:\d{2}\.\d{3}Z/,
                          ""
                        )}
                      </td>
                      <td className="text-sm">{event.hub}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Address />
        </div>
      )}
    </>
  );
};

export default Table;
