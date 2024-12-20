"use client";

import { Song } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import { PlayButton } from "@/components/PlayButton";
interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);
  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative group flex flex-col items-center justify-center rounded-md 
  overflow-hidden gap-x-4 bg-neutral-400/5
  cursor-pointer hover:bg-neutral-300/50 transition p-3"
    >
      <div
        className="relative aspect-square w-full h-full rounded-md
      overflow-hidden"
      >
        <Image
          className="object-cover w-full h-full"
          fill
          src={imagePath || ""}
          alt="Image"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1"></div>
      <p className="font-semibold truncate w-full">{data.title}</p>
      <p className="text-neutral-300 text-sm pb-4 w-full truncate">
        By: {data.author}
      </p>
      <div className="absolute bott-24 right-5 ">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
