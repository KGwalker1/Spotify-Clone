"use client";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useState, useEffect } from "react";
import useSound from "use-sound";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const [play, { pause, sound, stop }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    const index = player.ids.findIndex((id) => id === player.activeId);
    setSongIndex(index);
  }, [player.activeId, player.ids]);

  useEffect(() => {
    // Stop and unload previous song before playing new one
    if (sound) {
      sound.stop();
      setIsPlaying(false);

      // Small delay before playing new song
      setTimeout(() => {
        play();
      }, 100);
    }

    return () => {
      sound?.unload();
    };
  }, [songUrl, sound, play]);

  const onPlayNext = () => {
    if (player.ids.length === 0) return;

    if (sound) {
      sound.stop();
      setIsPlaying(false);
    }

    const nextIndex = (songIndex + 1) % player.ids.length;
    setSongIndex(nextIndex);
    player.setId(player.ids[nextIndex]);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;

    if (sound) {
      sound.stop();
      setIsPlaying(false);
    }

    const prevIndex = songIndex === 0 ? player.ids.length - 1 : songIndex - 1;
    setSongIndex(prevIndex);
    player.setId(player.ids[prevIndex]);
  };

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  if (!song?.id) {
    return null;
  }

  const playAudio = () => {
    try {
      if (!songUrl) {
        throw new Error("No song URL available");
      }

      play();
      console.log("Playing audio:", songUrl);
    } catch (error) {
      console.error("Failed to play:", error);
    }
  };

  useEffect(() => {
    if (!songUrl) return;

    playAudio();

    return () => {
      if (sound) {
        sound.unload();
      }
    };
  }, [songUrl]);

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>
      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider
            value={volume}
            onChange={(value) => {
              setVolume(value);
            }}
            max={1}
            step={0.1}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
