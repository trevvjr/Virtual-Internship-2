'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaFileLines, FaHandshake, FaSeedling } from 'react-icons/fa6';
import { LuChevronDown } from 'react-icons/lu';
import { useAuth } from '@/app/components/auth-provider';

type Plan = 'yearly' | 'monthly';

const faqs = [
  {
    question: 'How does the free trial work?',
    answer:
      'The yearly plan includes a 7-day trial. You can explore the membership during that period. Review the checkout terms before confirming and cancel before the trial ends if you do not want to continue.',
  },
  {
    question: 'Can I switch between monthly and yearly plans?',
    answer:
      'Choose the billing period that works for you. Changes to an active membership depend on the subscription provider and your current billing period.',
  },
  {
    question: 'What is included with Premium?',
    answer:
      'Premium provides access to the available book summaries and listening features included with your membership.',
  },
  {
    question: 'Can I cancel during a trial or subscription?',
    answer:
      'You can manage cancellation through the billing provider used to start your membership. Review your account and billing details for the applicable terms.',
  },
];

const benefits = [
  { icon: FaFileLines, content: <>Short, focused <strong>ideas from books</strong></> },
  { icon: FaSeedling, content: <><strong>Build knowledge</strong> a little every day</> },
  { icon: FaHandshake, content: <><strong>Recommendations</strong> to help you find your next read</> },
];

export default function ChoosePlanPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan>('yearly');
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { user } = useAuth();
  const [openFaqs, setOpenFaqs] = useState<Set<string>>(
    () => new Set([faqs[0].question]),
  );

  function selectPlan(plan: Plan) {
    setSelectedPlan(plan);
    setCheckoutMessage('');
  }

  function toggleFaq(question: string) {
    setOpenFaqs((current) => {
      const next = new Set(current);
      if (next.has(question)) next.delete(question);
      else next.add(question);
      return next;
    });
  }

  async function startCheckout() {
    if (!user) {
      setCheckoutMessage('Sign in before starting checkout.');
      return;
    }

    setIsCheckingOut(true);
    setCheckoutMessage('Redirecting to checkout...');

    try {
      const token = await user.getIdToken();
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ billingPeriod: selectedPlan }),
      });
      const result: { url?: unknown; error?: unknown } = await response.json();

      if (!response.ok) {
        setCheckoutMessage(
          typeof result.error === 'string' ? result.error : 'Could not start checkout. Please try again.',
        );
        return;
      }

      if (typeof result.url !== 'string') {
        setCheckoutMessage('Could not start checkout. Please try again.');
        return;
      }

      window.location.assign(result.url);
    } catch {
      setCheckoutMessage('Could not start checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#032b41]">
      <section className="relative h-[500px] rounded-b-[18%] bg-[#032b41] px-5 pt-12 text-center text-white sm:h-[545px] sm:pt-12">
        <h1 className="mx-auto max-w-[850px] text-3xl font-bold leading-tight sm:text-[46px]">
          Get more from every moment with books you can explore
        </h1>
        <p className="mx-auto mt-8 max-w-[720px] text-base sm:text-xl">
          Turn a little time into a new idea, skill, or perspective.
        </p>
        <div className="absolute bottom-0 left-1/2 flex h-[255px] w-[300px] -translate-x-1/2 items-end justify-center overflow-hidden rounded-t-[180px] bg-white sm:h-[285px] sm:w-[340px]">
          <Image
            src="/pricing-top.png"
            alt="An illustration representing book learning"
            width={860}
            height={665}
            priority
            className="h-full w-full object-contain object-bottom"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-[950px] gap-7 px-6 pb-8 pt-14 text-center sm:grid-cols-3 sm:pt-16">
        {benefits.map(({ icon: Icon, content }, index) => (
          <div key={index} className="flex flex-col items-center gap-4">
            <Icon className="h-10 w-10 text-[#032b41]" aria-hidden="true" />
            <p className="max-w-[250px] text-base leading-relaxed text-[#394547]">{content}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-[680px] px-5 pb-8 pt-5">
        <h2 className="mb-7 text-center text-2xl font-bold sm:text-[30px]">
          Choose a plan that works for you
        </h2>

        <div role="radiogroup" aria-label="Subscription plan" className="space-y-4">
          <button
            type="button"
            role="radio"
            aria-checked={selectedPlan === 'yearly'}
            onClick={() => selectPlan('yearly')}
            className={`flex min-h-[120px] w-full items-start gap-5 rounded-sm border-[3px] px-6 py-5 text-left transition-colors ${
              selectedPlan === 'yearly'
                ? 'border-[#2bd97c] bg-[#f1f6f4]'
                : 'border-[#bac7cb] bg-[#f1f6f4] hover:border-[#2bd97c]'
            }`}
          >
            <span
              className={`mt-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#032b41] ${
                selectedPlan === 'yearly' ? 'after:h-2 after:w-2 after:rounded-full after:bg-[#032b41]' : ''
              }`}
              aria-hidden="true"
            />
            <span>
              <span className="block font-bold">Premium Plus Yearly</span>
              <span className="mt-1 block text-xl font-bold">$99.99/year</span>
              <span className="mt-1 block text-sm text-[#66777d]">7-day free trial included</span>
            </span>
          </button>

          <p className="py-1 text-center text-sm text-[#66777d]">— or —</p>

          <button
            type="button"
            role="radio"
            aria-checked={selectedPlan === 'monthly'}
            onClick={() => selectPlan('monthly')}
            className={`flex min-h-[120px] w-full items-start gap-5 rounded-sm border-[3px] px-6 py-5 text-left transition-colors ${
              selectedPlan === 'monthly'
                ? 'border-[#2bd97c] bg-[#f1f6f4]'
                : 'border-[#bac7cb] bg-[#f1f6f4] hover:border-[#2bd97c]'
            }`}
          >
            <span
              className={`mt-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#032b41] ${
                selectedPlan === 'monthly' ? 'after:h-2 after:w-2 after:rounded-full after:bg-[#032b41]' : ''
              }`}
              aria-hidden="true"
            />
            <span>
              <span className="block font-bold">Premium Monthly</span>
              <span className="mt-1 block text-xl font-bold">$9.99/month</span>
              <span className="mt-1 block text-sm text-[#66777d]">No trial included</span>
            </span>
          </button>
        </div>

        {checkoutMessage && (
          <p className="mt-4 text-center text-sm text-[#52666d]" role="status">
            {checkoutMessage}
          </p>
        )}

        <div className="sticky bottom-0 z-30 -mx-5 mt-6 bg-white/95 px-4 py-4 text-center backdrop-blur">
          <button
            type="button"
            onClick={startCheckout}
            disabled={isCheckingOut}
            className="w-full max-w-[300px] rounded bg-[#2bd97c] px-5 py-3 font-medium text-[#032b41] transition-colors hover:bg-[#27c76f]"
          >
            {isCheckingOut
              ? 'Connecting to checkout...'
              : selectedPlan === 'yearly'
                ? 'Start your free 7-day trial'
                : 'Continue with monthly plan'}
          </button>
          <p className="mt-2 text-xs text-[#66777d]">
            {selectedPlan === 'yearly'
              ? 'You can cancel before your trial ends to avoid being charged.'
              : 'Your monthly membership will begin after checkout.'}
          </p>
        </div>

        <div className="mt-12 divide-y divide-[#d7e0e3]">
          {faqs.map((faq, index) => {
            const isOpen = openFaqs.has(faq.question);
            const answerId = `plan-faq-answer-${index}`;

            return (
              <section key={faq.question} className="py-6">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleFaq(faq.question)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-xl font-bold"
                  >
                    {faq.question}
                    <LuChevronDown
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ease-in-out ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={answerId}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pt-5 text-base leading-relaxed text-[#394547]">{faq.answer}</p>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <footer className="bg-[#f1f6f4] px-6 py-12">
        <div className="mx-auto grid max-w-[950px] grid-cols-2 gap-8 sm:grid-cols-4">
          {[
            { heading: 'Explore', links: ['Browse books', 'Membership', 'Support', 'Contact'] },
            { heading: 'Resources', links: ['Pricing', 'For business', 'Gift membership', 'Publishers'] },
            { heading: 'Company', links: ['About', 'Careers', 'Partners', 'Our values'] },
            { heading: 'More', links: ['Sitemap', 'Legal', 'Terms', 'Privacy'] },
          ].map((column) => (
            <div key={column.heading}>
              <h2 className="mb-4 font-bold">{column.heading}</h2>
              <ul className="space-y-3 text-sm text-[#52666d]">
                {column.links.map((link) => <li key={link}>{link}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-[950px] text-sm text-[#66777d]">
          © 2026 Summarist
        </p>
      </footer>

    </main>
  );
}
