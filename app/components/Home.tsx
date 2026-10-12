'use client';
import { useState } from "react";
import Image from "next/image";
import React from "react";
import{
    AiFillFileText,
    AiFillBulb,
    AiFillAudio,
  } from "react-icons/ai";
import { FaCrown, FaLeaf } from "react-icons/fa6";
import Loginform from "./Loginform";
import Rating from "./ratings";

const features = [
  { icon: <AiFillFileText />, title: "Read or listen", description: "Save time by getting the core ideas from the best books." },
  { icon: <AiFillBulb />, title: "Find your next read", description: "Explore book lists and personalized recommendations." },
  { icon: <AiFillAudio />, title: "Briefcasts", description: "Gain valuable insights from briefcasts." },
];

const reviews = [
  ["Hanna M.", "This app has been a game-changer for me! It has saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers."],
  ["David B.", "I love this app! It provides concise and accurate summaries of books in a way that is easy to understand. It is also very user-friendly and intuitive."],
  ["Nathan S.", "This app is a great way to get the main takeaways from a book without having to read the entire thing. The summaries are well-written and informative."],
  ["Ryan R.", "If you are a busy person who loves reading but does not have the time to read every book in full, this app is for you!"],
];

const stats = [
  {
    icon: <FaCrown className="h-10 w-10 text-[#0365f2]" />, 
    number:"3 Million",
    title: "Downloads on all platforms"
  },


  {
    icon: <Rating rating={4.5} className="[&_svg]:h-6 [&_svg]:w-6" />,
    number: "4.5 Stars",
    title: "Average rating from our readers"
  },
  {
    icon: <FaLeaf className="h-10 w-10 text-[#0365f2]" />,
    number: "97%",
    title: "Of members create a better reading habit"
  },
];

const footerGroups = {
  Actions: ["Summarist Magazine", "Cancel Subscription", "Help", "Contact us"],
  "Useful Links": ["Pricing", "Summarist Business", "Gift Cards", "Authors & Publishers"],
  Company: ["About", "Careers", "Partners", "Code of Conduct"],
  Other: ["Sitemap", "Legal Notice", "Terms of Service", "Privacy Policies"],
};

const benefits = [
  "Enhance your knowledge",
  "Achieve greater success",
  "Improve your health",
  "Develop better parenting skills",
  "Increase happiness",
  "Be the best version of yourself!",
];

const benefits2 = [
  "Expand your learning",
  "Accomplish your goals",
  "Strengthen your vitality",
  "Become a better caregiver",
  "Improve your mood",
  "Maximize your abilities",
];
export default function Home() {
    const [showLogin, setShowLogin] = useState(false);

    return (
    <main className="max-w-full overflow-x-hidden text-[#032b41]">
      <nav className="h-20">
        <div className="mx-auto flex h-full max-w-[1070px] items-center justify-between px-6">
          <a className="nav__logo" href="#top" aria-label="Summarist home">
            <Image src='/logo.png' alt='Summarist' width={200} height={60} />
          </a>
          <ul className="flex gap-6">
            <li className="cursor-pointer text-[#032b41] transition-colors hover:text-[#2bd97c]">
                <button type="button" onClick={() => setShowLogin(true)}>Login</button>
            </li>
            <li className="hidden text-[#032b41] sm:block"><a href="#features">About</a></li>
            <li className="hidden text-[#032b41] sm:block"><a href="#reviews">Contact</a></li>
            <li className="hidden text-[#032b41] sm:block"><a href="#footer">Help</a></li>
          </ul>
        </div>
      </nav>

      <section id="top" className="bg-white">
        <div className="w-full py-10">
          <div className="mx-auto flex w-full max-w-[1070px] items-center justify-between px-6">
            <div className="w-full md:text-left">
              <h1 className="mb-6 text-[40px] font-bold text-[#032b41] max-md:text-center max-md:text-2xl">Gain more knowledge in less time</h1>
              <p className="mb-6 text-xl font-light leading-[1.5] text-[#394547] max-md:text-center max-md:text-base">Great summaries for busy people, individuals who barely have time to read, and even people who do not like to read.</p>
              <button className="flex h-10 w-full max-w-[300px] min-w-[180px] items-center justify-center rounded bg-[#2bd97c] text-base text-[#032b41] transition-colors duration-300 hover:bg-[#20ba68] cursor-pointer active:translate-y-[2px] max-md:mx-auto"
                type="button" onClick={() => setShowLogin(true)} >
                Login
              </button>
            </div>
            <div className="flex w-full justify-end max-md:hidden" aria-label="A stack of books">
              <Image className="h-full w-full max-w-[400px]" src="/landing.png" alt="Landing" width={600} height={400} />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-10">
        <div className="w-full py-10">
          <div className="mx-auto w-full max-w-[1070px] px-6">
          <h2 className="mb-8 text-center text-[32px] font-bold text-[#032b41] max-md:text-2xl">Understand books in a few minutes</h2>
          <div className="mb-24 grid grid-cols-3 gap-10 max-md:grid-cols-1">
            {features.map((feature) => (
              <article className="flex flex-col items-center text-center" key={feature.title}>
                <div className="mb-2 flex justify-center text-[#032b41] [&_svg]:h-[60px] [&_svg]:w-[60px]" aria-hidden="true">{feature.icon}</div>
                <h3 className="mb-4 text-xl font-medium text-[#032b41] sm:text-2xl">{feature.title}</h3>
                <p className="text-sm font-light text-[#394547] sm:text-lg">{feature.description}</p>
              </article>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto flex w-full max-w-[1070px] flex-col gap-10 px-6">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="flex flex-col justify-center gap-2 text-3xl font-medium text-gray-800">
              {benefits.map((benefit, index) => (
                <p key={benefit} className="benefit-text opacity-80" style={{ animationDelay: `${index * 2}s` }}>
                  {benefit}
                </p>
              ))}
            </div>
            <div className="flex w-full flex-col justify-center gap-6 bg-[#f1f6f4] px-6 py-10">
              <div className="flex gap-4"><strong className="mt-1 text-xl font-semibold text-[#0365f2]">93%</strong><p className="text-base font-light text-[#394547] sm:text-xl">of members <strong>significantly increase</strong> reading frequency.</p></div>
              <div className="flex gap-4"><strong className="mt-1 text-xl font-semibold text-[#0365f2]">96%</strong><p className="text-base font-light text-[#394547] sm:text-xl">of members <strong>establish better</strong> daily habits.</p></div>
              <div className="flex gap-4"><strong className="mt-1 text-xl font-semibold text-[#0365f2]">90%</strong><p className="text-base font-light text-[#394547] sm:text-xl">have made <strong>significant positive</strong> changes to their lives.</p></div>
            </div>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="flex w-full flex-col justify-center gap-6 bg-[#f1f6f4] px-6 py-10">
              <div className="flex gap-4"><strong className="mt-1 text-xl font-semibold text-[#0365f2]">91%</strong><p className="text-base font-light text-[#394547] sm:text-xl">of members report feeling more productive after incorporating the service into their daily routine.</p></div>
              <div className="flex gap-4"><strong className="mt-1 text-xl font-semibold text-[#0365f2]">94%</strong><p className="text-base font-light text-[#394547] sm:text-xl">of members have noticed an improvement in their overall comprehension and retention of information.</p></div>
              <div className="flex gap-4"><strong className="mt-1 text-xl font-semibold text-[#0365f2]">88%</strong><p className="text-base font-light text-[#394547] sm:text-xl">of members feel more informed about current events and industry trends.</p></div>
            </div>
            <div className="flex flex-col justify-center gap-2 text-3xl font-medium text-gray-800">
              {benefits2.map((benefit, index) => (
                <p key={benefit} className="benefit-text opacity-80" style={{ animationDelay: `${index * 2}s` }}>
                  {benefit}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-10">
        <div className="w-full py-10"><div className="mx-auto w-full max-w-[1070px] px-6">
          <h2 className="mb-8 text-center text-[32px] font-bold text-[#032b41] max-md:text-2xl">What our members say</h2>
          <div className="mx-auto max-w-[600px]">
            {reviews.map(([name, review]) => (
              <article className="mb-8 rounded bg-[#fff3d7] p-4 font-light" key={name}>
                <div className="mb-2 flex gap-2 text-[#032b41]"><h3>{name}</h3><Rating rating={5} /></div>
                <p className="leading-relaxed tracking-[0.3px] text-[#394547]">{review}</p>
              </article>
            ))}
          </div>
          <button 
            className="cursor-pointer mx-auto mt-8 flex h-10 w-full max-w-[300px] min-w-[180px] items-center justify-center rounded bg-[#2bd97c] text-base text-[#032b41] hover:bg-[#20ba68] transition-colors duration-300"    
            type="button"
            onClick={() => setShowLogin(true)}
            >
                Login
          </button>
        </div></div>
      </section>

      <section className="py-10">
        <div className="w-full py-10"><div className="mx-auto w-full max-w-[1070px] px-6">
          <h2 className="mb-8 text-center text-[32px] font-bold text-[#032b41] max-md:text-2xl">Start growing with Summarist now</h2>
          <div className="grid grid-cols-3 gap-10 max-md:grid-cols-1 max-md:gap-6">
            {stats.map(({ icon, number, title }) => (
              <div className="flex flex-col items-center rounded-xl bg-[#d7e9ff] px-6 pb-10 pt-6 text-center" key={number}>
                <div className="flex h-[60px] items-center justify-center text-4xl text-[#0365f2]">
                  {icon}
                </div>
                <strong className="mb-4 text-3xl font-semibold text-[#032b41] sm:text-[px]">{number}</strong>
                <p className="font-light text-[#394547]">{title}</p>
              </div>
            ))}
          </div>
        </div></div>
      </section>

      <footer id="footer" className="bg-[#f1f6f4]">
        <div className="w-full py-10"><div className="mx-auto w-full max-w-[1070px] px-6">
          <div className="relative my-8 mb-16 flex justify-between text-sm max-md:flex-col max-md:gap-8">
            {Object.entries(footerGroups).map(([title, links]) => (
              <div className="z-[1]" key={title}>
                <h3 className="mb-4 text-lg font-semibold text-[#032b41]">{title}</h3>
                {links.map((link) => <a className="mb-3 block text-[#394547]" href="#top" key={link}>{link}</a>)}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center text-center font-medium text-[#032b41]">Copyright &copy; 2023 Summarist.</div>
        </div></div>
      </footer>
      {showLogin && (
        <div className="fixed inset-0 z-[1000] flex h-full w-full flex-col items-center justify-center bg-black/75 p-4">
          <Loginform onClose={() => setShowLogin(false)} />
        </div>
      )}
    </main>
  );
}
