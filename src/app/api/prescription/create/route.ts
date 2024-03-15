import { prisma } from "@/lib/prisma";
import { Database } from "@/lib/types/database.types";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { values, medicines } = await req.json();
  const res = NextResponse.next();

  const supabase = createMiddlewareClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

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

  console.log("newMedicines", newMedicines);

  try {
    if (session) {
      const prescription = await prisma.prescription.create({
        data: {
          userId: session?.user.id,
          patientName: values.patientName,
          patientAge: values.patientAge,
          patientGender: values.patientGender,
          patientWeight: values.patientWeight,
          patientHeight: values.patientHeight,
          patientTemperature: values.patientTemperature,
          notes: values.notes,
          medicines,
        },
      });

      console.log(prescription);

      return NextResponse.json(
        { message: "Prescription created" },
        { status: 201 }
      );
    }
  } catch (e) {
    console.error(e);
  }
}
