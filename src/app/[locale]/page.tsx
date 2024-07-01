"use client";
import NavBar from "@/components/NavBar";
import ShippmentStatus from "@/components/ShippmentStatus";
import store from "../../store/store";
import { Provider } from "react-redux";
import Table from "@/components/Table";
export default function Home({ params }: { params: { locale: string } }) {
  const lang = params.locale;
  return (
    <Provider store={store}>
      <main dir={lang === "en" ? "ltr" : "rtl"}>
        <NavBar />
        <hr />
        <ShippmentStatus />
        <Table />
      </main>
    </Provider>
  );
}
