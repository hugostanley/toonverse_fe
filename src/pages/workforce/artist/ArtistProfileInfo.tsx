import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@utils";
import { ALL_ARTISTS } from "@utils";
import ArtistProfileForm from "./ArtistProfileForm";

type Artist = {
  id: string;
  first_name: string;
  last_name: string;
  bio: string;
  billing_address: string;
  mobile_number: number;
};

function ArtistProfileInfo() {
  const [artistData, setArtistData] = useState<Artist | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["ArtistProfile"],
    queryFn: async () => {
      const response = await apiClient.get<Artist[]>(ALL_ARTISTS);
      return response.data;
    },
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setArtistData(data[0]);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div>
      {data ? (
        <ul>
          {data.map((artist) => (
            <li key={artist.id}>{artist.first_name}</li>
          ))}
        </ul>
      ) : (
        <div>No data available</div>
      )}

      {artistData && <ArtistProfileForm artistData={artistData} />}
    </div>
  );
}

export default ArtistProfileInfo;
