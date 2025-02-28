import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function SidebarAvatar() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const signOut = async () => {
    'use server';

    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect('/');
  };

  const avatarUrl = session?.user.user_metadata?.avatar_url

  return (
    <div className="flex items-center gap-4">
      <span>Hey, {session?.user.email}!</span>
      <Image
        src={avatarUrl}
        alt="User Avatar"
        width={40}
        height={40}
        className="rounded-full"
      />
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  );
}
