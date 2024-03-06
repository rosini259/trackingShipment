import { useTranslations } from "next-intl";

const Address = () => {
    const t = useTranslations()
  return (
    <div className="w-[30%]">
      <div className="flex flex-col items-end">
        <h1 className="text-xl font-bold mb-3">{t("delivery address")}</h1>
        <p className="mb-10">{t("68 New Mexico 291,New York,usa")}</p>
        <button className="bg-primary-red text-white px-8 py-2 rounded-2xl">
          {t("report a problem")}
        </button>
      </div>
    </div>
  );
};

export default Address;
