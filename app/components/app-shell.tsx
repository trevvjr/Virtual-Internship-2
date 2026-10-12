'use client';

import { useState, type ReactNode } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import Sidebar from './sidebar';
import BookSearch from './booksearch';

export default function AppShell({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === '/choose-plan') return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="ml-0 min-w-0 flex-1 md:ml-[200px]">
        <header className="h-20 w-full border-b border-[#e1e7ea] bg-white">
          <div className="mx-auto flex h-full max-w-[1070px] items-center justify-end gap-3 px-4 md:px-8">
            <BookSearch />

            <button
              type="button"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="relative z-[60] flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#032b41] md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaXmark size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}