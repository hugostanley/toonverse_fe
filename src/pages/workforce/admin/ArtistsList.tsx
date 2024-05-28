import { useQuery } from "@tanstack/react-query";
import { ALL_ARTISTS, apiClient } from "@utils";
import { Spinner } from "@components";

type Artist = {
  email: string;
  id: number;
  first_name: string;
  last_name: string;
  mobile_number: string;
  billing_address: string;
  total_earnings: number;
  created_at: string;
  updated_at: string;
};

type Props = {
  className?: string | null;
};

function ArtistsList({ className }: Props) {
  const { data, isLoading } = useQuery<Artist[]>({
    queryKey: ["allArtists"],
    queryFn: async () => {
      const response = await apiClient.get(ALL_ARTISTS);
      return response.data;
    },
  })

  return (
    <div className='w-full h-full py-2 flex flex-col gap-1'>
      {isLoading ? (
        <div className='h-full w-full grid place-items-center'>
          <Spinner />{" "}
        </div>
      ) : (
        data &&
        data.slice(0, 4).map((artist) => (
          <div
            key={artist.id}
            className={`group flex flex-col gap-1 px-3 py-3 cursor-default ${className}`}
          >
            <h1 className='tracking-widest'>{artist.email}</h1>
            <div className='font-light flex items-center gap-2 opacity-70'>
              <small>{`${artist.first_name} ${artist.last_name}`}</small>|
              <small>+63{artist.mobile_number}</small>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ArtistsList
