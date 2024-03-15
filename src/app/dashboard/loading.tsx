import { Icons } from "@/components/ui/icons";
import React from "react";

function loading() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Icons.spinner className="animate-spin" color="black" />
    </div>
  );
}

export default loading;
