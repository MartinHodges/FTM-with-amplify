'use client'

import { Button, Flex, useAuthenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes, FetchUserAttributesOutput, getCurrentUser, GetCurrentUserOutput } from "@aws-amplify/auth";
import { useEffect, useState } from "react";
import ShowAquarium from './components/ShowAquarium';

export default function Home() {

  const [user, setUser] = useState<GetCurrentUserOutput | null>(null);
  const [attributes, setAttributes] = useState<FetchUserAttributesOutput | null>(null);
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
    <main className="p-8 font-[family-name:var(--font-geist-sans)]">
      <Flex direction="row" justifyContent="space-between" alignItems="center" width="100%">
        <h1>My Aquarium Fish Tank Manager</h1>
        <Flex style={{alignContent: 'center'}}>
          <p className='ml-2'>{attributes?.given_name} ({user?.signInDetails?.loginId})</p>
          <Button onClick={signOut} style={{height: '30px'}}>Logout</Button>
        </Flex>
      </Flex>
      <ShowAquarium />
    </main>
  );
}
