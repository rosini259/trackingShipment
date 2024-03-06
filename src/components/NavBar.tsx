"use client";
import { Sling as Hamburger } from "hamburger-react";
import { shipmentNumber } from "@/features/counter/shipmentSlice";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const switchLang = () => {
    if (pathname == "/en") router.push("ar");
    if (pathname == "/ar") router.push("en");
  };

  const trackingMenu = () => {
    const menu = menuRef.current;
    menu?.classList.toggle("hidden");
    setIsOpen(false);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = inputRef.current?.value || "";
    dispatch(shipmentNumber(value));
    const menu = menuRef.current;
    menu?.classList.toggle("hidden");
  };

  return (
    <nav className="flex justify-around h-[100px] relative">
      <div className="IMG">
        <Image
          src={"/logo.png"}
          alt="logo"
          height={100}
          width={100}
          priority
          className="object-contain"
        />
      </div>
      <div className="items1 flex gap-10 justify-center items-center max-sm:hidden">
        <a href="#" className="font-bold text-xl">
          {t("main")}
        </a>
        <a href="#" className="font-bold text-xl">
          {t("prices")}
        </a>
        <a href="#" className="font-bold text-xl">
          {t("call sales")}
        </a>
      </div>
      <div className="items2 flex gap-10 justify-center items-center ">
        <button
          className="font-bold text-xl max-sm:hidden"
          onClick={trackingMenu}
        >
          {t("tracking your shippment")}
        </button>
        <div
          className="menu border border-gray-600 border-opacity-50 absolute top-[102%] right-[22%] hidden"
          ref={menuRef}
        >
          <p className="text-right px-1 py-2">{t("tracking your shippment")}</p>
          <form className="flex" onSubmit={handleSubmit}>
            <input
              type="text"
              className="ml-2 my-3 border border-gray-400 outline-none"
              ref={inputRef}
            />
            <button
              className="bg-primary-red px-2 py-2 mx-1 my-1 outline-none"
              type="submit"
            >
              search
            </button>
          </form>
        </div>
        <button className="font-bold text-xl max-sm:hidden">
          {t("sign in")}
        </button>
        <button
          className="font-bold text-xl text-primary-red max-sm:hidden"
          onClick={switchLang}
        >
          {pathname == "/en" ? "عربي" : "ENG"}
        </button>
      </div>
      <div className="burger-icon flex justify-center items-center max-sm:flex sm:hidden">
        <Hamburger
          direction="left"
          size={25}
          toggled={isOpen}
          toggle={setIsOpen}
          
        />
        {isOpen && (
          <div className="bg-gray-800 w-full h-[calc(100vh-100px)] absolute top-[100px] left-0">
            <div className="menu-items1 text-center">
              <a href="#" className="font-bold text-xl block py-10">
                {t("main")}
              </a>
              <hr />
              <a href="#" className="font-bold text-xl block py-10">
                {t("prices")}
              </a>
              <hr />
              <a href="#" className="font-bold text-xl block py-10">
                {t("call sales")}
              </a>
              <hr />
              <button className="font-bold text-xl py-10">
                {t("sign in")}
              </button>
              <hr />
              <button
                className="font-bold text-xl py-10"
                onClick={trackingMenu}
              >
                {t("tracking your shippment")}
              </button>
              <hr />
              <button
                className="font-bold text-xl text-primary-red py-10"
                onClick={switchLang}
              >
                {pathname == "/en" ? "عربي" : "ENG"}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
