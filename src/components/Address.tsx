import { useTranslations } from "next-intl";
import Image from "next/image";
const Address = () => {
  const t = useTranslations();
  return (
    <div className="sm:w-1/3">
      <div className="flex flex-col items-end">
        <h1 className="text-xl font-semibold mb-6 ">{t("delivery address")}</h1>
        <p className="mb-10">{t("68 New Mexico 291,New York,usa")}</p>
        <div className="flex flex-row-reverse gap-6">
          <div className="img self-end">
            <Image
              src="/asking-questions.avif"
              alt="asking-questions"
              height={150}
              width={150}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col h-40 justify-around">
            <h1 className="font-semibold">
              {t("there is problem in your shipment?")}
            </h1>
            <button className="bg-primary-red text-white px-8 py-2 rounded-2xl w-full">
              {t("report a problem")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
