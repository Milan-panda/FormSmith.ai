"use client";
import { SignedIn, SignIn } from "@clerk/nextjs";
import React from "react";
import SideNavbar from "./_components/SideNavbar";

const DashboardLayout = ({ children }: any) => {
  return (
    <SignedIn>
      <div className="md:w-64 fixed">
        <SideNavbar />
      </div>
      <div className="md:ml-64">{children}</div>
    </SignedIn>
  );
};

export default DashboardLayout;
