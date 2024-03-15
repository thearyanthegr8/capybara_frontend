import { prisma } from "@/lib/prisma";
import { Database } from "@/lib/types/database.types";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const p_id = searchParams.get("p_id");
  const customer = searchParams.get("customer_code");

  const supabase = createMiddlewareClient<Database>({
    req,
    res: NextResponse.next(),
  });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (p_id) {
      const prescriptionExists = await prisma.prescription.findFirst({
        where: {
          p_id,
        },
        select: {
          patientName: true,
        },
      });

      if (!session) {
        if (prescriptionExists) {
          console.log("Not Authorized to view this prescription");
          return NextResponse.json(
            { message: "Not Authorized to view this prescription" },
            { status: 401 }
          );
        }
      } else {
        const prescription = await prisma.prescription.findFirst({
          where: {
            p_id,
          },
          select: {
            p_id: true,
            patientName: true,
            patientAge: true,
            patientGender: true,
            patientWeight: true,
            patientHeight: true,
            patientTemperature: true,
            notes: true,
            medicines: true,
          },
        });

        console.log("Prescription found", prescription);
        return NextResponse.json(prescription, { status: 200 });
      }
    }

    console.log("Prescription not found");
    return NextResponse.json(
      { message: "Prescription not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while fetching the prescription" },
      { status: 500 }
    );
  }
}
