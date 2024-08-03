import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import LogoutButton from './logout-button';


export default async function LoginButton() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  return session ? (
    <LogoutButton />
  ) : null;
};


