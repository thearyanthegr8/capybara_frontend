import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const p_id = searchParams.get("p_id");

  try {
    if (p_id) {
      const prescriptionExists = await prisma.prescription.findFirst({
        where: {
          p_id,
        },
        select: {
          p_id: true,
          userId: true,
          patientName: true,
          patientAge: true,
          patientGender: true,
          patientWeight: true,
          patientHeight: true,
          patientTemperature: true,
          notes: true,
          medicines: true,
          address: true,
        },
      });

      if (prescriptionExists && prescriptionExists?.medicines) {
        const medicines = prescriptionExists?.medicines as any[];
        const newMedicines = medicines.map((medicine: any) => {
          return {
            name: medicine.name,
            qty: medicine.qty,
            afterLunch: medicine.afterLunch,
            afterDinner: medicine.afterDinner,
            afterBreakfast: medicine.afterBreakfast,
            beforeLunch: medicine.beforeLunch,
            beforeDinner: medicine.beforeDinner,
            beforeBreakfast: medicine.beforeBreakfast,
          };
        });

        const newData = {
          patientName: prescriptionExists.patientName,
          patientAge: prescriptionExists.patientAge,
          patientGender: prescriptionExists.patientGender,
          patientWeight: prescriptionExists.patientWeight,
          patientHeight: prescriptionExists.patientHeight,
          patientTemperature: prescriptionExists.patientTemperature,
          notes: prescriptionExists.notes,
          medicines: newMedicines,
        };

        const req = await fetch(
          `http://localhost:5000/verify?data=${JSON.stringify(
            newData
          )}&address=${prescriptionExists.address}`
        );
        const data = await req.text();

        return NextResponse.json({ message: data }, { status: 200 });
      }
    }
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
