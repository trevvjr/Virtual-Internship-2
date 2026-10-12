'use client';

import Link from 'next/link';
import { useState } from 'react';
import Loginform from '@/app/components/Loginform';
import { useAuth } from '@/app/components/auth-provider';

export default function SettingsPage() {
  const [showLogin, setShowLogin] = useState(false);
  const { user, loading, subscriptionPlan } = useAuth();

  if (loading) return null;

  if (user) {
    return (
      <main className="mx-auto w-full max-w-[1070px] px-6 py-10 md:px-8">
        <h1 className="mb-3 border-b border-[#e1e7ea] pb-4 text-[22px] font-bold text-[#032b41]">
          Settings
        </h1>
        <section className="border-b border-[#e1e7ea] py-8">
          <h2 className="text-lg mb-1 text-base font-bold text-[#032b41]">Your Subscription plan</h2>
          <p className="text-md text-base mb-1 text-[#394547]">{subscriptionPlan}</p>
            <Link
             href='/choose-plan'
             className='inline-block rounded bg-[#2bd97c] px-4 py-2 font-sm text-[#032b41] hover:bg-[#27c76f] transition-colors duration-200 cursor-pointer'>
              Upgrade to Premium
            </Link>
        </section>
        <section className="py-8">
          <h2 className="text-lg mb-1 text-base font-bold text-[#032b41]">Email</h2>
          <p className="text-md text-base text-[#394547]">{user.email}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-[1070px] flex-col items-center px-6 py-20 text-center">
      <img src="/login.png" alt="" className="mb-6 w-full max-w-[460px]" />
      <h1 className="mb-6 text-2xl font-bold text-[#032b41]">
        Log in to your account to see your details.
      </h1>
      <button
        type="button"
        onClick={() => setShowLogin(true)}
        className="h-10 w-48 rounded bg-[#2bd97c] font-medium text-[#032b41] hover:opacity-90"
      >
        Login
      </button>
      {showLogin && (
        <div className="fixed inset-0 z-[1000] flex h-full w-full flex-col items-center justify-center bg-black/75 p-4">
          <Loginform onClose={() => setShowLogin(false)} redirectTo="/settings" />
        </div>
      )}
    </main>
  );
}