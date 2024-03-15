"use client";
import { Icons } from "@/components/ui/icons";
import { Database } from "@/lib/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { custom } from "zod";

function Page() {
  const p_id = usePathname().split("/")[2];
  const [loading, setLoading] = useState(true);
  const [prescription, setPrescription] = useState(null);
  const [userSession, setUserSession] = useState(false);
  const [code, setCode] = useState("");
  const [responseCode, setResponseCode] = useState<number>();

  const supabase = createClientComponentClient<Database>();

  const fetchData = async (customer_code?: string) => {
    setLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log(session);

      if (session) {
        setUserSession(true);
        const response = await axios.get(`/api/prescription/view?p_id=${p_id}`);
        setResponseCode(response.status);
        setPrescription(response.data);
      } else {
        setUserSession(false);
        if (customer_code !== undefined) {
          const response = await axios.get(
            `/api/prescription/view?p_id=${p_id}&customer_code=${customer_code}`
          );
          setResponseCode(response.status);
          setPrescription(response.data);
        }
      }
    } catch (error) {
      console.error("Error fetching prescription:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(responseCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p_id, supabase.auth]);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Icons.spinner className="animate-spin h-5 w-5" />
      </div>
    );
  } else if (responseCode === 200 && prescription) {
    return (
      <div>
        <h1>{p_id}</h1>
        <h1>hello</h1>
      </div>
    );
  } else if (responseCode === 404) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <h1>Prescription not found</h1>
      </div>
    );
  } else {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <InputOTP
          maxLength={6}
          value={code}
          onChange={(e: any) => setCode(e)}
          disabled={loading}
          render={({ slots }: { slots: any }) => (
            <>
              <InputOTPGroup>
                {slots.slice(0, 3).map((slot: any, index: number) => (
                  <InputOTPSlot key={index} {...slot} />
                ))}
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                {slots.slice(3).map((slot: any, index: number) => (
                  <InputOTPSlot key={index} {...slot} />
                ))}
              </InputOTPGroup>
            </>
          )}
        />
        <Button
          onClick={async () => {
            fetchData(code);
          }}
        >
          Verify
        </Button>
      </div>
    );
  }
}

export default Page;
