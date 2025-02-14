import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import getSongs from "./getSongs";
import { cookies } from "next/headers";
import { Song } from "@/types";

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  //   const { data: sessionData, error: sessionError } =
  //     await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }
  return (data as any) || [];
};

export default getSongsByTitle;
