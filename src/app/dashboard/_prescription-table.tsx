"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import { Button } from "@/components/ui/button";

function PrescriptionTable({ date }: { date: Date }) {
  const [prescriptions, setPrescriptions] = useState([]); // [Prescription

  async function getPrescriptions() {
    const res = await fetch(`/api/prescription/get?date=${date}`);
    const data = await res.json();
    setPrescriptions(data);
  }

  useEffect(() => {
    getPrescriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <Table>
      <TableCaption>
        Prescriptions for {moment(date).format("dddd, MMMM Do YYYY")}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Patient Name</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prescriptions.map((prescription: any) => (
          <TableRow key={prescription.id}>
            <TableCell>{prescription.patientName}</TableCell>
            <TableCell>{prescription.patientAge}</TableCell>
            <TableCell>{prescription.patientGender}</TableCell>
            <TableCell>{prescription.patientWeight}</TableCell>
            <TableCell>
              <Button onClick={() => {}} variant={"outline"}>
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PrescriptionTable;
