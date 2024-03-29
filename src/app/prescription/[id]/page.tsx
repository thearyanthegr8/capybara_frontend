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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

function Page() {
  const p_id = usePathname().split("/")[2];
  const [loading, setLoading] = useState<any>(true);
  const [prescription, setPrescription] = useState(null);
  const [userSession, setUserSession] = useState(false);
  const [userType, setUserType] = useState();
  const [code, setCode] = useState("");
  const [responseCode, setResponseCode] = useState<number>();
  const supabase = createClientComponentClient<Database>();
  const [medicines, setMedicines] = useState<any[]>([]);

  const fetchData = async (customer_code?: string) => {
    setLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log(session);

      if (session) {
        setUserType(session.user.user_metadata.type);
        setUserSession(true);
        const response = await axios.get(`/api/prescription/view?p_id=${p_id}`);
        setResponseCode(response.status);
        setPrescription(response.data);
        setMedicines(response.data["medicines"]);
      } else {
        setUserSession(false);
        if (customer_code !== undefined) {
          const response = await axios.get(
            `/api/prescription/view?p_id=${p_id}&customer_code=${customer_code}`
          );
          setResponseCode(response.status);
          setPrescription(response.data);
          setMedicines(response.data["medicines"]);
        }
      }
    } catch (error) {
      console.error("Error fetching prescription:", error);
      setResponseCode(404);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(responseCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p_id, supabase.auth]);

  const { toast } = useToast();

  async function updatePrescription() {
    setLoading(true);
    try {
      const response = await axios.post(`/api/prescription/update`, {
        p_id,
        medicines,
      });

      toast({
        title: "Prescription updated",
        description: "Prescription updated successfully",
      });
      console.log(response);
    } catch (error) {
      toast({
        title: "Error updating prescription",
        description: "Error updating prescription",
        variant: "destructive",
      });
      console.error("Error updating prescription:", error);
    } finally {
      setLoading(false);
    }
  }

  const updateQuantity = (index: number, value: number) => {
    // Update the quantity of the medicine at the specified index
    setMedicines((prevMedicines) => {
      const updatedMedicines = [...prevMedicines];
      updatedMedicines[index].totalQty = value;
      return updatedMedicines;
    });
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Icons.spinner className="animate-spin h-5 w-5" />
      </div>
    );
  } else if (responseCode === 200 && prescription) {
    return (
      <div className="mx-4 mt-4 mb-2">
        <div className="flex justify-between">
          <div className="">
            <h1 className="text-4xl font-semibold tracking-tight mb-2">
              Name: {prescription["patientName"]}
            </h1>
            <Image
              className="mx-auto"
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${p_id}`}
              alt="QR Code"
              width={150}
              height={150}
            />
          </div>
          <div className="mr-4">
            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              Age: {prescription["patientAge"]}
            </h1>

            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              Gender: {prescription["patientGender"]}
            </h1>

            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              Weight: {prescription["patientWeight"]}
            </h1>
            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              Height: {prescription["patientHeight"]}
            </h1>
            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              Temperature: {prescription["patientTemperatature"]}
            </h1>
            {/* <h1 className="text-2xl font-semibold tracking-tight mb-2">
              Notes: {prescription["notes"]}
            </h1> */}
          </div>
        </div>
        {userSession && userType === "PHARMACIST" ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left ">Medicine Name</TableHead>
                <TableHead className="text-left ">Total Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(prescription["medicines"] as any[]).map(
                (x: any, index: number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{x["name"]}</TableCell>
                      <TableCell>
                        <Input
                          value={medicines[index]["totalQty"]}
                          onChange={(e) =>
                            updateQuantity(index, e.target.valueAsNumber)
                          }
                          type="number"
                        />
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left ">Medicine Name</TableHead>
                <TableHead className="text-left ">Quantity/Dosage</TableHead>
                <TableHead className="text-left ">Before Breakfast</TableHead>
                <TableHead className="text-left ">After Breakfast</TableHead>
                <TableHead className="text-left ">Before Lunch</TableHead>
                <TableHead className="text-left ">After lunch</TableHead>
                <TableHead className="text-left ">Before Dinner</TableHead>
                <TableHead className="text-left ">After Dinner</TableHead>
                <TableHead className="text-left ">Total Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(prescription["medicines"] as any[]).map(
                (x: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{x["name"]}</TableCell>
                    <TableCell>{x["qty"]}</TableCell>
                    <TableCell>{x["beforeBreakfast"] ? "YES" : "NO"}</TableCell>
                    <TableCell>{x["afterBreakfast"] ? "YES" : "NO"}</TableCell>
                    <TableCell>{x["beforeLunch"] ? "YES" : "NO"}</TableCell>
                    <TableCell>{x["afterLunch"] ? "YES" : "NO"}</TableCell>
                    <TableCell>{x["beforeDinner"] ? "YES" : "NO"}</TableCell>
                    <TableCell>{x["afterDinner"] ? "YES" : "NO"}</TableCell>
                    <TableCell>{x["totalQty"]}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        )}
        {userSession && userType === "PHARMACIST" && (
          <div className="flex flex-col gap-4">
            <Button className="w-full" onClick={() => updatePrescription()}>
              Save
            </Button>
            {medicines.every((medicine) => medicine.totalQty === 0) && (
              <Button className="w-full" variant={"destructive"}>
                Invalidate
              </Button>
            )}
          </div>
        )}
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
