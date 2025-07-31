"use client";
import React, { Component } from "react";
import { Input } from "@/components/ui/input";
const ImputPage = () => {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-2xl font-bold">Enter Your Gemini API key to use Digitize</h1>
        <Input />
      </div>
    </main>
  );
};

export default ImputPage;
