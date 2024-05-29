import { useState } from "react";
import { LogoutBtn } from "@components";
import { W_LOGOUT_URL } from "@utils";
import {
  faMarker,
  faIdBadge,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditArtist from "../admin/EditArtist";
import EditBio from "./EditBio";
import { Link } from "react-router-dom";

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
};
type ArtistProfileProps = {
  artistData: Artist | null;
  refetch: any;
};

function ArtistProfileInfo({ artistData, refetch }: ArtistProfileProps) {
  const [visible, setVisible] = useState(false);
  const [editBioVisible, setEditBioVisible] = useState(false);

  return (
    <div className="w-full h-screen text-white font-bold flex-center flex-col relative py-4">
      {artistData ? (
        <>
          <div
            className={`absolute ${
              visible ? "right-0" : "hidden"
            } top-4 w-full h-[95vh] z-10`}
          >
            <div className="bg-black w-[90%] h-[95vh] rounded-tl-2xl rounded-bl-2xl flex-center flex-col gap-4 absolute right-0 z-10  ">
              <h1 className="text-[2.5rem]">
                <FontAwesomeIcon icon={faIdBadge} className="rotate-12 text-yellow" />
                Personal Details
              </h1>
              <img src="" alt="" />

              <div className="w-[90%] h-[60vh] flex flex-col text-justify gap-2 ">
                <div className="text-[1.2rem] h-[8vh] flex justify-between border-b-2 capitalize">
                  <h1>First Name:</h1>
                  <h1>{artistData.first_name}</h1>
                </div>

                <div className="text-[1.2rem] h-[8vh] flex justify-between border-b-2 capitalize">
                  <h1>Last Name:</h1>
                  <h1>{artistData.last_name}</h1>
                </div>

                <div className="text-[1.2rem] h-[8vh] flex justify-between border-b-2 ">
                  <h1>My Bio:</h1>
                  <h1 className="italic">"{artistData.bio}"</h1>
                </div>

                <div className="text-[1.2rem] h-[8vh] flex justify-between border-b-2">
                  <h1>Email Address:</h1>
                  <h1>{artistData.email}</h1>
                </div>

                <div className="capitalize text-[1.2rem] h-[8vh] flex justify-between border-b-2">
                  <h1>Billing Address:</h1>
                  <h1>{artistData.billing_address}</h1>
                </div>
                <div className="capitalize text-[1.2rem] h-[8vh] flex justify-between border-b-2">
                  <h1>Contact No.:</h1>
                  <h1>+63{artistData.mobile_number}</h1>
                </div>
              </div>
              <EditArtist artist={artistData} />
            </div>
            <button
              className="absolute left-0 top-16 w-[10%] h-[20vh] bg-pink rounded-tl-xl rounded-bl-xl"
              onClick={() => setVisible(false)}
            >
              <FontAwesomeIcon icon={faMarker} className="text-[2rem]" />
            </button>
          </div>
          <button
            className="absolute right-0 top-20 w-[10%] h-[20vh] bg-pink rounded-tl-xl rounded-bl-xl flex-center shadow-md shadow-black"
            onClick={() => setVisible(true)}
          >
            <FontAwesomeIcon icon={faMarker} className="text-[2rem]" />
          </button>

          <img
            src="/src/assets/profile-icon.png"
            alt="profile-icon"
            className="w-1/2 border-4 border-white rounded-full shadow-md shadow-black bg-transparent flex-center "
          />
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
                <EditBio
                  artistData={artistData}
                  setBioVisible={setEditBioVisible}
                  refetch={refetch}
                />
              )}
            </h1>
          </div>
          <div className="w-full h-1/2 flex-center flex-col gap-4">
            {/* change ito link */}
            {/* <button className=" w-2/3 h-[5vh] flex-center text-black bg-yellow shadow-md shadow-black rounded-xl">Available Job</button> */}
            <Link
              to="/w/dashboard"
              className=" w-2/3 h-[5vh] flex-center text-black bg-yellow shadow-md shadow-black rounded-xl"
            >
              Dashboard
            </Link>
            <Link
              to="/w/jobs"
              className=" w-2/3 h-[5vh] flex-center text-black bg-yellow shadow-md shadow-black rounded-xl"
            >
              My Jobs
            </Link>
            {/* <button className=" w-2/3 h-[5vh] flex-center text-black bg-yellow shadow-md shadow-black rounded-xl">Artwork Gallery</button> */}
            <button className=" w-2/3 h-[5vh] flex-center text-black bg-pink shadow-md shadow-black rounded-xl">
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
