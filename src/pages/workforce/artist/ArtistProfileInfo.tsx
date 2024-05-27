import { useState } from "react";
import { LogoutBtn } from "@components";
import { W_LOGOUT_URL } from "@utils";
import { faMarker, faIdBadge, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditArtist from "../admin/EditArtist";
import EditBio from "./EditBio";

type Artist = {
  email: string;
  id: number;
  bio: string;
  first_name: string;
  last_name: string;
  mobile_number: string;
  billing_address: string;
  total_earnings: number;
  created_at: string;
  updated_at: string;
  workforce_id: string;
}
type ArtistProfileProps = {
  artistData: Artist | null;
};

function ArtistProfileInfo({ artistData }: ArtistProfileProps) {
  const [visible, setVisible] = useState(false);
  const [editBioVisible, setEditBioVisible] = useState(false);


  return (
    <div className="w-[90%] h-screen text-white font-bold flex-center flex-col relative py-4">
      {artistData ? (
        <>
          <div
            className={`absolute ${
              visible ? "-left-4" : "-left-[50rem]"
            } top-4 w-full h-[95vh] transition-all duration-300 z-10`}
          >
            <div className="bg-pink w-[90%] h-[95vh] rounded-2xl flex-center flex-col gap-4">
              <h1 className="text-[2.5rem]">
                <FontAwesomeIcon icon={faIdBadge} className="rotate-12" />
                Personal Details
              </h1>
              <div className="w-[70%] flex flex-col text-justify gap-2">
                <h1 className="">Email: {artistData.email}</h1>
                <h1 className="capitalize">
                  Billing Address: {artistData.billing_address}
                </h1>
                <h1 className="capitalize">
                  Contact No.: +63{artistData.mobile_number}
                </h1>
              </div>
              <EditArtist artist={artistData} />
            </div>
            <button
              className="absolute right-0 top-16 w-[15%] h-[20vh] bg-pink rounded-xl"
              onClick={() => setVisible(false)}
            >
              <FontAwesomeIcon icon={faMarker} className="text-[2rem]" />
            </button>
          </div>
          <button
            className="absolute -left-6 top-20 w-[15%] h-[20vh] bg-pink rounded-xl flex-center shadow-md shadow-black"
            onClick={() => setVisible(true)}
          >
            <FontAwesomeIcon icon={faMarker} className="text-[2rem]" />
          </button>

          <img src="/src/assets/profile-icon.png" alt="profile-icon" className="w-[45%] h-[30vh] border-4 border-white rounded-full shadow-md shadow-black bg-transparent flex-center "/>
          <div className=" flex-center flex-col w-full h-[15vh]">
            <h1 className="capitalize text-[2.5rem] ">
              {artistData.first_name} {artistData.last_name}
            </h1>
            <h1 className="capitalize">
              {!editBioVisible ? (
                <>
                  "{artistData.bio}"
                  <button
                    className="ml-2"
                    onClick={() => setEditBioVisible(true)}
                  >
                    <FontAwesomeIcon icon={faPencil} className="text-2" />
                  </button>
                </>
              ) : (
                <EditBio artistData={artistData} setBioVisible={setEditBioVisible} />
              )}
            </h1>
          </div>
          <div className="w-full h-[45vh] flex-center flex-col justify-evenly">
            {/* change ito link */}
            <button className=" w-[30%] h-[5vh] flex-center bg-yellow shadow-md shadow-black rounded-xl">Works</button>
            <button className=" w-[30%] h-[5vh] flex-center bg-yellow shadow-md shadow-black rounded-xl">Job History</button>
            <button className=" w-[30%] h-[5vh] flex-center bg-yellow shadow-md shadow-black rounded-xl">Artwork Gallery</button>
            <button className=" w-[30%] h-[5vh] flex-center bg-pink shadow-md shadow-black rounded-xl">
              <LogoutBtn apiUrl={W_LOGOUT_URL} redirectPath="/w/login" />
            </button>
          </div>
        </>
      ) : (
        <p>No artist data available</p>
      )}
    </div>
  );
}

export default ArtistProfileInfo;
