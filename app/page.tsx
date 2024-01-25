"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Skeleton from "react-loading-skeleton";
import useLocalStorage from "use-local-storage";
import {
  Merriweather_Sans,
  Roboto_Condensed,
  Open_Sans,
} from "next/font/google";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDetailsContext } from "./context/DetailsContext";
import UserCard from "@/components/ui/UserCard/UserCard";
const merriweather_sans = Merriweather_Sans({ subsets: ["latin"] });
const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchingUser, setSearchingUser] = useState<string>("");

  const { details, searchedUser, setSearchedUser } = useDetailsContext();
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(
    "recentSearches",
    []
  );
  const MAX_RECENT_SEARCHES = 10;

  const removeRecentSearch = (searchToRemove: string) => {
    setRecentSearches(
      recentSearches.filter((search) => search !== searchToRemove)
    );
  };

  return (
    <main className="space-y-2">
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
        HashProfiles
      </h1>

      {/* Search bar */}
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Enter a username..."
          className="w-max ${open_sans.className}"
          value={searchingUser}
          onChange={(e) => {
            setSearchingUser(e.target.value);
          }}
        />
        <Button
          onClick={(e) => {
            e.preventDefault();

            setSearchedUser(searchingUser);

            setRecentSearches((prevSearchedUser) => {
              // If prevSearchedUser is undefined, default to an empty array
              const safePrevSearchedUser = prevSearchedUser || [];

              // Create a new list with the new search at the top, avoiding duplicates
              const updatedSearches = [
                searchingUser,
                ...safePrevSearchedUser.filter(
                  (user) => user !== searchingUser
                ),
              ];

              // Limit the number of searches to store
              return updatedSearches.slice(0, MAX_RECENT_SEARCHES);
            });
          }}
        >
          Search
        </Button>
      </div>
      {/* Options between users */}
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        OR Select a hashnode user from below
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,max(300px))] gap-[30px] p-0">
        {/* USER 1 */}
        <Link href="/victoria">
          <UserCard>
            <div className="flex items-center gap-2">
              <span
                className={`tracking-wide text-xl ${open_sans.className} font-bold`}
              >
                Username:
              </span>{" "}
              <p className={`tracking-wide text-lg ${open_sans.className}`}>
                victoria
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`tracking-wide text-xl ${open_sans.className} font-bold`}
              >
                Name:
              </span>{" "}
              <p className={` text-lg tracking-wide ${open_sans.className}`}>
                Victoria Lo
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`tracking-wide text-xl ${open_sans.className} font-bold`}
              >
                Profile pic:
              </span>
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
          <UserCard>
            <div className="flex items-center gap-2">
              <span
                className={`tracking-wide text-xl ${open_sans.className} font-bold`}
              >
                Username:
              </span>{" "}
              <p className={`tracking-wide text-lg ${open_sans.className}`}>
                iamshadmirza
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`tracking-wide text-xl ${open_sans.className} font-bold`}
              >
                Name:
              </span>{" "}
              <p className={` text-lg tracking-wide ${open_sans.className}`}>
                Shad Mirza
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`tracking-wide text-xl ${open_sans.className} font-bold`}
              >
                Profile pic:
              </span>
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

      {/* Recent searches */}
      <div className="mt-2">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Recent Searches
        </h2>
        <div className="flex space-x-2">
          {recentSearches.map((recentSearch, index) => (
            <div
              key={index}
              className="leading-7 rounded-full bg-black text-white p-1 px-2"
            >
              <Link href={`/${recentSearch}`}>{recentSearch}</Link>
              <Button
                onClick={() => removeRecentSearch(recentSearch)}
                className="text-white bg-black"
              >
                X
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Rendering details */}
      {searchedUser && details && details.data.user ? (
        // USER DETAILS CONTAINER
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
            <div className="flex gap-1">
              <span
                className={` ${open_sans.className} tracking-wide font-semibold text-xl`}
              >
                Username:
              </span>{" "}
              <p className={` ${open_sans.className} tracking-wide text-lg`}>
                {details.data.user.username}
              </p>
            </div>

            {/* NAME */}
            <div className="flex gap-1">
              <span
                className={` ${open_sans.className} tracking-wide font-semibold text-xl`}
              >
                Name:
              </span>{" "}
              <p className={` ${open_sans.className} tracking-wide text-lg`}>
                {details.data.user.name}
              </p>
            </div>

            {/* PROFILE PICTURE */}
            <div className="flex gap-1">
              <span
                className={` ${open_sans.className} tracking-wide font-semibold text-xl`}
              >
                Profile pic:
              </span>
              <Image
                src={details.data.user.profilePicture}
                alt="profile picture"
                width={50}
                height={50}
                className="rounded-lg"
              />
            </div>

            {/* USER BIO */}
            <div className="flex gap-1">
              <span
                className={` ${open_sans.className} tracking-wide font-semibold text-xl`}
              >
                Bio:
              </span>{" "}
              <p className={` ${open_sans.className} tracking-wide text-lg`}>
                {details.data.user.bio.text}
              </p>
            </div>

            {/* LINK TO USER PAGE */}
            <Button asChild>
              <Link href={`${searchedUser}`}>Know More</Link>
            </Button>
          </CardContent>
        </Card>
      ) : searchedUser ? (
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
            <div className="flex gap-1">
              <span
                className={` ${open_sans.className} tracking-wide font-semibold text-xl`}
              >
                Username:
              </span>{" "}
              <p
                className={` ${open_sans.className} tracking-wide text-lg p-8 bg-gray-400`}
              ></p>
            </div>

            {/* NAME */}
            <div className="flex gap-1">
              <span
                className={` ${open_sans.className} tracking-wide font-semibold text-xl`}
              >
                Name:
              </span>{" "}
              <p
                className={` ${open_sans.className} tracking-wide text-lg p-8 bg-gray-400`}
              ></p>
            </div>

            {/* PROFILE PICTURE */}
            <div className="flex gap-1">
              <span
                className={` ${open_sans.className} tracking-wide font-semibold text-xl`}
              >
                Profile pic:
              </span>
              <div className="rounded-lg bg-gray-400 w-[50px] h-[50px]" />
            </div>

            {/* USER BIO */}
            <div className="flex gap-1">
              <span
                className={` ${open_sans.className} tracking-wide font-semibold text-xl`}
              >
                Bio:
              </span>{" "}
              <p
                className={` ${open_sans.className} tracking-wide text-lg p-8 bg-gray-400`}
              ></p>
            </div>

            {/* LINK TO USER PAGE */}
            <Button asChild>
              <Link href={`${searchedUser}`}>Know More</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}
    </main>
  );
}
