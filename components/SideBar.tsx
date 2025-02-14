"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { Song } from "@/types";

import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { ImOpt } from "react-icons/im";

interface SideBarProps {
  children: React.ReactNode;
  songs: Song[];
}

const SideBar: React.FC<SideBarProps> = ({ children, songs }) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        lable: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        lable: "Search",
        active: pathname !== "/home",
        href: "/search",
      },
    ],
    [pathname]
  );
  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.lable} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};

export default SideBar;
