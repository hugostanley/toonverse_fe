import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { apiClient } from "@utils";
import { ALL_ARTISTS } from "@utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

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

type ArtistFormProps = {
  artistData: Artist | null;
  setBioVisible: (visible: boolean) => void;
};

type Bio = {
  bio: string;
};

function EditBio({ artistData, setBioVisible }: ArtistFormProps) {
  const [bio, setBio] = useState<Bio>({
    bio: artistData?.bio || "",
  });

  useEffect(() => {
    if (artistData) {
      setBio({ bio: artistData.bio });
    }
  }, [artistData]);

  const handleChange = (name: keyof Bio, value: string) => {
    setBio((prevBio) => ({
      ...prevBio,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createBioMutation.mutate(bio);
  };

  const createBioMutation = useMutation({
    mutationFn: async (bio: Bio) => {
      try {
        const response = await apiClient.post(ALL_ARTISTS, bio);
        return response.data;
      } catch (error) {
        console.error("Error creating artist bio:", error);
        throw error;
      }
    },
    onSuccess: () => {
      setBioVisible(false); // Hide the edit form on successful submission
    },
    onError: (error) => {
      console.error("Error submitting artist bio:", error);
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex-center flex-row gap-2">
        <textarea
          name="bio"
          value={bio.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          className="bg-transparent border-pink border-4 w-[90%] h-[5vh] max-h-[10vh]"
          maxLength={210}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faPencil} className="text-2" />
        </button>
      </form>
    </div>
  );
}

export default EditBio;
