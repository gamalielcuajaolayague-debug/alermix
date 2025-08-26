"use client";

import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';

export function useAlarm() {
  const [isPlaying, setIsPlaying] = useState(false);
  const synth = useRef<Tone.Synth | null>(null);
  const loop = useRef<Tone.Loop | null>(null);

  useEffect(() => {
    // Initialize synth only on the client
    if (typeof window !== 'undefined') {
      synth.current = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 },
      }).toDestination();
    }
  }, []);

  const play = () => {
    if (isPlaying) return;

    Tone.start().then(() => {
        if (!loop.current && synth.current) {
            loop.current = new Tone.Loop(time => {
                synth.current?.triggerAttackRelease("C5", "8n", time);
                synth.current?.triggerAttackRelease("G5", "8n", time + 0.5);
            }, "1n").start(0);
        }
        Tone.Transport.start();
        setIsPlaying(true);
    });
  };

  const stop = () => {
    Tone.Transport.stop();
    loop.current?.stop(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      Tone.Transport.stop();
      Tone.Transport.cancel();
    };
  }, []);

  return { play, stop, isPlaying };
}
