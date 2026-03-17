"use client";

import { useState, useRef, useEffect } from "react";

interface AudioPlayerProps {
  title: string;
  date: string;
  duration: string;
  audioUrl?: string;
  compact?: boolean;
}

export default function AudioPlayer({
  title,
  date,
  duration,
  audioUrl,
  compact = false,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setTotalDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  if (compact) {
    return (
      <div className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-temple-100 hover:border-saffron-200 hover:shadow-md transition-all duration-200">
        <audio ref={audioRef} src={audioUrl} preload="none" />
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-saffron-500 hover:bg-saffron-600 text-white flex items-center justify-center transition-colors shadow-sm"
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-temple-900 truncate group-hover:text-saffron-700 transition-colors">
            {title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-temple-500">{date}</span>
            <span className="text-temple-300">&middot;</span>
            <span className="text-xs text-temple-500">{duration}</span>
          </div>
        </div>
        <button className="flex-shrink-0 p-2 text-temple-400 hover:text-saffron-500 transition-colors opacity-0 group-hover:opacity-100">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-temple-100 shadow-lg overflow-hidden">
      <audio ref={audioRef} src={audioUrl} preload="none" />
      <div className="p-6">
        <p className="text-xs uppercase tracking-wider text-saffron-600 font-medium mb-2">
          Now Playing
        </p>
        <h3 className="font-display text-xl font-semibold text-temple-900 leading-snug">
          {title}
        </h3>
        <p className="text-sm text-temple-500 mt-1">{date}</p>

        {/* Progress bar */}
        <div className="mt-6">
          <input
            type="range"
            min={0}
            max={totalDuration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="audio-progress w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ee8c14 ${progress}%, #eee9e1 ${progress}%)`,
            }}
          />
          <div className="flex justify-between mt-2 text-xs text-temple-500">
            <span>{formatTime(currentTime)}</span>
            <span>{totalDuration > 0 ? formatTime(totalDuration) : duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <button className="p-2 text-temple-400 hover:text-temple-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
            </svg>
          </button>
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-saffron-500 hover:bg-saffron-600 text-white flex items-center justify-center transition-all shadow-md hover:shadow-lg hover:scale-105"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button className="p-2 text-temple-400 hover:text-temple-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
