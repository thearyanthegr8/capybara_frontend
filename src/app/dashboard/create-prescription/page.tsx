"use client";
import React, { useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import LabelledInput from "@/components/custom/labelled-form-input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Medicine from "./medicine";

const prescriptionSchema = z.object({
  patientName: z.string(),
  patientAge: z.number(),
  patientGender: z.string(),
  patientWeight: z.number().optional(),
  patientHeight: z.number().optional(),
  patientTemperature: z.number().optional(),

  notes: z.string().optional(),
});

function Page() {
  const form = useForm<z.infer<typeof prescriptionSchema>>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      patientName: "",
      patientAge: 0,
      patientGender: "",
      patientWeight: 0,
      patientHeight: 0,
      patientTemperature: 0,
      notes: "",
    },
  });

  const [medicineNo, setMedicineNo] = React.useState(1);

  const medicines: any[] = [];

  useEffect(() => {
    console.log(medicines);
  }, [medicines]);

  async function onSubmit(values: z.infer<typeof prescriptionSchema>) {
    console.log(values);
  }

  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Create Prescription</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Separator />
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <LabelledInput
              control={form.control}
              name="patientName"
              label="Patient Name"
              placeholder="John Doe"
              required
            />
            <LabelledInput
              control={form.control}
              name="patientAge"
              label="Patient Age"
              placeholder="51"
              type="number"
              required
            />
            <div className="flex flex-col gap-2">
              <Label>Gender *</Label>
              <Select
                onValueChange={(e) => form.setValue("patientGender", e)}
                // disabled={loading}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="RATHER NOT SAY">Rather not say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <LabelledInput
              control={form.control}
              name="patientWeight"
              label="Patient Weight (Kgs)"
              placeholder="51"
              type="number"
            />
            <LabelledInput
              control={form.control}
              name="patientHeight"
              label="Patient Height (Cms)"
              placeholder="51"
              type="number"
            />
            <LabelledInput
              control={form.control}
              name="patientTemperature"
              label="Patient Temperature (Celcius)"
              placeholder="51"
              type="number"
            />
            <div>
              <h3>Medicines</h3>
              <Table>
                <TableCaption>
                  <div className="w-full flex flex-col gap-2">
                    <Button
                      className="w-full"
                      variant={"secondary"}
                      type="button"
                      onClick={() => {
                        setMedicineNo((prev) => prev + 1);
                      }}
                    >
                      Add Medicine
                    </Button>
                    <p>A list of your medications</p>
                  </div>
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-[20rem]">Qty/Day</TableHead>
                    <TableHead className="w-[10rem]">Breakfast</TableHead>
                    <TableHead className="w-[10rem]">Lunch</TableHead>
                    <TableHead className="w-[10rem]">Dinner</TableHead>
                    <TableHead>Total Qty</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: medicineNo }).map((_, i) => (
                    <Medicine key={i} index={i} medicine={medicines} />
                  ))}
                </TableBody>
              </Table>
            </div>
            <LabelledInput
              control={form.control}
              name="notes"
              label="Notes"
              placeholder="Notes"
            />
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Page;