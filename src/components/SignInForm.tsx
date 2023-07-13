'use client'
import { signIn, useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import './Form.component.css'
export default function SignInForm() {

  const { data: session } = useSession();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";


  useEffect(() => {
    if (session?.user) {
      console.log("User: "+session?.user?.name)
      redirect("/");
    }else{
      console.log("Not logged in")
    }
  })
  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try{
      const response = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
        callbackUrl,
      });
    }catch(error){

    }
  };
  return (
    <div>
      <form
        className="mx-auto defaultForm max-w-screen-xl text-xl"
        id="signupForm"
        name="signupForm"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="w-full"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="w-full"
            id="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoFocus
          ></input>
        </div>
        <div className="mb-4 items-center text-center object-center">
          <button type='submit' className="defaultButton">Sign In</button>
        </div>
        <div className="mb-4">
    
            <label>Don't have an account?  <Link href="/SignUp" className="text-blue-950 underline font-bold">Sign Up!</Link></label>
      
        </div>
        <div className="mb-4 ">
        </div>
      </form>
    </div>
  )
}


