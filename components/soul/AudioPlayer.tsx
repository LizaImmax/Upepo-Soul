'use client';

import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  url: string;
  title?: string;
  autoPlay?: boolean;
}

export default function AudioPlayer({ url, title, autoPlay = false }: AudioPlayerProps) {
  const playerRef = useRef<any>(null);
  const [playing, setPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPlayed(value);
    playerRef.current?.seekTo(value);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = () => {
    setSeeking(false);
  };

  const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSkipBack = () => {
    const currentTime = played * duration;
    const newTime = Math.max(0, currentTime - 10);
    playerRef.current?.seekTo(newTime, 'seconds');
  };

  const handleSkipForward = () => {
    const currentTime = played * duration;
    const newTime = Math.min(duration, currentTime + 10);
    playerRef.current?.seekTo(newTime, 'seconds');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-br from-orchid-50 to-lotus-50 rounded-3xl p-8 border-2 border-orchid-200 shadow-xl">
      {title && (
        <h3 className="text-2xl font-serif font-bold text-orchid-800 mb-6 text-center">
          {title}
        </h3>
      )}

      {/* Hidden ReactPlayer */}
      <div className="hidden">
        {/* @ts-expect-error - ReactPlayer types mismatch */}
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={playing}
          volume={volume}
          muted={muted}
          onProgress={handleProgress as any}
          onDuration={handleDuration}
          width="0"
          height="0"
        />
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <input
          type="range"
          min={0}
          max={0.999999}
          step="any"
          value={played}
          onChange={handleSeek}
          onMouseDown={handleSeekMouseDown}
          onMouseUp={handleSeekMouseUp}
          className="w-full h-2 bg-orchid-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orchid-600 [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <div className="flex justify-between text-sm text-orchid-600 mt-2">
          <span>{formatTime(played * duration)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <button
          onClick={handleSkipBack}
          className="p-3 rounded-full bg-orchid-100 text-orchid-700 hover:bg-orchid-200 transition-all"
          title="Skip back 10s"
        >
          <SkipBack className="w-6 h-6" />
        </button>

        <button
          onClick={handlePlayPause}
          className="p-6 rounded-full bg-gradient-to-r from-orchid-500 to-lotus-500 text-white hover:shadow-lg transition-all transform hover:scale-105"
        >
          {playing ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8 ml-1" />
          )}
        </button>

        <button
          onClick={handleSkipForward}
          className="p-3 rounded-full bg-orchid-100 text-orchid-700 hover:bg-orchid-200 transition-all"
          title="Skip forward 10s"
        >
          <SkipForward className="w-6 h-6" />
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={() => setMuted(!muted)}
          className="p-2 rounded-lg text-orchid-600 hover:bg-orchid-100 transition-all"
        >
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-32 h-2 bg-orchid-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orchid-600 [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );
}
