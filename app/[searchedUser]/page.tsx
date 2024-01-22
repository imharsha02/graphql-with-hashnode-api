"use client";
import { useContext, useEffect } from "react";
import { detailsContext } from "../context/DetailsContext";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

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

  return (
    <div className="h-full">
      <div className="grid grid-cols-2">
        <div className="text-center flex flex-col justify-evenly">
          <Image
            src={details.data.user.profilePicture}
            alt={details.data.user.name}
            width={256}
            height={256}
            className="rounded-lg mx-auto"
          />
          <h2 className="text-2xl font-bold">{details.data.user.username}</h2>
          <p className=" text-base font-semibold">{details.data.user.tagline}</p>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xl">Name:</span>
            <p className="text-lg">{details.data.user.name}</p>
          </div>
          <div className="flex gap-1">
            <span className="font-semibold text-xl">Bio:</span>
            <p className="text-lg">{details.data.user.bio.text}</p>
          </div>

          <div className="flex flex-col justify-center gap-1">
            <span className="font-semibold text-xl">Badges:</span>{" "}
            {details.data.user.badges.map((badge) => (
              <p className="text-lg pl-10" key={badge.id}>
                {badge.name}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xl">Followed by:</span>
            <p className="text-lg">
              {details.data.user.followersCount}{" "}
              {details.data.user.followersCount === 1 ? "person" : "people"}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xl">Following:</span>
            <p className="text-lg">
              {details.data.user.followingsCount}{" "}
              {details.data.user.followingsCount === 1 ? "person" : "people"}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xl">Connect: </span>
            {details.data.user.socialMediaLinks.twitter ? (
              <Link
                target="_blank"
                href={details.data.user.socialMediaLinks.twitter}
              >
                <FaTwitter className="bg-blue-500 text-white p-[2px] w-4 h-4" />
              </Link>
            ) : (
              ""
            )}
            {details.data.user.socialMediaLinks.github ? (
              <Link
                target="_blank"
                href={details.data.user.socialMediaLinks.github}
              >
                <FaGithub className="w-4 h-4" />
              </Link>
            ) : (
              ""
            )}
            {details.data.user.socialMediaLinks.linkedin ? (
              <Link
                target="_blank"
                href={details.data.user.socialMediaLinks.linkedin}
              >
                <FaLinkedin className="w-4 h-4 bg-white text-blue-500" />
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {/* INTERESTED TOPICS AND POSTS CONTAINER */}
      <div className="grid grid-cols-2 mt-5">
        {/* INTERESTED TOPICS */}
        <div>
          <span className="font-semibold text-2xl">Interested topics</span>
          <ul className="pl-10">
            {details.data.user.tagsFollowing.map((tag) => (
              <li key={tag.id} className="text-lg list-disc">
                {tag.name}
              </li>
            ))}
          </ul>
        </div>

        {/* POSTS */}
        <div>
          <span className="font-semibold text-2xl">Posts</span>
          {details.data.user.publications.edges.map((edge) =>
            edge.node.posts.edges.map((post) => (
              <ul key={post.node.title}>
                <li className="text-xl">
                  {"->"} {post.node.title}
                </li>
              </ul>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
