'use client';

import { useEffect, useState } from 'react';

export default function BookDuration({ audioLink }: { audioLink?: string }) {
  const [duration, setDuration] = useState('--:--');

  useEffect(() => {
    if (!audioLink) return;

    setDuration('--:--');
    const audio = new Audio();
    const handleLoadedMetadata = () => {
      const totalSeconds = Math.floor(audio.duration);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      setDuration(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.src = audioLink;

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.src = '';
    };
  }, [audioLink]);

  return <span>{duration}</span>;
}