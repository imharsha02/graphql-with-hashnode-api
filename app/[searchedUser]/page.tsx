"use client";
import { useContext, useEffect, useState } from "react";
import { detailsContext } from "../context/DetailsContext";
import { FaHashnode } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ResponsiveSunburst } from "@nivo/sunburst";
import { Button } from "@/components/ui/button";
import UserCard from "@/components/ui/UserCard/UserCard";
const UserPage = ({ params }: { params: { searchedUser: string } }) => {
  const { details, setSearchedUser } = useContext(detailsContext);
  const [showAllFollowing, setShowAllFollowing] = useState(false);
  const [showAllFollowers, setShowAllFollowers] = useState(false);
  const initialFollowingsToShow = 4;
  const [followersToShow, setFollowersToShow] = useState(
    initialFollowingsToShow
  );
  const [followingsToShow, setFollowingsToShow] = useState(
    initialFollowingsToShow
  );

  const toggleFollowersDisplay = () => {
    setShowAllFollowers(!showAllFollowers);

    const totalFollowers = details?.data?.user?.followers?.nodes?.length ?? 0;
  setFollowersToShow(showAllFollowers ? initialFollowingsToShow : totalFollowers);
};

  const toggleFollowingsDisplay = () => {
    setShowAllFollowing(!showAllFollowing);

    const totalFollowings = details?.data?.user?.follows?.nodes?.length ?? 0;
  setFollowingsToShow(showAllFollowing ? initialFollowingsToShow : totalFollowings);
  };

  useEffect(() => {
    console.log("called new", params.searchedUser);
    setSearchedUser(params.searchedUser); // Trigger a re-fetch with the new user
  }, [params.searchedUser, setSearchedUser]);

  if (!details) {
    return (
      <AiOutlineLoading3Quarters
        className="animate-spin text-6xl w-10 h-10/>;
  }

  if (details.data.user.username !== params.searchedUser) {
 <AiOutlineLoading3Quarters  className="
        animate-spin
        text-6xl
        w-10
        h-10
      />
    );
  }
  console.log(details.data.user.publications.edges);

  const data = {
    name: "publications",
    // color: "hsl(297, 70%, 50%)",
    loc: 1, // Root level
    children: details.data.user.publications.edges.map((pub) => {
      const baseValue = 1; // Base value for each publication's existence
      const postCount = pub.node.posts.edges.length;
      const totalValueForPublication = baseValue + postCount;

      return {
        name: pub.node.title,
        // color: "hsl(234, 70%, 50%)",
        children: pub.node.posts.edges.map((post) => ({
          url: post.node.url,
          name: post.node.title,
          color: "hsl(229, 70%, 50%)",
          loc: post.node.tags ? post.node.tags.length : 1,
        })),
      };
    }),
  };

  data.loc = data.children.reduce((sum, child: any) => sum + child.loc, 0);

  console.log("data", data);
  return (
    <div className="h-full">
      <h2 className="text-center text-6xl font-bold p-4">User Profile</h2>
      <UserCard className="mx-auto max-w-2xl hover:border-gray-200">
        {/* IMAGE, USERNAME AND TAG */}
        <div className="text-center flex flex-col space-y-2">
          <Image
            src={details.data.user.profilePicture}
            alt={details.data.user.name}
            width={256}
            height={256}
            className="rounded-lg mx-auto"
          />
          <div>
            <h2 className="text-2xl font-bold">{details.data.user.username}</h2>
            <p className=" text-base font-semibold">
              {details.data.user.tagline}
            </p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-3 space-y-5 max-w-xl mx-auto">
          {/* NAME */}
          <div className="flex gap-1">
            <span className="font-semibold text-xl">Name: </span>
            <p className="text-lg">{details.data.user.name}</p>
          </div>

          {/* BIO */}
          {details.data.user.bio.text != "" ? (
            <div className="flex gap-1">
              <span className="font-semibold text-xl">Bio:</span>{" "}
              <p className="text-lg">{details.data.user.bio.text}</p>
            </div>
          ) : (
            ""
          )}

          {/* BADGES */}
          {details.data.user.badges.length > 0 ? (
            <div className="flex flex-col mx-auto justify-center gap-1">
              <span className="font-semibold text-xl">Badges:</span>{" "}
              {details.data.user.badges.map((badge) => (
                <p
                  className="text-lg flex gap-1 items-center pl-10"
                  key={badge.id}
                >
                  {badge.name}
                  <Image
                    src={badge.image}
                    alt={badge.name}
                    width={20}
                    height={20}
                  />
                </p>
              ))}
            </div>
          ) : (
            ""
          )}

          {/* FOLLOWERS */}
          {details.data.user.followers.nodes.length === 0 ? (
            ""
          ) : (
            <div>
              <p className="font-semibold text-xl mb-2">Followed by:</p>

              {details.data.user.followers.nodes
                .slice(0, followersToShow)
                .map((person) => (
                  <p
                    key={person.name}
                    className="pl-10 space-y-2 flex md:space-y-0"
                  >
                    <Link
                      href={`/${person.username}`}
                      className="mt-1 leading-7 rounded-full items-center bg-black text-white p-2"
                    >
                      {person.name}
                    </Link>
                  </p>
                ))}
              <button
                onClick={toggleFollowersDisplay}
                className="bg-black text-white rounded-md mt-5 px-5 py-2"
              >
                {showAllFollowers ? "Hide" : "Show all"}
              </button>
            </div>
          )}

          {/* FOLLOWING */}
          {details.data.user.follows.nodes.length != 0 ? (
            <div>
              <h4 className="font-semibold text-xl mb-2">Following:</h4>

              {details.data.user.follows.nodes
                .slice(0, followingsToShow)
                .map((person) => (
                  <p
                    key={person.name}
                    className="pl-10 space-y-2 flex md:space-y-0"
                  >
                    <Link
                      href={`/${person.username}`}
                      className="mt-1 leading-7 rounded-full items-center bg-black text-white p-2"
                    >
                      {person.name}
                    </Link>
                  </p>
                ))}
              <button
                onClick={toggleFollowingsDisplay}
                className="bg-black text-white rounded-md mt-5 px-5 py-2"
              >
                {showAllFollowing ? "Hide" : "Show all"}
              </button>
            </div>
          ) : (
            ""
          )}

          {/* SOCIAL MEDIA LINKS */}
          <div className="flex gap-1 items-center">
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

          {/* VIEW USER'S HASHNODE PROFILE */}
        </div>
        <Button asChild className="mt-3 w-full">
          <Link
            target="_blank"
            href={`https://hashnode.com/@${params.searchedUser}`}
          >
            <span className="mr-2 text-lg">Go to hashnode profile</span>{" "}
            <FaHashnode className="bg-blue-500 rounded-full text-white w-5 h-5" />
          </Link>
        </Button>
      </UserCard>

      {/* POSTS STATS */}
      <div className="space-y-5 mt-10">
        <h2 className="text-center text-6xl font-bold mb-4">
          User Post Statistics
        </h2>
        <div className="bg-black rounded-lg p-4 text-center max-w-72 text-white m-auto">
          Visualize user publications and their posts in the chart below
        </div>
        <div className="h-[500px]">
          <ResponsiveSunburst
            isInteractive
            onClick={(d: any) => {
              console.log(d);
              if (d.data.url) {
                window.open(d.data.url, "_blank");
              }
            }}
            borderWidth={8}
            data={data}
            cornerRadius={5}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            id="name"
            value="loc"
            borderColor={{ theme: "background" }}
            colors={{ scheme: "nivo" }}
            childColor={{
              from: "color",
              modifiers: [["brighter", 0.4]],
            }}
            colorBy="id"
            enableArcLabels={true}
            // arcLabel={}
            tooltip={(d) => {
              console.log("d", d);
              if (d.depth === 1) {
                return (
                  <span className="bg-black text-white p-2 rounded">
                    Publication: {d.id}
                  </span>
                );
              }
              if (d.depth === 2) {
                return (
                  <span className="bg-black text-white p-2 rounded">
                    Post: {d.id}
                  </span>
                );
              } else {
                return (
                  <span className="bg-black text-white p-2 rounded">
                    Tag: {d.id}
                  </span>
                );
              }
            }}
            arcLabelsSkipAngle={12}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
