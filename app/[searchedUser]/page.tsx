"use client";
import { useContext, useEffect } from "react";
import { detailsContext } from "../context/DetailsContext";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ResponsiveSunburst } from '@nivo/sunburst'
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
  console.log(details.data.user.publications.edges)

  // DATA TO USE IN GRAPH
  const data = {
    name: "publications",
    color: "hsl(297, 70%, 50%)",
    loc: details.data.user.publications.totalDocuments,
    children: 
      details.data.user.publications.edges.map(pub => ({
        name: pub.node.title,
        loc: pub.node.posts.edges.length,
        color: "hsl(234, 70%, 50%)",
        children: pub.node.posts.edges.map(post => ({
          name: post.node.title,
          color: "hsl(229, 70%, 50%)",
          loc: post.node.tags ? post.node.tags.length : 1,
          children: post.node.tags?.map((tag) => ({
            name: tag.name,
            color: "hsl(250, 70%, 50%)",
            loc: 1
          }))
        }))
      }))
    
  }
  console.log("data", data)
  return (
    <div className="h-full">
      <div className="grid grid-cols-2">

        {/* IMAGE, USERNAME AND TAG */}
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

        {/* DETAILS */}
        <div className="flex flex-col justify-between">

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

          {/* BADGES */}
          <div className="flex flex-col justify-center gap-1">
            <span className="font-semibold text-xl">Badges:</span>{" "}
            {details.data.user.badges.map((badge) => (
              <p className="text-lg pl-10" key={badge.id}>
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
            <p className="text-lg">
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

      {/* POSTS STATS */}
      <div className="h-96">
      <ResponsiveSunburst
        data={data}
        
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        id="name"
        value="loc"
        cornerRadius={2}
        borderColor={{ theme: 'background' }}
        colors={{ scheme: 'nivo' }}
        childColor={{
            from: 'color',
            modifiers: [
                [
                    'brighter',
                    0.1
                ]
            ]
        }}
        enableArcLabels={true}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.4
                ]
            ]
        }}
    />
      </div>
    </div>
  );
};

export default UserPage;
