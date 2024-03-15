"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import moment from "moment";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import PrescriptionTable from "./_prescription-table";

function Page() {
  const [date, setDate] = useState<Date>();

  return (
    <section className="w-full h-full flex gap-4">
      <div className="w-full flex flex-col gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {moment(date).isSame(new Date(), "day")
              ? "Today"
              : moment(date).format("dddd")}
            ,
          </h1>
          <h3 className="text-md tracking-tight">
            {moment(date).format("MMMM Do YYYY")}
          </h3>
        </div>
        <Separator />
        <PrescriptionTable date={date || new Date()} />
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            className="rounded-md border"
          />
          <div className="h-full flex gap-2 flex-col">
            <Label>Prescription ID</Label>
            <Input placeholder="1234-1234-1234-1234" />
            <Button className="w-full" variant={"secondary"}>
              Search
            </Button>
          </div>
        </div>
        <Link href="/dashboard/create-prescription">
          <Button className="w-full flex gap-2">
            <Plus size={16} />
            Create Prescription
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default Page;
