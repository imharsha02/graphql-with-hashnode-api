"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDetailsContext } from "./context/DetailsContext";
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
      <h1 className="font-bold text-3xl mb-2">HashProfiles</h1>

      {/* Search bar */}
      <div>
        <input
          type="text"
          placeholder="Enter a username..."
          className="p-2 rounded-lg w-72 mr-3 focus:outline-none"
          value={searchingUser}
          onChange={(e) => {
            setSearchingUser(e.target.value);
          }}
        />
        <button
          className="px-5 py-2 bg-white rounded-xl"
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
        </button>
      </div>
      {/* Options between users */}
      <p>OR Select a hashnode user from below</p>
      <div className="flex space-x-2">
        <Link href="/victoria">
          <div className="border border-black w-max rounded-md p-2">
            victoria
            <p>Username: victoria</p>
            <p>Name: Victoria Lo</p>
            <div className="flex items-center gap-2">
              <p>Profile pic:</p>
              <Image
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1672984921463/25B4G5fCJ.jpg?w=500&h=500&fit=crop&crop=faces&auto=compress,format&format=webp"
                alt="profile pic"
                width={32}
                height={32}
                className="rounded-lg"
              />
            </div>
          </div>
        </Link>
        <Link href="/codewithbhargav">
          <div className="border border-black w-max rounded-md p-2">
            codewithbhargav
            <p>Username: codewithbhargav</p>
            <p>Name: Bhargav Ponnapalli</p>
            <div className="flex items-center gap-2">
              <p>Profile pic:</p>
              <Image
                src="https://cdn.hashnode.com/res/hashnode/image/upload/v1647778136262/PTwDclbQa.png?w=240&h=240&fit=crop&crop=faces&auto=compress,format&format=webp"
                alt="profile pic"
                width={32}
                height={32}
                className="rounded-lg"
              />
            </div>
          </div>
        </Link>
      </div>

      {/* Recent searches */}
      <div className="mt-2">
        <h2 className="font-bold text-2xl">Recent Searches</h2>
        {recentSearches.map((recentSearch, index) => (
          <button
            key={index}
            onClick={() => {
              setSearchingUser(recentSearch);
              setSearchedUser(recentSearch);
            }}
            className="flex space-y-3 text-lg hover:underline"
          >
            {recentSearch}
          </button>
        ))}
      </div>

      {/* Rendering details */}
      {searchedUser && details && details.data.user ? (
        // USER DETAILS CONTAINER
        <div className="mx-auto flex flex-col max-w-2xl space-y-3">
          {/* SECTION TITLE */}
          <h2 className="font-bold text-2xl">User details</h2>

          {/* USERNAME */}
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xl">Username:</span>{" "}
            <p className="text-lg">{details.data.user.username}</p>
          </div>

          {/* NAME */}
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xl">Name:</span>{" "}
            <p className="text-lg">{details.data.user.name}</p>
          </div>

          {/* PROFILE PICTURE */}
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xl">Profile pic:</span>
            <Image
              src={details.data.user.profilePicture}
              alt="profile picture"
              width={50}
              height={50}
              className="rounded-lg"
            />
          </div>

          {/* USER BIO */}
          <div className="flex items-center gap-1">
            <span className="font-semibold text-xl">Bio:</span>{" "}
            <p className="text-lg">{details.data.user.bio.text}</p>
          </div>

          {/* LINK TO USER PAGE */}
          <Link
            href={`/${searchedUser}`}
            className="py-2 px-5 bg-white w-max hover:scale-110 transition"
          >
            Know more
          </Link>
        </div>
      ) : searchedUser ? (
        <h1>No user with that name</h1>
      ) : null}
    </main>
  );
}
