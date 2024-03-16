"use client";
import { Icons } from "@/components/ui/icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";

function Page() {
  const [qrData, setQrData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // async function redirect(p_id: string) {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`/api/qr?${p_id}`);
  //     router.push(`/prescription/${p_id}`);
  //   } catch (e) {
  //     alert("Invalid QR Code");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  useEffect(() => {
    if (qrData) {
      router.push(`/prescription/${qrData}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrData]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {/* {loading ? (
        <Icons.spinner className="animate-spin h-5 w-5" />
      ) : ( */}
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
      {/* )} */}
      {qrData && <p>Scanned: {qrData}</p>}
    </div>
  );
}

export default Page;
