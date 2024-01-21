"use client";
import { detailsContext } from "../context/DetailsContext";
import { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
const CodewithbhargavPage = () => {
  const { details, setSearchedUser } = useContext(detailsContext);
  useEffect(() => {
    setSearchedUser("codewithbhargav");
  }, [setSearchedUser]);
  if (!details) {
    return <div>Loading user details...</div>;
  }

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
        <p>Badges: {details.data.user.badges.image}</p>
        <p>Followed by: {details.data.user.followersCount} people</p>
        <p>Follows {details.data.user.followingsCount} people</p>

          <span>
            Connect:{" "}
          </span>
            <Link href={details.data.user.socialMediaLinks.twitter}>
              <FaTwitter className="bg-blue-500 text-white p-[2px] w-4 h-4" />
            </Link>
      </div>
    </div>
  );
};

export default CodewithbhargavPage;
