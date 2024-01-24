"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  const [searchingUser, setSearchingUser] = useState<string>("");

  const { details, searchedUser, setSearchedUser } = useDetailsContext();
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>("recentSearches", []);
  const MAX_RECENT_SEARCHES = 10; // Maximum number of recent searches to store
  // fetch bhargav , victoria

  return (
    <main className="min-h-screen space-y-2">
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

            setRecentSearches(prevSearchedUser => {
              // If prevSearchedUser is undefined, default to an empty array
              const safePrevSearchedUser = prevSearchedUser || [];
        
              // Create a new list with the new search at the top, avoiding duplicates
              const updatedSearches = [searchingUser, ...safePrevSearchedUser.filter(user => user !== searchingUser)];
              
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

      <div className="flex space-x-2">
        {/* USER 1 */}
        <Link href="/victoria">
          <Card>
            <CardContent className="pt-6 space-y-5">
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
            </CardContent>
          </Card>
        </Link>

        {/* USER 2 */}
        <Link href={`/codewithbhargav`}>
          <Card>
            <CardContent className="pt-6 space-y-5">
              <div className="flex items-center gap-2">
                <span
                  className={`tracking-wide text-xl ${open_sans.className} font-bold`}
                >
                  Username:
                </span>{" "}
                <p className={`tracking-wide ${open_sans.className} text-lg`}>
                  codewithbhargav
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`tracking-wide text-xl ${open_sans.className} font-bold`}
                >
                  Name:
                </span>{" "}
                <p className={`tracking-wide text-lg ${open_sans.className}`}>
                  Bhargav Ponnapalli
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`tracking-wide text-xl ${open_sans.className} font-bold`}
                >
                  Profile pic:
                </span>
                <Image
                  src="https://cdn.hashnode.com/res/hashnode/image/upload/v1647778136262/PTwDclbQa.png?w=240&h=240&fit=crop&crop=faces&auto=compress,format&format=webp"
                  alt="profile pic"
                  width={45}
                  height={45}
                  className="rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent searches */}
      <div className="mt-2">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Recent Searches
        </h2>
        <div className="flex space-x-2  ">
        {recentSearches.map((recentSearch, index) => (
          <Link key={index} href={`/${recentSearch}`} className="leading-7 rounded-full bg-black text-white py-1 px-2 ">
            {recentSearch}
          </Link>
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
            {/* USERNAME */}
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
