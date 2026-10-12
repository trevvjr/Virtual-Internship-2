'use client';

import {useState} from 'react';
import LoginForm from './Loginform';

export default function LibraryLoginPrompt() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <main className='mx-auto flex w-full max-w-[1070px] flex-col items-center px-6 py-20 text-center'>
            <img src='/login.png' alt='' className='mb-6 w-full max-w-[460px]' />
            <h1 className='mb-6 text-2xl font-bold text-[#032b41]'>
                Log in to your account to see your library.
            </h1>
            <button 
                type='button'
                onClick={() => setShowLogin(true)}
                className='h-10 w-48 rounded bg-[#2bd97c] font-medium text-[#032b41] hover:opacity-90'
                >
                Login
            </button>
            {showLogin && (
                <div className='fixed inset-0 z-[1000] flex h-full w-full flex-col items-center justify-center bg-black/75 p-4'>
                    <LoginForm onClose={() => setShowLogin(false)} redirectTo='/library' />
                </div>
            )}
        </main>
    );
}