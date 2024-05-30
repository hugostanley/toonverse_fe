import { Outlet } from "react-router-dom";
import { ArtistSidebar } from "@pages";

function ArtistLayout() {
  return (
    <main className="">
      <ArtistSidebar />
      <Outlet /> 
    </main>
  )
}

export default ArtistLayout