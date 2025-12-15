import * as Dialog from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { LayoutTemplate } from "lucide-react";

const SignupDialog = () => {
  const [isSignup, setIsSignup] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");


  const handleAuth=async(e:React.FormEvent)=>{
    e.preventDefault()
    if(isSignup){
        console.log(firstName,lastName,phoneNumber,email,password)
    }else{
        console.log(email,password)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
            variant="outline" className="bg-white text-black hover:bg-gray-200"
        >Sign Up</Button>
      </Dialog.Trigger>

      <Dialog.Content className="bg-black  text-white p-6 rounded-md w-[400px]">
        <DialogHeader>
          <Dialog.Title className="text-xl font-bold">
            {isSignup ? "Create Account" : "Welcome Back"}
          </Dialog.Title>
          <Dialog.Description className="text-gray-500">
            {isSignup
              ? "Join us to start booking your travels"
              : "Enter your credentials to access your account"}
          </Dialog.Description>
        </DialogHeader>

        <form onSubmit={handleAuth} className="space-y-4 mt-4">
          {isSignup && (
            <>
              <div>
                <Label>First Name</Label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <Label>Last Name</Label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isSignup && (
            <div>
              <Label>Phone Number</Label>
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          )}

          <Button type="submit" className="w-full">
            {isSignup ? "Create Account" : "Login"}
          </Button>
        </form>

        <p className="text-center text-sm mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            className="text-blue-600 ml-1 font-medium"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default SignupDialog;
