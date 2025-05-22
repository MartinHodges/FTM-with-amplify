'use client'

import { Button, useAuthenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes, getCurrentUser } from "@aws-amplify/auth";
import { useEffect, useState } from "react";
import TankList from './components/TankList';

export default function Home() {

  const [user, setUser] = useState<any | null>(null);
  const [attributes, setAttributes] = useState<any | null>(null);
  const { signOut } = useAuthenticator();

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await getCurrentUser();
        const attributes = await fetchUserAttributes();

        setUser(user);
        setAttributes(attributes);
      } catch (error) {
        console.error('Error loading user attributes:', error);
      }
    }

    loadUser();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex items-center">
          <Button onClick={signOut}>Logout</Button>
          <p className='ml-2'>Hello {attributes?.given_name} ({user?.signInDetails?.loginId})</p>
        </div>
        <p>My Aquarium Fish Tank Manager</p>
        <TankList />
      </main>
    </div>
  );
}
