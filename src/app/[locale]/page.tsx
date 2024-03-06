"use client";
import NavBar from "@/components/NavBar";
import ShippmentStatus from "@/components/ShippmentStatus";
import store from "../store";
import { Provider } from "react-redux";
import Table from "@/components/Table";
export default function Home() {
  return (
    <Provider store={store}>
      <main>
        <NavBar />
        <hr />
        <ShippmentStatus />
        <Table />
      </main>
    </Provider>
  );
}
