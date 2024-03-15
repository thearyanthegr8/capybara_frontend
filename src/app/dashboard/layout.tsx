"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./_sidebar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database.types";
import { InferGetServerSidePropsType } from "next";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <section className="p-8 w-full">{children}</section>
    </main>
  );
}

export default layout;
