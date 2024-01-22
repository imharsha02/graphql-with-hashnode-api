"use client";
import { useContext, useEffect } from "react";
import { detailsContext } from "../context/DetailsContext";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";

const UserPage = ({ params }: { params: { searchedUser: string } }) => {
  const { details, setSearchedUser } = useContext(detailsContext);

  useEffect(() => {
    setSearchedUser(params.searchedUser); // Trigger a re-fetch with the new user
  }, [params.searchedUser, setSearchedUser]);

  if (!details) {
    return <div>Loading user details...</div>;
  }

  if (details.data.user.username !== params.searchedUser) {
    // If the usernames don't match, this means the data is not for the correct user.
    return <div>Loading user details...</div>;
  }

  // Now it's safe to assume details.data.user contains the correct user info

  console.log(details);
  return (
    <div className="h-full">
      <div className="max-w-full space-y-1 mb-1 text-center flex flex-col">
        <Image
          src={details.data.user.profilePicture}
          alt={details.data.user.name}
          width={58}
          height={58}
          className="rounded-lg mx-auto"
        />
        <h2 className="text-2xl font-bold">{details.data.user.username}</h2>
        <p className=" text-lg font-semibold mt-2">{details.data.user.tagline}</p>
      </div>
      <div>
      <p>Name: {details.data.user.name}</p>
        <p>Bio: {details.data.user.bio.text}</p>
    
        <div className="flex items-center gap-1">
          <span>Badges:</span>{" "}
          {details.data.user.badges.map((badge) => (
            <p key={badge.id}>{badge.name}</p>
          ))}
        </div>
        <p>Followed by: {details.data.user.followersCount} people</p>
        <div>
          <p className="flex items-center gap-1">
            <span>Connect:{" "}</span>
            <Link target="_blank" href={details.data.user.socialMediaLinks.twitter}>
              <FaTwitter className="bg-blue-500 text-white p-[2px] w-4 h-4" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
