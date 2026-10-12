'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onIdTokenChanged, type User } from 'firebase/auth';
import { getFirebaseAuth } from '@/services/firebase';

export type SubscriptionPlan = 'Basic' | 'Premium-plan';

type AuthState = { user: User | null; loading: boolean; subscriptionPlan: SubscriptionPlan };

const AuthContext = createContext<AuthState>({ user: null, loading: true, subscriptionPlan: 'Basic' });

// A missing Firebase config means "signed out", not a crashed dashboard.
function tryGetAuth() {
  try {
    return getFirebaseAuth();
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth] = useState(tryGetAuth);
  const [session, setSession] = useState<{
    user: User | null;
    subscriptionPlan: SubscriptionPlan;
    resolved: boolean;
  }>({
    user: null,
    subscriptionPlan: 'Basic',
    resolved: false,
  });

  useEffect(() => {
    if (!auth) return;

    let currentRequest = 0;
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      const requestId = ++currentRequest;
      if (!user) {
        setSession({ user: null, subscriptionPlan: 'Basic', resolved: true });
        return;
      }

      void user.getIdTokenResult().then(({ claims }) => {
        if (requestId !== currentRequest) return;
        setSession({
          user,
          subscriptionPlan: claims.subscriptionPlan === 'premium-plan' ? 'Premium-plan' : 'Basic',
          resolved: true,
        });
      }).catch(() => {
        if (requestId === currentRequest) {
          setSession({ user, subscriptionPlan: 'Basic', resolved: true });
        }
      });
    });

    return () => {
      currentRequest += 1;
      unsubscribe();
    };
  }, [auth]);

  return (
    <AuthContext value={{
      user: session.user,
      loading: auth !== null && !session.resolved,
      subscriptionPlan: session.subscriptionPlan,
    }}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
