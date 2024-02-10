"use client"

import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";


const LoginPage = () => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn(providers.google.id)
    }
  });
  const router = useRouter();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);


  return (
    <div className="flex mx-auto h-screen items-center justify-center">
      <button onClick={()=>signOut()}> Sign Out</button>
    </div>
  )
}

export default LoginPage
