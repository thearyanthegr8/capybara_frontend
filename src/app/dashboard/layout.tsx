"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./_sidebar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database.types";
import { InferGetServerSidePropsType } from "next";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-full min-h-screen h-full overflow-x-hidden">
      <Sidebar />
      <section className="p-8 w-full min-h-screen ml-[20rem]">
        {children}
      </section>
    </main>
  );
}

export default layout;
