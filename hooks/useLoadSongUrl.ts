import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSongUrl = (song: Song | undefined) => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return "";
  }

  try {
    const { data: songData } = supabaseClient.storage
      .from("songs")
      .getPublicUrl(song.song_path);

    return songData.publicUrl;
  } catch (error) {
    console.error("Error loading song URL:", error);
    return "";
  }
};

export default useLoadSongUrl;
