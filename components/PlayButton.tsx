"use client";

import { FaPlay } from "react-icons/fa";
import usePlayer from "@/hooks/usePlayer";

interface PlayButtonProps {
  songId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ songId }) => {
  const player = usePlayer();

  const handlePlay = (event: React.MouseEvent) => {
    event.stopPropagation();
    player.setId(songId);
    player.setIds([songId]);
  };

  return (
    <button
      onClick={handlePlay}
      className="transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md translate 
      translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110"
    >
      <FaPlay className="text-black" />
    </button>
  );
};

export default PlayButton;
