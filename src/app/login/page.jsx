"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      console.log("Login Success", res.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (err) {
      console.log("Login failed", err.message);
      toast.err(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />

        <label htmlFor="email">Email</label>
        <input
          className="p-2 border border-green-400 rounded-xl focus:outline-none mb-4 focus:border:green-700 text-black"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          className="p-2 border border-green-400 rounded-xl focus:outline-none mb-4 focus:border:green-700 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          onClick={onLogin}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-500"
        >
          {buttonDisabled ? "No Login" : "Login Here"}
        </button>
        <Link href="/signup">Signup</Link>
      </div>
    </>
  );
}
