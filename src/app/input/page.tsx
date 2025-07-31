"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import React, { Component } from "react";
import { Input } from "@/components/ui/input";
const ImputPage = () => {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-2xl font-bold">Enter Your Gemini API key to use Digitize</h1>
        <div className="m-8  flex w-full max-w-md">
          <Input className="mr-2" />
          <Link href="/digitize">
            <Button variant="outline">Submit</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ImputPage;
