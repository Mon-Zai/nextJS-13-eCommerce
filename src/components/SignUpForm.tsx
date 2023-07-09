'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const {push} = useRouter();


  const handleSubmit = async (event:any) => {
    event.preventDefault();

    const data = {
      username,
      email,
      password,
      confirmPassword
    };

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your_token_here', // If authentication is required
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if(result.message==='User Added'){
        push('/SignIn')
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form
        className="mx-auto max-w-screen-md"
        id="signupForm"
        name="signupForm"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-4 text-xl">Create Account</h1>
        <div className="mb-4">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="w-full"
            id="username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoFocus      
          />
        </div>
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
        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="w-full"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <div className="mb-4 ">
          <button type='submit' className="primary-button">Register</button>
        </div>
        <div className="mb-4 ">
        </div>
      </form>
    </div>

  )
}


