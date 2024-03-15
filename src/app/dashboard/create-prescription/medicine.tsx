"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TableCell, TableRow } from "@/components/ui/table";
import { DotIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";

function Medicine({
  index,
  medicine,
  setMedicines,
  loading,
}: {
  index: number;
  medicine: any[];
  setMedicines: React.Dispatch<React.SetStateAction<any[]>>;
  loading: boolean;
}) {
  const [name, setName] = useState("");
  const [qty, setQty] = useState(0);
  const [beforeBreakfast, setBeforeBreakfast] = useState(false);
  const [afterBreakfast, setAfterBreakfast] = useState(false);
  const [beforeLunch, setBeforeLunch] = useState(false);
  const [afterLunch, setAfterLunch] = useState(false);
  const [beforeDinner, setBeforeDinner] = useState(false);
  const [afterDinner, setAfterDinner] = useState(false);
  const [totalQty, setTotalQty] = useState(0);

  useEffect(() => {
    if (qty === null || qty < 0) {
      setTotalQty(0);
    } else {
      setTotalQty(
        qty *
          ((beforeBreakfast ? 1 : 0) +
            (afterBreakfast ? 1 : 0) +
            (beforeLunch ? 1 : 0) +
            (afterLunch ? 1 : 0) +
            (beforeDinner ? 1 : 0) +
            (afterDinner ? 1 : 0))
      );
    }
  }, [
    qty,
    beforeBreakfast,
    afterBreakfast,
    beforeLunch,
    afterLunch,
    beforeDinner,
    afterDinner,
  ]);

  useEffect(() => {
    setMedicines((medicines) => {
      const newMedicines = [...medicines];
      newMedicines[index] = {
        name,
        qty,
        beforeBreakfast,
        afterBreakfast,
        beforeLunch,
        afterLunch,
        beforeDinner,
        afterDinner,
        totalQty,
      };
      return newMedicines;
    });
  }, [
    name,
    qty,
    beforeBreakfast,
    afterBreakfast,
    beforeLunch,
    afterLunch,
    beforeDinner,
    afterDinner,
    setMedicines,
    index,
    totalQty,
  ]);

  return (
    <TableRow>
      <TableCell>
        <Input
          placeholder="Medicine Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
      </TableCell>
      <TableCell className="w-[20rem]">
        <Input
          placeholder="Qty/day"
          type="number"
          value={qty}
          onChange={(e) => setQty(e.target.valueAsNumber)}
          disabled={loading}
        />
      </TableCell>
      <TableCell className="w-[10rem]">
        <div className="flex gap-2 h-full w-full justify-start items-center">
          <Checkbox
            id="beforeBreakfast"
            checked={beforeBreakfast}
            onCheckedChange={(checked: any) => setBeforeBreakfast(checked)}
            disabled={loading}
          />
          <Label htmlFor="beforeBreakfast" className="cursor-pointer">
            Before
          </Label>
          <Checkbox
            id="afterBreakfast"
            checked={afterBreakfast}
            onCheckedChange={(checked: any) => setAfterBreakfast(checked)}
            disabled={loading}
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
            value={beforeLunch}
            onCheckedChange={(checked: any) => setBeforeLunch(checked)}
            disabled={loading}
          />
          <Label htmlFor="beforeLunch" className="cursor-pointer">
            Before
          </Label>
          <Checkbox
            id="afterLunch"
            value={afterLunch}
            onCheckedChange={(checked: any) => setAfterLunch(checked)}
            disabled={loading}
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
            value={beforeDinner}
            onCheckedChange={(checked: any) => setBeforeDinner(checked)}
            disabled={loading}
          />
          <Label htmlFor="beforeDinner" className="cursor-pointer">
            Before
          </Label>
          <Checkbox
            id="afterDinner"
            value={afterDinner}
            onCheckedChange={(checked: any) => setAfterDinner(checked)}
            disabled={loading}
          />
          <Label htmlFor="afterDinner" className="cursor-pointer">
            After
          </Label>
        </div>
      </TableCell>
      <TableCell>{totalQty}</TableCell>
      <TableCell>
        <Button variant={"ghost"} type="button" disabled={loading}>
          More
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default Medicine;
