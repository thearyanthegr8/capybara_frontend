"use client";
import { usePathname } from "next/navigation";
import React from "react";

function Page() {
  const p_id = usePathname().split("/")[2];

  return (
    <div>
      <h1>{p_id}</h1>
      <h1>hello</h1>
    </div>
  );
}

export default Page;
