"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./_sidebar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database.types";
import { InferGetServerSidePropsType } from "next";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex">
      <Sidebar />
      {children}
    </main>
  );
}

export default layout;
