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

function Page() {
  const p_id = usePathname().split("/")[2];
  const [loading, setLoading] = useState(true);
  const [prescription, setPrescription] = useState(null);
  const [userSession, setUserSession] = useState(false);
  const [customer_code, setCustomerCode] = useState();

  const supabase = createClientComponentClient<Database>();

  const fetchData = async () => {
    setLoading(true);

    try {
      const { data: session } = await supabase.auth.getSession();

      console.log(session);

      if (session !== null) {
        setUserSession(true);
        const response = await axios.get(`/api/prescription/view?p_id=${p_id}`);
        setPrescription(response.data);
      } else {
        setUserSession(false);
      }
    } catch (error) {
      console.error("Error fetching prescription:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Icons.spinner className="animate-spin h-5 w-5" />
      </div>
    );
  } else if (!userSession) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <InputOTP
          maxLength={6}
          value={customer_code}
          onChange={(e: any) => setCustomerCode(e.target.value)}
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
        <Button onClick={fetchData}>Verify</Button>
      </div>
    );
  } else if (prescription === null) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <h1>Prescription not found</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{p_id}</h1>
        <h1>hello</h1>
      </div>
    );
  }
}

export default Page;
