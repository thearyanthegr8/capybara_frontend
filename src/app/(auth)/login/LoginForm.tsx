"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import LabelledInput from "@/components/custom/labelled-form-input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { Database } from "@/lib/types/database.types";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    console.log(data, error);
    // await axios.post("/api/auth/login", values);
    // console.log(values);
  }

  const [hide, setHide] = useState(true);

  const supabase = createClientComponentClient<Database>();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[20rem]"
      >
        <LabelledInput
          control={form.control}
          name="email"
          label="Email"
          placeholder={"johndoe@gmail.com"}
        />
        <div className="relative w-full">
          <LabelledInput
            control={form.control}
            placeholder="********"
            label="Password"
            name="password"
            type={hide ? "password" : "text"}
            id="password"
          />
          {hide ? (
            <EyeIcon
              className="absolute cursor-pointer top-1/2 right-2"
              onClick={() => setHide(false)}
            />
          ) : (
            <EyeOffIcon
              className="absolute cursor-pointer top-1/2 right-2"
              onClick={() => setHide(true)}
            />
          )}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default LoginForm;
