"use client";
import { Sling as Hamburger } from "hamburger-react";
import { shipmentNumber } from "@/store/shipmentSlice";
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
    <nav className="container flex justify-between h-[90px] relative">
      <div className="IMG">
        <Image
          src={"/logo.png"}
          alt="logo"
          height={90}
          width={90}
          priority
          className="object-contain"
        />
      </div>
      <div className="items1 flex gap-10 justify-center items-center max-sm:hidden">
        <a href="#" className="font-semibold text-xl hover:text-primary-red">
          {t("main")}
        </a>
        <a href="#" className="font-semibold text-xl hover:text-primary-red">
          {t("prices")}
        </a>
        <a href="#" className="font-semibold text-xl hover:text-primary-red">
          {t("call sales")}
        </a>
      </div>
      <div className="items2 flex gap-10 justify-center items-center ">
        <button
          className="font-semibold text-xl max-sm:hidden hover:text-primary-red"
          onClick={trackingMenu}
        >
          {t("tracking your shippment")}
        </button>
        <div
          className="menu bg-white py-7 px-9 shadow-2xl border border-gray-300 border-opacity-50 absolute top-[102%] right-[22%] hidden"
          ref={menuRef}
        >
          <div className="flex flex-col gap-3">
            <p className="text-right px-1 py-2">
              {t("tracking your shippment")}
            </p>
            <form className="flex" onSubmit={handleSubmit}>
              <input
                type="text"
                className="border border-gray-400 outline-none rounded-tl-md rounded-bl-md px-2 py-2 "
                ref={inputRef}
                placeholder={t("tracking number")}
              />
              <button
                className="bg-primary-red px-2 py-2 outline-none rounded-tr-md rounded-br-md"
                type="submit"
              >
                <svg
                  className="feather feather-search text-white"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" x2="16.65" y1="21" y2="16.65" />
                </svg>
              </button>
            </form>
          </div>
        </div>
        <span className="h-[40%] w-0 border-r border-gray-400"></span>
        <button className="font-semibold text-xl max-sm:hidden hover:text-primary-red">
          {t("sign in")}
        </button>
        <button
          className="font-semibold text-xl text-primary-red max-sm:hidden"
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
          <div className="bg-white w-full h-[calc(100vh-100px)] absolute top-[100px] left-0">
            <div className="menu-items1 text-center">
              <a href="#" className="font-semibold text-xl block py-10">
                {t("main")}
              </a>
              <hr />
              <a href="#" className="font-semibold text-xl block py-10">
                {t("prices")}
              </a>
              <hr />
              <a href="#" className="font-semibold text-xl block py-10">
                {t("call sales")}
              </a>
              <hr />
              <button className="font-semibold text-xl py-10">
                {t("sign in")}
              </button>
              <hr />
              <button
                className="font-semibold text-xl py-10"
                onClick={trackingMenu}
              >
                {t("tracking your shippment")}
              </button>
              <hr />
              <button
                className="font-semibold text-xl text-primary-red py-10"
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
