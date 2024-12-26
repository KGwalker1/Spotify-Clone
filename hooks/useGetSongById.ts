import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";

const useGetSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchSong = async () => {
      try {
        setIsLoading(true);

        const { data, error } = await supabaseClient
          .from("songs")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        setSong(data as Song);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to load song"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSong();
  }, [id, supabaseClient]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default useGetSongById;
