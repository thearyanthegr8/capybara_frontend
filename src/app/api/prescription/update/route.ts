import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function UPDATE(request: NextRequest) {
  const { p_id, medicines } = await request.json();

  try {
    const prescription = await prisma.prescription.update({
      where: {
        p_id,
      },
      data: {
        medicines: {
          set: medicines,
        },
      },
    });

    return NextResponse.json(prescription, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Error updating prescription" },
      { status: 500 }
    );
  }
}
