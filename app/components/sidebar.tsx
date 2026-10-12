'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "firebase/auth";
import {
  FaBookOpen,
  FaGear,
  FaHouse,
  FaMagnifyingGlass,
  FaPen,
  FaRightFromBracket,
  FaRegBookmark,
} from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import { getFirebaseAuth } from "@/services/firebase";
import { useAuth } from "./auth-provider";
import LoginForm from "./Loginform";

const mainLinks = [
  { href: "/for-you", label: "For you", icon: FaHouse },
  { href: "/library", label: "My Library", icon: FaRegBookmark },
];

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = async () => {
    await signOut(getFirebaseAuth());
    sessionStorage.removeItem("guest");
    setIsOpen(false);
    router.push("/");
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-[260px] min-w-[260px] flex-col bg-[#f7faf9] text-[#032b41] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-[200px] md:min-w-[200px]`}
      >
        <div className="flex h-full flex-1 flex-col justify-between overflow-y-auto pb-5">
          <div>
            <Link href="/for-you" className="mx-auto flex h-[60px] w-[160px] items-center justify-center pt-4">
              <Image src="/logo.png" alt="Summarist" width={160} height={40} className="h-10 w-full object-contain" />
            </Link>

            <nav className="mt-10 flex flex-col">
              {mainLinks.map(({ href, label, icon: Icon }) => (
                <Link href={href} key={label} className={`relative mb-2 flex h-14 items-center px-4 transition-colors hover:bg-[#f0efef] ${pathname === href ? "bg-[#f1f6f4]" : ""}`}>
                  {pathname === href && (
                    <span className="absolute left-0 top-0 h-full w-[5px] bg-[#2bd97c]" aria-hidden="true" />
                  )}
                  <span className="mr-2 flex h-6 w-6 items-center justify-center">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="text-sm">{label}</span>
                </Link>
              ))}

              <div className="mb-2 flex h-14 cursor-not-allowed items-center px-4">
                <span className="mr-2 flex h-6 w-6 items-center justify-center"><FaPen className="h-6 w-6" aria-hidden="true" /></span>
                <span className="text-sm">Highlights</span>
              </div>
              <div className="mb-2 flex h-14 cursor-not-allowed items-center px-4">
                <span className="mr-2 flex h-6 w-6 items-center justify-center"><FaMagnifyingGlass className="h-6 w-6" aria-hidden="true" /></span>
                <span className="text-sm">Search</span>
              </div>
            </nav>
          </div>

          <nav className="flex flex-col">
            <Link 
              href="/settings" 
              className={`relative mb-2 flex h-14 items-center px-4 transition-colors hover:bg-[#f0efef]
               ${pathname === "/settings" ? 'bg-[#f1f6f4]' : ''}`}>
              {pathname === "/settings" && (
                <span className="absolute left-0 top-0 h-full w-[5px] bg-[#2bd97c]" aria-hidden="true" />
              )}
              <span className="mr-2 flex h-6 w-6 items-center justify-center"><FaGear className="h-6 w-6" aria-hidden="true" /></span>
              <span className="text-sm">Settings</span>
            </Link>
            <div className="mb-2 flex h-14 cursor-not-allowed items-center px-4">
              <span className="mr-2 flex h-6 w-6 items-center justify-center"><FaBookOpen className="h-6 w-6" aria-hidden="true" /></span>
              <span className="text-sm">Help &amp; Support</span>
            </div>
            <button
              type="button"
              onClick={user ? handleLogout : () => setShowLogin(true)}
              className="flex h-14 w-full cursor-pointer items-center px-4 text-left transition-colors hover:bg-[#f0efef]"
            >
              <span className="mr-2 flex h-6 w-6 items-center justify-center"><FaRightFromBracket className="h-6 w-6" aria-hidden="true" /></span>
              <span className="text-sm">{user ? "Logout" : "Login"}</span>
            </button>
          </nav>
        </div>
      </aside>

      {showLogin && (
        <div className="fixed inset-0 z-[1000] flex h-full w-full flex-col items-center justify-center bg-black/75 p-4">
          <LoginForm onClose={() => setShowLogin(false)} redirectTo={pathname} />
        </div>
      )}
    </>
  );
}
