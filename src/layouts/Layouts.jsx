import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Home from "../components/Home";
import Department from "../components/Department";

export default function Layout() {
  return (
    <>
      
      <Department/>
    </>
  );
}
