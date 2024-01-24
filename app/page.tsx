"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  console.log(details);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen space-y-2">
      <h1 className={` mb-2 ${merriweather_sans.className} text-3xl`}>
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

            setRecentSearches((prevSearchedUser) => [
              searchingUser,
              ...prevSearchedUser,
            ]);
          }}
        >
          Search
        </Button>
      </div>
      {/* Options between users */}
      <p className="pt-5 ${open_sans.className}">
        OR Select a hashnode user from below
      </p>

      <div className="flex space-x-2 pt-5">
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
        <Link href="/codewithbhargav">
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
        <h2 className={`pt-5 text-2xl tracking-wider ${roboto.className}`}>
          Recent Searches
        </h2>
        {recentSearches.map((recentSearch, index) => (
          <p key={index} className="flex space-y-3 text-lg pt-2">
            {recentSearch}
          </p>
        ))}
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
        <h1>No user with that name</h1>
      ) : null}
    </main>
  );
}
