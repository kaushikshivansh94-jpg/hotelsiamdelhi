"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  function handleLogin() {

    if (
      username === "admin" &&
      password === "hotel123"
    ) {

      localStorage.setItem(
        "hotelAdmin",
        "true"
      );

      router.push("/admin");

    } else {

      alert(
        "Invalid Username or Password"
      );

    }
  }

  return (

    <main className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="bg-zinc-900 border border-yellow-500/30 rounded-3xl p-10 w-full max-w-md shadow-2xl">

        <h1 className="text-4xl font-bold text-yellow-400 text-center mb-8">
          Hotel Admin Login
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-zinc-800 text-white outline-none border border-zinc-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-zinc-800 text-white outline-none border border-zinc-700"
          />

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-xl transition duration-300"
          >
            Login
          </button>

        </div>

        <p className="text-zinc-500 text-sm text-center mt-6">
          Demo Login:
          admin / hotel123
        </p>

      </div>

    </main>

  );
}