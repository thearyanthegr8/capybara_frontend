"use client";
import { Button } from "@/components/ui/button";
import { Home, LogOutIcon, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/types/database.types";
import { Icons } from "@/components/ui/icons";

function Sidebar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const supabase = createClientComponentClient<Database>();

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
    <nav className="left-0 top-0 bottom-0 w-[20rem] px-4 py-8 shadow-xl h-screen flex flex-col items-center">
      <div className="flex gap-4 items-center justify-center">
        <Image src="/icon.png" alt="Logo" width={70} height={70} />
        <h1 className="text-2xl font-medium tracking-tight uppercase">
          Capybara
        </h1>
      </div>
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
      <hr className="bg-gray-300 rounded-xl !h-[2px] !w-[100%]" />
      <div className={"pb-12 w-full h-full "}>
        <div className="space-y-4 py-4 w-full">
          <div className="py-2 w-full">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Discover
            </h2>
            <div className="w-full flex flex-col gap-2">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className={`w-full justify-start flex gap-2 ${
                    pathname === "/dashboard" ? "border-2" : ""
                  }`}
                >
                  <Home size={16} />
                  Home
                </Button>
              </Link>
              <Link href="/dashboard/patients">
                <Button
                  variant="ghost"
                  className={`w-full justify-start flex gap-2 ${
                    pathname === "/dashboard/patients" ? "border-2" : ""
                  }`}
                >
                  <Users size={16} />
                  Patients
                </Button>
              </Link>
              <Link href="/dashboard/faq">
                <Button
                  variant="ghost"
                  className={`w-full justify-start flex gap-2 ${
                    pathname === "/dashboard/faq" ? "border-2" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                    <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                    <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
                  </svg>
                  FAQ / Help Center
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start flex gap-2 h-12"
          >
            <LogOutIcon size={16} />
            Logout
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout?
              <br />
              Logging out will end your current session and you will be
              redirected to the login page. Click &apos;Logout&apos; to confirm
              or &apos;Cancel&apos; to return to the application.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="w-full flex gap-2">
            <DialogClose asChild>
              <Button className="w-1/2" variant={"outline"} disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="w-1/2"
              variant={"destructive"}
              onClick={() => logout()}
              disabled={loading}
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </nav>
  );
}

export default Sidebar;
