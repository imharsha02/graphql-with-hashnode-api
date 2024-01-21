"use client";
import { useContext, useEffect } from "react";
import { detailsContext } from "../context/DetailsContext";
import Image from "next/image";

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
    <div>
      <div className="flex items-center gap-3">
        <span>Profile pic</span>
        <Image
          src={details.data.user.profilePicture}
          alt={details.data.user.name}
          width={32}
          height={32}
          className="rounded-lg"
        />
      </div>
      <p>Username: {details.data.user.username}</p>
      <p>Name: {details.data.user.name}</p>
      <p>Bio: {details.data.user.bio.text}</p>
      <p>socialMediaLinks: {details.data.user.socialMediaLinks.twitter}</p>
      <p>Followed by: {details.data.user.followersCount} people</p>
      <p>Follows {details.data.user.followingsCount} people</p>
    </div>
  );
};

export default UserPage;
