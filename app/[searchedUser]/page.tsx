"use client";
import { useEffect, useState } from "react";
import { useDetailsContext } from "../context/DetailsContext";
import { FaHashnode } from "react-icons/fa6";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ResponsiveSunburst } from "@nivo/sunburst";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/TypographyH2";
import { TypographyLarge } from "@/components/TypographyLarge";
import { TypographyP } from "@/components/TypographyP";
import { TypographyH1 } from "@/components/TypographyH1";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
      <div className="absolute inset-2 rounded-full border-r-2 border-primary/50 animate-spin-slow" />
      <div className="absolute inset-4 rounded-full border-b-2 border-primary/30 animate-ping" />
    </div>
    <p className="text-muted-foreground animate-pulse">Loading profile...</p>
  </div>
);

const UserPage = ({ params }: { params: { searchedUser: string } }) => {
  const { details, setSearchedUser } = useDetailsContext();
  const [showAllFollowing, setShowAllFollowing] = useState(false);
  const [showAllFollowers, setShowAllFollowers] = useState(false);
  const [showAllBadges, setShowAllBadges] = useState(false);
  const initialFollowingsToShow = 4;
  const initialBadgesToShow = 4;
  const [followersToShow, setFollowersToShow] = useState(
    initialFollowingsToShow
  );
  const [followingsToShow, setFollowingsToShow] = useState(
    initialFollowingsToShow
  );
  const [badgesToShow, setBadgesToShow] = useState(initialBadgesToShow);

  const toggleFollowersDisplay = () => {
    setShowAllFollowers(!showAllFollowers);
    const totalFollowers = details?.data?.user?.followers?.nodes?.length ?? 0;
    setFollowersToShow(
      showAllFollowers ? initialFollowingsToShow : totalFollowers
    );
  };

  const toggleBadgesDisplay = () => {
    setShowAllBadges(!showAllBadges);
    const totalBadges = details?.data?.user?.badges?.length ?? 0;
    setBadgesToShow(showAllBadges ? initialBadgesToShow : totalBadges);
  };

  const toggleFollowingsDisplay = () => {
    setShowAllFollowing(!showAllFollowing);
    const totalFollowings = details?.data?.user?.follows?.nodes?.length ?? 0;
    setFollowingsToShow(
      showAllFollowing ? initialFollowingsToShow : totalFollowings
    );
  };

  useEffect(() => {
    setSearchedUser(params.searchedUser);
  }, [params.searchedUser, setSearchedUser]);

  if (!details || details.data.user.username !== params.searchedUser) {
    return <LoadingSpinner />;
  }

  const data = {
    name: "publications",
    loc: 1,
    children: details?.data?.user?.publications?.edges?.map((pub) => {
      const baseValue = 1;
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 pb-20">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-primary/10 transition-colors"
            title="Go back"
            asChild
          >
            <Link href="/">
              <FaArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <TypographyH2>User Profile</TypographyH2>
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden border-2">
          <CardHeader className="border-b bg-muted/50">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <Image
                src={details.data.user.profilePicture}
                alt={details.data.user.name}
                width={120}
                height={120}
                className="rounded-full ring-4 ring-primary/20"
              />
              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold">
                  {details.data.user.username}
                </CardTitle>
                <CardDescription className="text-lg">
                  {details.data.user.tagline}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-8">
            {/* User Details */}
            <div className="grid gap-4">
              <div className="flex flex-col gap-1">
                <TypographyLarge>Name</TypographyLarge>
                <TypographyP>{details.data.user.name}</TypographyP>
              </div>

              {details.data.user.bio.text && (
                <div className="flex flex-col gap-1">
                  <TypographyLarge>Bio</TypographyLarge>
                  <TypographyP>{details.data.user.bio.text}</TypographyP>
                </div>
              )}
            </div>

            {/* Badges */}
            {details.data.user.badges.length > 0 && (
              <div className="space-y-4">
                <TypographyLarge>Badges</TypographyLarge>
                <div className="flex flex-wrap gap-2">
                  {details.data.user.badges
                    .slice(0, badgesToShow)
                    .map((badge) => (
                      <Badge
                        key={badge.id}
                        className="px-3 py-1.5 flex items-center gap-2 bg-primary/10 hover:bg-primary/20"
                        variant="secondary"
                      >
                        <Image
                          src={badge.image}
                          alt={badge.name}
                          width={20}
                          height={20}
                        />
                        {badge.name}
                      </Badge>
                    ))}
                </div>
                {details.data.user.badges.length > 3 && (
                  <Button
                    variant="ghost"
                    onClick={toggleBadgesDisplay}
                    disabled={details.data.user.badges.length <= 3}
                    className="text-sm"
                  >
                    {showAllBadges
                      ? "Show less"
                      : `Show all (${details.data.user.badges.length})`}
                  </Button>
                )}
              </div>
            )}

            {/* Network */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Followers */}
              {details.data.user.followers.nodes.length > 0 && (
                <div className="space-y-4">
                  <TypographyLarge>Followers</TypographyLarge>
                  <div className="flex flex-wrap gap-2">
                    {details.data.user.followers.nodes
                      .slice(0, followersToShow)
                      .map((person) => (
                        <Badge
                          key={person.name}
                          variant="secondary"
                          className="hover:bg-secondary/80 transition-colors"
                        >
                          <Link href={`/${person.username}`}>
                            {person.name}
                          </Link>
                        </Badge>
                      ))}
                  </div>
                  {details.data.user.followers.nodes.length > 3 && (
                    <Button
                      variant="ghost"
                      onClick={toggleFollowersDisplay}
                      className="text-sm"
                    >
                      {showAllFollowers
                        ? "Show less"
                        : `Show all (${details.data.user.followers.nodes.length})`}
                    </Button>
                  )}
                </div>
              )}

              {/* Following */}
              {details.data.user.follows.nodes.length > 0 && (
                <div className="space-y-4">
                  <TypographyLarge>Following</TypographyLarge>
                  <div className="flex flex-wrap gap-2">
                    {details.data.user.follows.nodes
                      .slice(0, followingsToShow)
                      .map((person) => (
                        <Badge
                          key={person.name}
                          variant="secondary"
                          className="hover:bg-secondary/80 transition-colors"
                        >
                          <Link href={`/${person.username}`}>
                            {person.name}
                          </Link>
                        </Badge>
                      ))}
                  </div>
                  {details.data.user.follows.nodes.length > 3 && (
                    <Button
                      variant="ghost"
                      onClick={toggleFollowingsDisplay}
                      className="text-sm"
                    >
                      {showAllFollowing
                        ? "Show less"
                        : `Show all (${details.data.user.follows.nodes.length})`}
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <TypographyLarge>Connect</TypographyLarge>
              <div className="flex gap-4">
                {details.data.user.socialMediaLinks.twitter && (
                  <Link
                    href={details.data.user.socialMediaLinks.twitter}
                    target="_blank"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </Link>
                )}
                {details.data.user.socialMediaLinks.github && (
                  <Link
                    href={details.data.user.socialMediaLinks.github}
                    target="_blank"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <FaGithub className="w-5 h-5" />
                  </Link>
                )}
                {details.data.user.socialMediaLinks.linkedin && (
                  <Link
                    href={details.data.user.socialMediaLinks.linkedin}
                    target="_blank"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>

            <Separator />

            {/* Hashnode Profile Link */}
            <Button asChild className="w-full" size="lg">
              <Link
                href={`https://hashnode.com/@${params.searchedUser}`}
                target="_blank"
              >
                <span className="flex items-center gap-2">
                  View Hashnode Profile
                  <FaHashnode className="w-5 h-5" />
                </span>
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Posts Statistics */}
        {details.data.user.publications?.edges?.some(
          (edge) => edge.node.posts.edges.length > 0
        ) && (
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <TypographyH1>Publication Statistics</TypographyH1>
              <Card className="inline-block">
                <CardContent className="p-4">
                  <TypographyP>
                    Click on any section to view the post
                  </TypographyP>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2">
              <CardContent className="p-0">
                <div className="h-[600px]">
                  <ResponsiveSunburst
                    data={data}
                    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                    id="name"
                    value="loc"
                    cornerRadius={4}
                    borderWidth={4}
                    borderColor="white"
                    colors={{ scheme: "paired" }}
                    childColor={{
                      from: "color",
                      modifiers: [["brighter", 0.4]],
                    }}
                    enableArcLabels={true}
                    arcLabelsSkipAngle={12}
                    arcLabelsTextColor={{
                      from: "color",
                      modifiers: [["darker", 2]],
                    }}
                    isInteractive
                    motionConfig="gentle"
                    onClick={(d: any) => {
                      if (d.data.url) {
                        window.open(d.data.url, "_blank");
                      }
                    }}
                    tooltip={({ id, depth }: any) => (
                      <div className="bg-background border rounded-lg shadow-lg p-3">
                        <span className="font-medium">
                          {depth === 1
                            ? "Publication: "
                            : depth === 2
                            ? "Post: "
                            : "Tag: "}
                        </span>
                        {id}
                      </div>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
};

export default UserPage;
