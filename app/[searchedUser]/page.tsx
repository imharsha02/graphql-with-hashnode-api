"use client";
import { useContext, useEffect, useState } from "react";
import { detailsContext } from "../context/DetailsContext";
import { FaHashnode } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ResponsiveSunburst } from "@nivo/sunburst";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import UserCard from "@/components/ui/UserCard/UserCard";
import { TypographyH2 } from "@/components/TypographyH2";
import { TypographyLarge } from "@/components/TypographyLarge";
import { TypographyP } from "@/components/TypographyP";
import { TypographyH1 } from "@/components/TypographyH1";
import { Card, CardContent } from "@/components/ui/card";
const UserPage = ({ params }: { params: { searchedUser: string } }) => {
  const { details, setSearchedUser } = useContext(detailsContext);
  const [showAllFollowing, setShowAllFollowing] = useState(false);
  const [showAllFollowers, setShowAllFollowers] = useState(false);
  const [showAllBadges, setShowAllBadges] = useState(false);
  const initialFollowingsToShow = 4; // SETTING NUMBER OF FOLLOWERS/FOLLOWINGS TO SHOW
  const initialBadgesToShow = 4; // SETTING NUMBER OF BADGES TO SHOW
  const [followersToShow, setFollowersToShow] = useState(
    initialFollowingsToShow //FOLLOWERS STATE
  );
  const [followingsToShow, setFollowingsToShow] = useState(
    initialFollowingsToShow // FOLLOWINGS STATE
  );
  const [badgesToShow, setBadgesToShow] = useState(initialBadgesToShow);

  const toggleFollowersDisplay = () => {
    // FUNCTION RUNS WHEN BUTTON IS CLICKED
    setShowAllFollowers(!showAllFollowers); // FOR CHANGING THE TEXT IN THE BUTTON

    const totalFollowers = details?.data?.user?.followers?.nodes?.length ?? 0; // STORING THE LENGTH OF ALL THE FOLLOWERS. IF LENGTH VALUE IS NULL/UNDEFINED (CHECKED BY '??'), 0 IS STORED
    setFollowersToShow(
      showAllFollowers ? initialFollowingsToShow : totalFollowers
    ); // IF SHOWALLFOLLWERS IS TRUE, SHOW ALL THE FOLLOWERS, ELSE SHOW ONLY THE INITIAL NUMBER OF FOLLOWERS
  };

  const toggleBadgesDisplay = () => {
    // FUNCTION RUNS WHEN BUTTON IS CLICKED
    setShowAllBadges(!showAllBadges); // FOR CHANGING THE TEXT IN THE BUTTON

    const totalBadges = details?.data?.user?.badges?.length ?? 0; // STORING THE LENGTH OF ALL THE BADGES. IF LENGTH VALUE IS NULL/UNDEFINED (CHECKED BY '??'), 0 IS STORED
    setBadgesToShow(showAllBadges ? initialBadgesToShow : totalBadges); // IF SHOWALLBADGES IS TRUE, SHOW ALL THE BADGES, ELSE SHOW ONLY THE INITIAL NUMBER OF BADGES
  };

  const toggleFollowingsDisplay = () => {
    setShowAllFollowing(!showAllFollowing);

    const totalFollowings = details?.data?.user?.follows?.nodes?.length ?? 0;
    setFollowingsToShow(
      showAllFollowing ? initialFollowingsToShow : totalFollowings
    );
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
    children: details?.data?.user?.publications?.edges?.map((pub) => {
      const baseValue = 1; // Base value for each publication's existence
      const postCount = pub.node.posts.edges.length;
      const totalValueForPublication = baseValue + postCount;

      return {
        name: pub.node.title,
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
      {/* BACK BUTTON */}
      <div className="flex space-x-2">
        <Button className="hover:scale-105 transition" title="Go back" asChild>
          <Link href="/">
            <FaArrowLeft className="text-white" />
          </Link>
        </Button>
        <TypographyH2>User Profile</TypographyH2>
      </div>
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
            <TypographyH2>{details.data.user.username}</TypographyH2>
            <TypographyLarge>{details.data.user.tagline}</TypographyLarge>
          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-3 space-y-5 max-w-xl mx-auto">
          {/* NAME */}
          <div className="flex gap-1 items-center">
            <TypographyLarge>Name: </TypographyLarge>
            <TypographyP>{details.data.user.name}</TypographyP>
          </div>

          {/* BIO */}
          {details.data.user.bio.text != "" ? (
            <div className="flex gap-1 items-center">
              <TypographyLarge>Bio:</TypographyLarge>{" "}
              <TypographyP>{details.data.user.bio.text}</TypographyP>
            </div>
          ) : (
            ""
          )}

          {/* BADGES */}
          {details.data.user.badges.length > 0 ? (
            <div>
              <TypographyLarge>Badges:</TypographyLarge>{" "}
              <div className="pl-10 flex flex-wrap gap-3 mb-2">
                {details.data.user.badges
                  .slice(0, badgesToShow)
                  .map((badge) => (
                    <Badge className="gap-1" key={badge.id}>
                      {badge.name}
                      <Image
                        src={badge.image}
                        alt={badge.name}
                        width={20}
                        height={20}
                      />
                    </Badge>
                  ))}
              </div>
              {details.data.user.badges.length > 3 ? (
                <Button
                  onClick={toggleBadgesDisplay}
                  disabled={details.data.user.badges.length <= 3}
                  className="ml-12"
                >
                  {showAllBadges ? "Hide" : "Show all"}
                </Button>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}

          {/* FOLLOWERS */}
          {details.data.user.followers.nodes.length === 0 ? (
            ""
          ) : (
            <div>
              {/* SECTION TITLE */}
              <TypographyLarge>Followed by:</TypographyLarge>
              <div className="flex flex-wrap md:space-x-2 pl-10 space-x-3 gap-y-3 items-center mb-2">
                {details.data.user.followers.nodes
                  .slice(0, followersToShow)
                  .map((person) => (
                    <Badge className="py-2 px-5" key={person.name}>
                      <Link href={`/${person.username}`}>{person.name}</Link>
                    </Badge>
                  ))}
              </div>
              {details.data.user.followers.nodes.length > 3 ? (
                <Button
                  onClick={toggleFollowersDisplay}
                  className="ml-12"
                  disabled={details.data.user.followers.nodes.length <= 3}
                >
                  {showAllFollowers ? "Hide" : "Show all"}
                </Button>
              ) : (
                ""
              )}
            </div>
          )}

          {/* FOLLOWING */}
          {details.data.user.follows.nodes.length != 0 ? (
            <div>
              <h4 className="font-semibold text-xl mb-2">Following:</h4>
              <div
                className={`flex flex-wrap mb-2 md:space-x-2 pl-10 space-x-3 gap-y-3 items-center`}
              >
                {details.data.user.follows.nodes
                  .slice(0, followingsToShow)
                  .map((person) => (
                    <Badge key={person.name} className="py-2 px-5">
                      <Link href={`/${person.username}`}>{person.name}</Link>
                    </Badge>
                  ))}
              </div>
              {details.data.user.followers.nodes.length > 3 ? (
                <Button
                  onClick={toggleFollowingsDisplay}
                  disabled={details.data.user.followers.nodes.length <= 3}
                  className="ml-12"
                >
                  {showAllFollowing ? "Hide" : "Show all"}
                </Button>
              ) : (
                ""
              )}
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
            <TypographyLarge className="mr-2">
              Go to hashnode profile
            </TypographyLarge>{" "}
            <FaHashnode className="bg-blue-500 rounded-full text-white w-5 h-5" />
          </Link>
        </Button>
      </UserCard>

      {/* POSTS STATS */}
      {details.data.user.publications.edges.length !== 0 ? (
        <div className="space-y-5 mt-10">
          <TypographyH1>User Post Statistics</TypographyH1>
          <Card className="w-max mx-auto bg-primary">
            <CardContent className="p-6">
              <TypographyLarge className="text-center text-primary-foreground">
                Visualize user publications and their posts in the chart below
              </TypographyLarge>
            </CardContent>
          </Card>
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
      ) : (
        ""
      )}
    </div>
  );
};

export default UserPage;
