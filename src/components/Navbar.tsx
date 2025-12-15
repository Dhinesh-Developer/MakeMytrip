"use client";

import React, { useEffect, useState } from "react";
import SignupDialog from "./SignupDialog";
import { useSelector, useDispatch } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LogOut, User } from "lucide-react";
import { setUser } from "@/store";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: any) => state.user.user);

  // ✅ Fix hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // ✅ Avatar first letter logic
  const avatarChar =
    user?.firstName?.[0]?.toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "U";

  const handleLogout = () => {
    dispatch(setUser(null));
    router.push("/");
  };

  const goToProfile = () => {
    router.push("/profile");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Title */}
        <span className="text-2xl font-bold text-black">
          Make My Tour
        </span>

        {/* Right Section */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="rounded-full p-0 hover:bg-transparent"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-black text-white font-semibold">
                    {avatarChar}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 rounded-xl shadow-lg"
            >
              <DropdownMenuLabel className="text-left">
                <p className="font-semibold capitalize">
                  {user.firstName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email}
                </p>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={goToProfile}
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <SignupDialog />
        )}
      </div>
    </header>
  );
};

export default Navbar;
