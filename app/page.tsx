"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserDataLoading } from "@/components/ui/UserDataLoading";
import useLocalStorage from "use-local-storage";
import { Roboto_Condensed, Open_Sans } from "next/font/google";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDetailsContext } from "./context/DetailsContext";
//COMPONENT IMPORTS
import UserCard from "@/components/ui/UserCard/UserCard";
import { TypographyP } from "@/components/TypographyP";
import { TypographyH2 } from "@/components/TypographyH2";
import { TypographyLarge } from "@/components/TypographyLarge";
import { TypographySmall } from "@/components/TypographySmall";
import { Badge } from "@/components/ui/badge";
const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function Home() {
  // STATE VARIABLES AND UPDATER FUNCTIONS
  const [searchingUser, setSearchingUser] = useState<string>("");
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(
    "recentSearches",
    []
  );

  // USING useDetailsContext HOOK
  const { details, searchedUser, setSearchedUser } = useDetailsContext();

  // USING A VARIABLE TO USE TO LIMIT DATA STORED IN LOCALHOST
  const MAX_RECENT_SEARCHES = 10;

  const removeRecentSearch = (searchToRemove: string) => {
    setRecentSearches(
      recentSearches.filter((search) => search !== searchToRemove)
    );
  };

  useEffect(() => {
    // Only update recent searches when details are available for the searchedUser
    if (
      details &&
      details.data &&
      details.data.user &&
      details.data.user.username === searchedUser
    ) {
      setRecentSearches((prevSearchedUser) => {
        const safePrevSearchedUser = prevSearchedUser || [];
        // Add the searched user to the top of the list, avoiding duplicates
        const updatedSearches = [
          searchedUser,
          ...safePrevSearchedUser.filter((user) => user !== searchedUser),
        ];
        // Limit the number of searches to store
        return updatedSearches.slice(0, MAX_RECENT_SEARCHES);
      });
    }
  }, [details, searchedUser, setRecentSearches]);

  return (
    <main className="space-y-5 p-3 md:px-0">
      {/* HEADING */}
      <TypographyH2>HashProfiles</TypographyH2>

      {/* SEARCH BAR */}
      <div className="flex items-center gap-2 justify-center md:justify-start overflow-hidden">
        <Input
          type="text"
          placeholder="Enter a username..."
          className={`w-max ${open_sans.className}`}
          value={searchingUser}
          onChange={(e) => {
            setSearchingUser(e.target.value);
          }}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();

            setSearchedUser(searchingUser);
          }}
        >
          Search
        </Button>
      </div>

      {/* OPTIONS BETWEEN USERS */}
      <TypographyP>OR Select a hashnode user from below</TypographyP>

      <div className="grid grid-cols-[repeat(auto-fit,max(300px))] justify-center md:justify-start gap-[30px] p-0">
        {/* USER 1 */}
        <Link href="/victoria">
          <UserCard className="hover:scale-105">
            <div className="flex items-center gap-2">
              <TypographyLarge>Username:</TypographyLarge>
              <TypographySmall>Victoria</TypographySmall>
            </div>

            <div className="flex items-center gap-2">
              <TypographyLarge>Name:</TypographyLarge>
              <TypographySmall>Victoria Lo</TypographySmall>
            </div>

            <div className="flex items-center gap-2">
              <TypographyLarge>Profile pic:</TypographyLarge>
              <Image
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1672984921463/25B4G5fCJ.jpg?w=500&h=500&fit=crop&crop=faces&auto=compress,format&format=webp"
                alt="profile pic"
                width={45}
                height={45}
                className="rounded-lg"
              />
            </div>
          </UserCard>
        </Link>

        {/* USER 2 */}
        <Link href={`/iamshadmirza`}>
          <UserCard className="hover:scale-105">
            <div className="flex items-center gap-2">
              <TypographyLarge>Username:</TypographyLarge>
              <TypographySmall>iamshadmirza</TypographySmall>
            </div>

            <div className="flex items-center gap-2">
              <TypographyLarge>Name:</TypographyLarge>
              <TypographySmall>Shad Mirza</TypographySmall>
            </div>

            <div className="flex items-center gap-2">
              <TypographyLarge>Profile pic:</TypographyLarge>
              <Image
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1663070035311/JaSbIMfve.jpg?w=500&h=500&fit=crop&crop=faces&auto=compress,format&format=webp"
                alt="profile pic"
                width={45}
                height={45}
                className="rounded-lg"
              />
            </div>
          </UserCard>
        </Link>
      </div>

      {/* RECENT SEARCHES */}
      <div className="space-y-2">
        {/* RECENT SEARCHES SECTION */}
        <TypographyH2>Recent Searches</TypographyH2>

        {/* SEARCHES MADE */}
        <div className="flex space-x-2 flex-wrap space-y-2 md:space-y-0">
          {recentSearches.map((recentSearch, index) => (
            <Badge
              key={index}
            >
              <Link href={`/${recentSearch}`} className=" text-base">{recentSearch}</Link>
              <Button onClick={() => removeRecentSearch(recentSearch)}>
                X
              </Button>
            </Badge>
          ))}
        </div>
      </div>

      {/* RENDERING DETAILS */}
      {!details && searchedUser ? (
        <UserDataLoading />
      ) : searchedUser && details && details.data.user ? (
        <Card className="mx-auto flex flex-col max-w-2xl space-y-3">
          {/* SECTION TITLE */}
          <CardHeader>
            <CardTitle
              className={`font-bold text-2xl tracking-wider ${roboto.className}`}
            >
              User details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* USERNAME */}
            <div className="flex gap-1 items-center">
              <TypographyLarge>Username:</TypographyLarge>{" "}
              <TypographySmall>{details.data.user.username}</TypographySmall>
            </div>

            {/* NAME */}
            <div className="flex gap-1 items-center">
              <TypographyLarge>Name:</TypographyLarge>{" "}
              <TypographySmall>{details.data.user.name}</TypographySmall>
            </div>

            {/* PROFILE PICTURE */}
            <div className="flex gap-1 items-center">
              <TypographyLarge>Profile pic:</TypographyLarge>
              <Image
                src={details.data.user.profilePicture}
                alt="profile picture"
                width={50}
                height={50}
                className="rounded-lg"
              />
            </div>

            {/* USER BIO */}
            {details.data.user.bio.text !== "" ? (
              <div className="flex gap-1 items-center">
                <TypographyLarge>Bio:</TypographyLarge>{" "}
                <TypographySmall>{details.data.user.bio.text}</TypographySmall>
              </div>
            ) : (
              ""
            )}

            {/* LINK TO USER PAGE */}
            <Button className="hover:scale-105 transition" asChild>
              <Link href={`${searchedUser}`}>Know More</Link>
            </Button>
          </CardContent>
        </Card>
      ) : searchedUser && (!details || !details.data.user) ? (
        <TypographyP>User not found</TypographyP>
      ) : null}
    </main>
  );
}
