"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";

function Page() {
  const [qrData, setQrData] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (qrData) {
      router.push(`/prescription/${qrData}`);
    }
  }, [qrData, router]);

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
        className={"w-full h-full"}
        constraints={{ facingMode: "environment" }}
      />
      {qrData && <p>Scanned: {qrData}</p>}
    </div>
  );
}

export default Page;
