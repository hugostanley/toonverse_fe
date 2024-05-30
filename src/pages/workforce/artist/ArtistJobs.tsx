import { ArtistJobsTable } from "@pages";

function ArtistJobs() {
  return (
    <section className="w-full h-full p-4 flex flex-col gap-3 relative">
      <h1 className="w-full py-2 border-b-2 border-gray-400/60 flex justify-between text-3xl font-bold font-header">
        My Jobs
      </h1>

      <ArtistJobsTable />
    </section>
  );
}

export default ArtistJobs
