'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { FaBackward, FaForward, FaPause, FaPlay } from 'react-icons/fa6';
import type { Book } from '@/services/books';

const textSizes = ['text-base', 'text-lg', 'text-xl', 'text-2xl'] as const;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return '00:00';
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, '0')}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
}

export default function BookPlayer({ book }: { book: Book }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isSeekingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [textSize, setTextSize] = useState(0);
  const paragraphs = book.summary.split(/\n\s*\n/).filter(Boolean);
  const remainingTime = Math.max(0, duration - currentTime);

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
    }
  }

  function skip(seconds: number) {
    const audio = audioRef.current;
    if (audio) audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + seconds));
  }

  return (
    <>
      <main className="mx-auto w-full max-w-[1070px] px-6 pb-36 pt-8 md:px-8">
        <article className="mx-auto max-w-[760px] text-[#032b41]">
          <header className="mb-7 border-b border-[#e1e7ea] pb-5">
            <h1 className="text-[22px] font-bold leading-snug">{book.title}</h1>
          </header>

          <div className="mb-6 flex items-center justify-end gap-1" aria-label="Reading text size">
            {textSizes.map((size, index) => (
              <button
                key={size}
                type="button"
                aria-label={`Text size ${index + 1}`}
                aria-pressed={textSize === index}
                onClick={() => setTextSize(index)}
                className={`px-2 py-1 font-semibold text-[#032b41] ${index === textSize ? 'border-b-2 border-[#2bd97c]' : 'opacity-70 hover:opacity-100'}`}
              >
                <span className={index > 1 ? 'text-xl' : 'text-base'}>Aa</span>
              </button>
            ))}
          </div>

          <div className={`space-y-6 leading-relaxed text-[#293b42] ${textSizes[textSize]}`}>
            {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </article>
      </main>

      <audio
        ref={audioRef}
        src={book.audioLink}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => {
          if (!isSeekingRef.current) setCurrentTime(event.currentTarget.currentTime);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      <section className="fixed bottom-0 left-0 z-20 grid min-h-[80px] w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-t border-[#032b41] bg-[#032b41] px-3 py-3 text-white shadow-[0_-3px_12px_rgba(3,43,65,0.18)] sm:gap-4 sm:px-4 md:left-[200px] md:w-[calc(100%-200px)] md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:px-8" aria-label="Audio player">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Image src={book.imageLink} alt="" width={56} height={56} className="h-12 w-12 shrink-0 object-cover sm:h-14 sm:w-14" />
          <div className="min-w-0">
            <p className="line-clamp-2 text-sm font-semibold leading-tight">{book.title}</p>
            <p className="truncate text-xs text-[#66777d]">{book.author}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <button type="button" onClick={() => skip(-10)} aria-label="Back 10 seconds" className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full sm:h-9 sm:w-9">
            <FaBackward className="h-4 w-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={togglePlayback} aria-label={isPlaying ? 'Pause' : 'Play'} className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#032b41] sm:h-12 sm:w-12">
            {isPlaying ? <FaPause className="h-4 w-4" aria-hidden="true" /> : <FaPlay className="h-4 w-4 translate-x-0.5" aria-hidden="true" />}
          </button>
          <button type="button" onClick={() => skip(10)} aria-label="Forward 10 seconds" className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full sm:h-9 sm:w-9">
            <FaForward className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="col-span-2 flex min-w-0 items-center gap-2 sm:gap-3 md:col-span-1">
          <span className="text-xs tabular-nums">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={1}
            value={Math.min(currentTime, duration || 0)}
            disabled={!Number.isFinite(duration) || duration <= 0}
            onChange={(event) => {
              const nextTime = Number(event.target.value);
              setCurrentTime(nextTime);
              if (audioRef.current) audioRef.current.currentTime = nextTime;
            }}
            onPointerDown={() => {
              isSeekingRef.current = true;
            }}
            onPointerUp={() => {
              isSeekingRef.current = false;
              if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
            }}
            onPointerCancel={() => {
              isSeekingRef.current = false;
              if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
            }}
            onBlur={() => {
              isSeekingRef.current = false;
              if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
            }}
            aria-label="Seek through audio"
            aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
            className="h-8 min-w-0 flex-1 cursor-pointer accent-white disabled:cursor-not-allowed disabled:opacity-50"
          />
          <span className="text-xs tabular-nums" aria-label={`${formatTime(remainingTime)} remaining`}>
            -{formatTime(remainingTime)}
          </span>
        </div>
      </section>
    </>
  );
}
