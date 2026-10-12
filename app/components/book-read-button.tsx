'use client';

import { useRouter } from 'next/navigation';
import { LuBookOpen } from 'react-icons/lu';
import { useAuth } from './auth-provider';

export default function BookReadButton({
  bookId,
  subscriptionRequired,
}: {
  bookId: string;
  subscriptionRequired: boolean;
}) {
  const router = useRouter();
  const { loading, subscriptionPlan } = useAuth();

  function openBook() {
    if (subscriptionRequired && subscriptionPlan !== 'Premium-plan') {
      router.push('/choose-plan');
      return;
    }

    router.push(`/player/${bookId}`);
  }

  return (
    <button
      type="button"
      onClick={openBook}
      disabled={loading}
      className="inline-flex h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded bg-[#032b41] text-base text-white transition-opacity duration-200 hover:opacity-80 disabled:cursor-wait disabled:opacity-60 sm:w-36 sm:flex-none"
    >
      <LuBookOpen className="h-6 w-6" aria-hidden="true" />
      Read
    </button>
  );
}
