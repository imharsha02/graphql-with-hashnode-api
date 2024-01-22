"use client";
import { detailsContext } from "../context/DetailsContext";
import { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { GiSwordSmithing } from "react-icons/gi";
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
      <div className="grid grid-cols-2 content-center mb-10">

        {/* IMAGE, USERNAME AND TAGLINE */}
        <div className="text-center flex flex-col justify-evenly">
          <Image
            src={details.data.user.profilePicture}
            alt={details.data.user.name}
            width={256}
            height={256}
            className="rounded-lg mx-auto"
          />
          <h2 className="text-2xl font-bold">{details.data.user.username}</h2>
          <p className=" text-lg font-semibold">{details.data.user.tagline}</p>
        </div>

        {/* DETAILS */}
        <div className="flex flex-col justify-evenly space-y-2">
          
          {/* NAME */}
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xl">Name:</span>
            <p className="text-lg">{details.data.user.name}</p>
          </div>
          
          {/* BIO */}
          <div className="flex gap-1">
            <span className="font-semibold text-xl">Bio:</span>
            <p className="text-lg">{details.data.user.bio.text}</p>
          </div>

          {/* BIO */}
          <div className="flex flex-col justify-center gap-1">
            <span className="font-semibold text-xl">Badges:</span>{" "}
            {details.data.user.badges.map((badge) => (
              <p key={badge.id} className="pl-10 text-lg">
                {badge.name}
              </p>
            ))}
          </div>
          
          {/* FOLLOWERS */}
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xl">Followed by:</span>
            <p className="text-lg">
              {details.data.user.followersCount}{" "}
              {details.data.user.followersCount === 1 ? "person" : "people"}
            </p>
          </div>
          
          {/* FOLLOWING */}
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xl">Following:</span>
            <p text-lg>
              {details.data.user.followingsCount}{" "}
              {details.data.user.followingsCount === 1 ? "person" : "people"}
            </p>
          </div>

          {/* SOCIAL MEDIA LINKS */}
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

      {/* POSTS AND INTERESTS CONTAINER */}
      <div className="grid grid-cols-2 mt-5">
        
        {/* INTERESTS */}
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

export default CodewithbhargavPage;
