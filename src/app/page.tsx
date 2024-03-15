"use client";
import { Database } from "@/lib/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LabelledInput from "@/components/custom/labelled-form-input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import axios from "axios";

export default function Home() {
  return <main></main>;
}
