import { useQuery } from '@tanstack/react-query';
import { ALL_ARTISTS, apiClient } from '@utils';
import { Spinner } from '@components';

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
}

function ArtistsList() {
  const { data, isLoading } = useQuery<Artist[]>({
    queryKey: ['allArtists'],
    queryFn: async () => {
      const response = await apiClient.get(ALL_ARTISTS);
      return response.data;
    },
  })

  if (isLoading) {
    return <section className='w-full h-full p-2 px-4 flex flex-col gap-2'><Spinner /></section>;
  }

  console.log('ALL_ARTISTS:', data);

  return (
    <div className='w-full h-full py-2 flex flex-col gap-2'>
      {data && 
        data.map((artist) => (
          <div key={artist.id} className='group flex flex-col gap-1 px-3 py-2 hover:bg-green/25 rounded-xl border-t-2 border-green/45 shadow-sm cursor-pointer'>
            <h1 className='text-lg tracking-widest group-hover:underline underline-offset-4'>{artist.email}</h1>
            <div className='font-light flex items-center gap-2'>
              <small>{`${artist.first_name} ${artist.last_name}`}</small>
              |
              <small>{artist.mobile_number}</small>
              </div>

              {/* TODO: 
              - create modal to display specific profile and edit profile
              - only show latest 10 artists (dynamic value ) */}

          </div>
        ))
      }
    </div>
  )
}

export default ArtistsList