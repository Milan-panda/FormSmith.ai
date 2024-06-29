"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-5 border-b shadow-sm">
      <div className="flex justify-between">
        <Link href="/" className="text-lg">
          FormSmith <span className="text-violet-800">.</span>
        </Link>
        {isSignedIn ? (
          <div className="flex items-center gap-5">
            <Button variant="outline">Dashboard</Button>
            <UserButton />
          </div>
        ) : (
          <SignInButton>
            <Button>Get Started</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
};

export default Header;
