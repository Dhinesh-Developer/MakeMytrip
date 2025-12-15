"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { signup, login } from "../api";
import { setUser } from "@/store";
import { useDispatch } from "react-redux";

const SignupDialog = () => {
  const dispatch = useDispatch(); // ✅ ADDED

  const [isSignup, setIsSignup] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isSignup) {
        const data = await signup(
          firstName,
          lastName,
          phoneNumber,
          email,
          password
        );
        dispatch(setUser(data)); // ✅ FIXED
      } else {
        const data = await login(email, password);
        dispatch(setUser(data)); // ✅ FIXED
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white text-black">
          Sign Up
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-black text-white p-6 w-[400px]">
        <DialogHeader>
          <DialogTitle>
            {isSignup ? "Create Account" : "Welcome Back"}
          </DialogTitle>
          <DialogDescription>
            {isSignup
              ? "Join us to start booking your travels"
              : "Enter your credentials to access your account"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAuth} className="space-y-4 mt-4">
          {isSignup && (
            <>
              <Input
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {isSignup && (
            <Input
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          )}

          <Button type="submit" className="w-full">
            {isSignup ? "Create Account" : "Login"}
          </Button>
        </form>

        <p className="text-center text-sm mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="text-blue-500 ml-1"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
