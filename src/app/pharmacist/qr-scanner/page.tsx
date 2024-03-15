"use client";
import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";

function Page() {
  const [qrData, setQrData] = useState<string | null>(null);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            console.log(result?.getText());
            setQrData(result?.getText());
          }

          if (!!error) {
            // console.info(error);
          }
        }}
        className={"w-[300px] h-[300px]"}
        constraints={{ facingMode: "environment" }}
      />
      {qrData && <p className="text-2xl mt-4">{qrData}</p>}
    </div>
  );
}

export default Page;
