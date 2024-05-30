import { Outlet } from "react-router-dom";
import { ArtistSidebar } from "@pages";

function ArtistLayout() {
  return (
    <main className="w-full h-full bg-ivory">
      <ArtistSidebar />
      <Outlet /> 
    </main>
  )
}

export default ArtistLayout