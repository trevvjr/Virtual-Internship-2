'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { getFirebaseAuth } from "@/services/firebase";
import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa";

type LoginFormProps = {
  onClose: () => void;
  redirectTo?: string;
};

function authErrorMessage(err: unknown) {
  switch ((err as { code?: string }).code) {
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/invalid-api-key":
    case "auth/api-key-not-valid.-please-pass-a-valid-api-key.":
    case "auth/configuration-not-found":
      return "Firebase isn't configured. Check the NEXT_PUBLIC_FIREBASE_* values in .env.local.";
    case "auth/operation-not-allowed":
      return "This sign-in method isn't enabled in the Firebase console.";
    case "auth/unauthorized-domain":
      return "This domain isn't in Firebase's authorized domains.";
    case "auth/popup-blocked":
      return "Your browser blocked the sign-in window. Allow pop-ups and try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export default function LoginForm({ onClose, redirectTo = "/for-you" }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState("");
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const finishLogin = () => {
    sessionStorage.removeItem("guest");
    onClose();
    router.push(redirectTo);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
      finishLogin();
    } catch (err) {
      setError(authErrorMessage(err));
    }
  };

  const handleSignUp = async () => {
    setSignUpError("");

    if (!signUpEmail || !signUpPassword) {
      setSignUpError("Please enter both email and password.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(getFirebaseAuth(), signUpEmail, signUpPassword);
      finishLogin();
    } catch (err) {
      setSignUpError(authErrorMessage(err));
    }
  };

  const handleGuestLogin = () => {
    setIsGuestLoading(true);
    setTimeout(() => {
      sessionStorage.setItem("guest", "true");
      onClose();
      router.push(redirectTo);
    }, 1200);
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(getFirebaseAuth(), provider);
      finishLogin();
    } catch (err) {
      if ((err as { code?: string }).code !== "auth/popup-closed-by-user") {
        setError(authErrorMessage(err));
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="relative max-h-[calc(100svh-32px)] w-full max-w-[400px] overflow-y-auto rounded-lg bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)]">
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onClose();
        }}
        aria-label="Close login form"
        className="absolute right-3 top-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded text-2xl leading-none text-[#032b41] hover:opacity-75 transition-opacity duration-300"
      >
        X
      </button>

      <div className={showForgotPassword || showSignUp ? "hidden" : "px-8 pb-2 pt-12"}>
        <h2 className="mb-6 text-center text-xl font-bold text-[#032b41]">
          Log in to Summarist
        </h2>

        <button
          type="button"
          onClick={handleGuestLogin}
          disabled={isGuestLoading}
          className="cursor-pointer relative flex h-10 w-full items-center justify-center rounded bg-[#3a579d] text-base text-white transition-colors duration-200 hover:bg-[#25396b] disabled:cursor-not-allowed disabled:opacity-80 active:translate-y-[2px]"
        >
          {isGuestLoading ? (
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
              aria-label="Loading"
            />
          ) : (
            <>
              <FaUser className="absolute left-3 h-5 w-5" aria-hidden="true" />
              Log in as a Guest
            </>
          )}
        </button>

        <div className="my-4 flex items-center">
          <div className="h-px flex-1 bg-[#bac8ce]" />
          <span className="px-6 text-sm font-medium text-[#394547]">or</span>
          <div className="h-px flex-1 bg-[#bac8ce]" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="cursor-pointer relative flex h-10 w-full items-center justify-center rounded bg-[#4285f4] text-base text-white transition-colors duration-200 hover:bg-[#3367d6] active:translate-y-[2px]"
        >
          {isGoogleLoading ? (
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
              aria-label="Loading"
            />
          ): (
            <>
          <span className="absolute left-1 flex h-9 w-9 items-center justify-center rounded bg-white">
            <FcGoogle className="h-7 w-7" />
          </span>
          Login with Google
            </>
          )}
        </button>

        <div className="my-4 flex items-center">
          <div className="h-px flex-1 bg-[#bac8ce]" />
          <span className="px-6 text-sm font-medium text-[#394547]">or</span>
          <div className="h-px flex-1 bg-[#bac8ce]" />
        </div>

        <div className="my-4 h-px bg-[#bac8ce]" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <p className="rounded-md bg-red-100 p-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-10 rounded border-2 border-[#bac8ce] px-3 text-[#394547] outline-none focus:border-[#2bd97c] transition-colors duration-300"
            placeholder="Email Address"
            aria-label="Email Address"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-10 rounded border-2 border-[#bac8ce] px-3 text-[#394547] outline-none focus:border-[#2bd97c] transition-colors duration-300"
            placeholder="Password"
            aria-label="Password"
          />
          <button
            type="submit"
            className="cursor-pointer h-10 w-full rounded bg-[#2bd97c] text-base font-medium text-[#032b41] hover:bg-[#20ba68] transition-colors duration-300 active:translate-y-[2px]"
          >
            Login
          </button>
            <button 
              type="button"
              onClick={()=> setShowForgotPassword(true)}
              className="cursor-pointer text-center text-xs text-blue-500 hover:text-blue-800 transition-colors duration-300"
              aria-label='Close forgot password form'
            >
              Forgot Your Password?
            </button>
        </form>
      </div>
            <button
              type="button"
              onClick={() => setShowSignUp(true)}
              className="cursor-pointer h-10 w-full bg-[#f1f6f4] text-[#116be9] transition-colors hover:bg-gray-200"
            >
              Don&apos;t have an Account?
            </button>
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-[400px] overflow-hidden rounded-lg shadow-lg">
            <div className="relative bg-white px-6 pb-6 pt-12">
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="absolute right-4 top-3 cursor-pointer text-2xl text-[#032b41]"
                aria-label="Close reset password form"
              >
                X
              </button>

              <h2 className="mb-6 text-center text-xl font-bold text-[#032b41]">
                Reset your password
              </h2>

              <input
                type="email"
                placeholder="Email address"
                className="mb-4 h-10 w-full rounded border-2 border-[#bac8ce] px-3 text-[#394547] outline-none transition-colors duration-300 focus:border-[#2bd97c]"
              />
              <button
                type="button"
                className="cursor-pointer h-10 w-full rounded bg-[#2bd97c] text-base font-medium text-[#032b41] transition-colors duration-300 hover:bg-[#20ba68] active:translate-y-[2px]"
              >
                Send reset password link
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="cursor-pointer h-10 w-full bg-[#f1f6f4] text-[#116be9] transition-colors hover:bg-gray-200 "
            >
              Go to login
            </button>
            </div>
          </div>
      )}
      {showSignUp && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
          <div className='w-full max-w-[400px] overflow-hidden rounded-lg shadow-lg'>
            <div className='relative bg-white px-6 pb-2 pt-12'>
              <button
                type='button'
                onClick={() => setShowSignUp(false)}
                className='absolute right-4 top-3 cursor-pointer text-2xl text-[#032b41]'
                aria-label='Close sign up form'
              >
                X
              </button>

              <h2 className='mb-6 text-center text-xl font-bold text-[#032b41]'>
                Sign up to Summarist
              </h2>
              {(signUpError || error) && (
                <p className='mb-4 rounded-md bg-red-100 p-2 text-sm text-red-600'>
                  {signUpError || error}
                </p>
              )}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="cursor-pointer relative flex h-10 w-full items-center justify-center rounded bg-[#4285f4] text-base text-white transition-colors duration-200 hover:bg-[#3367d6] active:translate-y-[2px]"
        >
          <span className="absolute left-1 flex h-9 w-9 items-center justify-center rounded bg-white">
            <FcGoogle className="h-7 w-7" />
          </span>
          Login with Google
        </button>
            <div className="my-4 flex items-center">
            <div className="h-px flex-1 bg-[#bac8ce]" />
            <span className="px-6 text-sm font-medium text-[#394547]">or</span>
            <div className="h-px flex-1 bg-[#bac8ce]" />
         </div>
              <input
                type='email'
                value={signUpEmail}
                onChange={(event) => setSignUpEmail(event.target.value)}
                placeholder='Email address'
                className='mb-4 h-10 w-full rounded border-2 border-[#bac8ce] px-3 text-[#394547] outline-none transition-colors duration-300 focus:border-[#2bd97c]'
              />
              <input
                type='password'
                value={signUpPassword}
                onChange={(event) => setSignUpPassword(event.target.value)}
                placeholder='Password'
                className='mb-4 h-10 w-full rounded border-2 border-[#bac8ce] px-3 text-[#394547] outline-none transition-colors duration-300 focus:border-[#2bd97c]'
              />
              <button
                type='button'
                onClick={handleSignUp}
                className='cursor-pointer h-10 w-full rounded bg-[#2bd97c] text-base font-medium text-[#032b41] transition-colors duration-300 hover:bg-[#20ba68] active:translate-y-[2px]'
              >
                Sign Up
              </button>
            </div>
            <button
              type='button'
              onClick={() => setShowSignUp(false)}
              className='cursor-pointer h-10 w-full bg-[#f1f6f4] text-[#116be9] transition-colors hover:bg-gray-200'

            >
              Already have an account ?
            </button>
          </div>
        </div>
      )}
    </div>
  );
}