"use client";
import { detailsContext } from "../context/DetailsContext";
import { useContext, useEffect } from "react";
import Image from "next/image";
const CodewithbhargavPage = () => {
  const { details, setSearchedUser } = useContext(detailsContext);
  useEffect(() => {
    setSearchedUser("codewithbhargav");
  }, [setSearchedUser]);
  if (!details) {
    return <div>Loading user details...</div>;
  }

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

export default CodewithbhargavPage;
