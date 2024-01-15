"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// graphql query
const query = `
  query User($username: String!, $pageSize: Int!) {
  user(username: $username) {
    id
    username
    name
    bio {
      markdown
      html
      text
    }
    profilePicture
    socialMediaLinks {
      website
      github
      twitter
      instagram
      facebook
      stackoverflow
      linkedin
      youtube
    }
    badges {
      id
      name
      description
      image
      dateAssigned
      infoURL
      suppressed
    }
    followersCount
    followingsCount
    tagline
    dateJoined
    location
    availableFor
    tagsFollowing {
      id
      name
      slug
      logo
      tagline
      followersCount
      postsCount
    }
    publications(first: $pageSize) {
      totalDocuments
      edges {
        node {
          title
          posts(first: $pageSize) {
            edges {
              node {
                title
              }
            }
          }
        }
      }
    }
    deactivated
    following
    followsBack
    isPro
  }
}
`;

interface UserDetails {
  data: {
    user: {
      id: string;
      username: string;
      name: string;
      bio: {
        markdown: string;
        html: string;
        text: string;
      };
      profilePicture: string;
      // ... other fields
    };
  };
}

export default function Home() {
  const [details, setDetails] = useState<UserDetails | null>(null);
  const [searchingUser, setSearchingUser] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchedUser, setSearchedUser] = useState<string>("");

  useEffect(() => {
    const fetchDetails = async () => {
      const vars = {
        username: searchedUser,
        pageSize: 12,
      };

      try {
        // fetched data is not in json format by default
        const response = await fetch("https://gql.hashnode.com/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query, variables: vars }),
        });
        const data = await response.json();
        setDetails(data);
        if (!recentSearches.includes(searchedUser)) {
          setRecentSearches((prevSearches) => [...prevSearches, searchedUser]);
        }
      } catch (e) {
        console.log("Error:", e);
      }
    };
    fetchDetails();
  }, [searchedUser]); // Depend on username state

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen p-24 space-y-2">
      <h1 className="font-semibold text-3xl mb-2">Hashnode users</h1>

      {/* Search bar */}
      <div>
        <input
          type="text"
          placeholder="Enter a username..."
          className="p-2 rounded-lg w-72 mr-3"
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
          }}
        >
          Search
        </button>
      </div>
      {/* Options between users */}
      <p>OR Select a hashnode user from below</p>
      <div className="space-x-3">
        <button
          className="hover:underline"
          onClick={() => setSearchedUser("gmahima")}
        >
          gmahima
        </button>
        <button
          className="hover:underline"
          onClick={() => setSearchedUser("codewithbhargav")}
        >
          codewithbhargav
        </button>
      </div>

      {/* Recent searches */}
      <div className="mt-2 mb-1">
        <h2 className="text-xl font-semibold">Recent Searches</h2>
        {recentSearches.map((recentSearch, index) => (
          <button
            key={index}
            onClick={() => {
              setSearchingUser(recentSearch);
              setSearchedUser(recentSearch);
            }}
            className="flex space-y-3 hover:underline"
          >
            {recentSearch}
          </button>
        ))}
      </div>

      {/* Rendering details */}
      {searchedUser && details && details.data.user ? (
        <div className="flex flex-col space-y-1">
          <h2 className="text-xl font-semibold">User details</h2>
          <div>Username: {details.data.user.username}</div>
          <div>Name: {details.data.user.name}</div>
          <div className="flex items-center gap-3">
            Profile pic:
            <Image
              src={details.data.user.profilePicture}
              alt="profile picture"
              width={38}
              height={38}
              className="rounded-lg"
            />
          </div>
          <div>Bio: {details.data.user.bio.text}</div>
          <Link href={`/${searchedUser}`} className="py-2 px-5 bg-white w-max hover:scale-110 transition">Know more</Link>
        </div>
      ) : searchedUser ? (
        <h1>No user with that name</h1>
      ) : null}
    </main>
  );
}
