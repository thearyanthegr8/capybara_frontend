"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableCell, TableRow } from "@/components/ui/table";
import { DotIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface MedicineData {
  name: string;
  qty: number;
  beforeBreakfast: boolean;
  afterBreakfast: boolean;
  beforeLunch: boolean;
  afterLunch: boolean;
  beforeDinner: boolean;
  afterDinner: boolean;
  totalQty: number;
}

function Medicine({ index, medicine }: { index: number; medicine: any[] }) {
  const [data, setData] = useState<MedicineData>({
    name: "",
    qty: 0,
    beforeBreakfast: false,
    afterBreakfast: false,
    beforeLunch: false,
    afterLunch: false,
    beforeDinner: false,
    afterDinner: false,
    totalQty: 0,
  });

  useEffect(() => {
    console.log(data);
    // setData((prev) => ({
    //   ...prev,
    //   totalQty:
    //     data.qty *
    //     ((data.beforeBreakfast ? 1 : 0) +
    //       (data.afterBreakfast ? 1 : 0) +
    //       (data.beforeLunch ? 1 : 0) +
    //       (data.afterLunch ? 1 : 0) +
    //       (data.beforeDinner ? 1 : 0) +
    //       (data.afterDinner ? 1 : 0)),
    // }));
  }, [
    data.qty,
    data.beforeBreakfast,
    data.afterBreakfast,
    data.beforeLunch,
    data.afterLunch,
    data.beforeDinner,
    data.afterDinner,
  ]);

  return (
    <TableRow>
      <TableCell>
        <Input
          placeholder="Medicine Name"
          value={data.name}
          onChange={(e) =>
            setData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </TableCell>
      <TableCell className="w-[20rem]">
        <Input
          placeholder="Qty/day"
          type="number"
          value={data.qty}
          onChange={(e) =>
            setData((prev) => ({ ...prev, qty: parseInt(e.target.value) }))
          }
        />
      </TableCell>
      <TableCell className="w-[10rem]">
        <div className="flex gap-2 h-full w-full justify-start items-center">
          <Checkbox
            id="beforeBreakfast"
            value={data.beforeBreakfast}
            onChange={(e: any) =>
              setData((prev) => ({
                ...prev,
                beforeBreakfast: e.target.checked,
              }))
            }
          />
          <Label htmlFor="beforeBreakfast" className="cursor-pointer">
            Before
          </Label>
          <Checkbox
            id="afterBreakfast"
            value={data.afterBreakfast}
            onChange={(e: any) =>
              setData((prev) => ({
                ...prev,
                afterBreakfast: e.target.checked,
              }))
            }
          />
          <Label htmlFor="afterBreakfast" className="cursor-pointer">
            After
          </Label>
        </div>
      </TableCell>
      <TableCell className="w-[10rem]">
        <div className="flex gap-2 h-full w-full justify-start items-center">
          <Checkbox
            id="beforeLunch"
            value={data.beforeLunch}
            onChange={(e: any) =>
              setData((prev) => ({
                ...prev,
                beforeLunch: e.target.checked,
              }))
            }
          />
          <Label htmlFor="beforeLunch" className="cursor-pointer">
            Before
          </Label>
          <Checkbox
            id="afterLunch"
            value={data.afterLunch}
            onChange={(e: any) =>
              setData((prev) => ({
                ...prev,
                afterLunch: e.target.checked,
              }))
            }
          />
          <Label htmlFor="afterLunch" className="cursor-pointer">
            After
          </Label>
        </div>
      </TableCell>
      <TableCell className="w-[10rem]">
        <div className="flex gap-2 h-full w-full justify-start items-center">
          <Checkbox
            id="beforeDinner"
            value={data.beforeDinner}
            onChange={(e: any) =>
              setData((prev) => ({
                ...prev,
                beforeDinner: e.target.checked,
              }))
            }
          />
          <Label htmlFor="beforeDinner" className="cursor-pointer">
            Before
          </Label>
          <Checkbox id="afterDinner" />
          <Label htmlFor="afterDinner" className="cursor-pointer">
            After
          </Label>
        </div>
      </TableCell>
      <TableCell>{data.totalQty}</TableCell>
      <TableCell>
        <Button variant={"ghost"} type="button">
          More
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default Medicine;
