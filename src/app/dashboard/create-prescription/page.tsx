"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
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
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Medicine from "./medicine";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

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

  const [medicineNo, setMedicineNo] = useState(0);
  const [loading, setLoading] = useState(false);

  const [medicines, setMedicines] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    console.log(medicines);
  }, [medicines]);

  async function onSubmit(values: z.infer<typeof prescriptionSchema>) {
    setLoading(true);
    try {
      const prescription = await axios.post("/api/prescription/create", {
        values,
        medicines,
      });

      toast({
        title: "Prescription Created",
        description: "Prescription has been created",
        duration: 10000,
      });

      form.reset();
      setMedicines([]);
      setMedicineNo(0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
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
              isDisabled={loading}
            />
            <LabelledInput
              control={form.control}
              name="patientAge"
              label="Patient Age"
              placeholder="51"
              type="number"
              required
              isDisabled={loading}
            />
            <div className="flex flex-col gap-2">
              <Label>Gender *</Label>
              <Select
                onValueChange={(e) => form.setValue("patientGender", e)}
                disabled={loading}
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
              isDisabled={loading}
            />
            <LabelledInput
              control={form.control}
              name="patientHeight"
              label="Patient Height (Cms)"
              placeholder="51"
              type="number"
              isDisabled={loading}
            />
            <LabelledInput
              control={form.control}
              name="patientTemperature"
              label="Patient Temperature (Celcius)"
              placeholder="51"
              type="number"
              isDisabled={loading}
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
                      disabled={loading}
                    >
                      Add Medicine
                    </Button>
                    <p>A list of your medications</p>
                  </div>
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-[20rem]">Qty/Dosage</TableHead>
                    <TableHead className="w-[10rem]">Breakfast</TableHead>
                    <TableHead className="w-[10rem]">Lunch</TableHead>
                    <TableHead className="w-[10rem]">Dinner</TableHead>
                    <TableHead>Total Qty</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: medicineNo }).map((_, i) => (
                    <Medicine
                      key={i}
                      index={i}
                      medicine={medicines}
                      setMedicines={setMedicines}
                      loading={loading}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
            <LabelledInput
              control={form.control}
              name="notes"
              label="Notes"
              placeholder="Notes"
              isDisabled={loading}
            />
            <Button type="submit" disabled={loading}>
              Create Prescription
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Page;
