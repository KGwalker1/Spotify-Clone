"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import usePlayer from "@/hooks/usePlayer";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
  data: any;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href, data }) => {
  const router = useRouter();
  const player = usePlayer();

  const onClick = () => {
    if (data) {
      player.setId(data.id);
      player.setIds([data.id]);
    }
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image className="object-cover" fill src={image} alt="Image" />
      </div>
      <p className="font-medium truncate py-4 ">{name}</p>
      <div
        className="aboslute transition opacity-0 rounded-full flex itmes-center 
      justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:110"
      >
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

export default ListItem;
