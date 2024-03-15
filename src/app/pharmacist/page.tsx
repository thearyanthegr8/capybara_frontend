"use client";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Database } from "@/lib/types/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { LogOutIcon, QrCode } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user.user_metadata);
    };

    fetchUser();
  }, [supabase.auth]);

  async function logout() {
    setLoading(true);
    const { error } = await supabase.auth.signOut();

    if (!error) {
      router.push("/auth");
    } else {
      setLoading(false);
    }
  }

  return (
    <main className="p-4 w-full h-screen flex flex-col justify-between">
      <div className="my-4 text-l p-4 items-center justify-between flex gap-2 bg-black rounded-md shadow-lg w-full">
        {!user ? (
          <Icons.spinner className="animate-spin" color="white" />
        ) : (
          <div>
            <p className="text-sm text-white">{user.name}</p>
            <p className="text-gray-200 text-[0.6rem]">
              {/* @ts-ignore */}
              {user.mobile}
              <br />
              {user.email}
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <Link href="/pharmacist/qr-scanner">
          <Button
            variant="outline"
            className="w-full justify-center flex gap-2 h-12"
          >
            <QrCode size={16} />
            Scan QR Code
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-center flex gap-2 h-12"
          onClick={() => logout()}
        >
          <LogOutIcon size={16} />
          Logout
        </Button>
      </div>
    </main>
  );
}

export default Page;
