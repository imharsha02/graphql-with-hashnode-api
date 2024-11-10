/// <reference types="react" />
"use client";
import AnimatedBackground from "@/components/AnimatedBackground";

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
import UserCard from "@/components/ui/UserCard/UserCard";
import { TypographyP } from "@/components/TypographyP";
import { TypographyH2 } from "@/components/TypographyH2";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
const Design1 = () => (
  <div className="relative overflow-hidden bg-gradient-to-b from-blue-950 to-background pt-16 pb-24">
    {/* Abstract Wave Background */}
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1440 400"
      preserveAspectRatio="none"
    >
      <path
        fill="rgba(59, 130, 246, 0.1)"
        d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,128C672,128,768,160,864,181.3C960,203,1056,213,1152,192C1248,171,1344,117,1392,90.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      />
    </svg>

    <div className="relative container mx-auto px-4 text-center">
      <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent animate-gradient">
        HashProfiles
      </h1>
      <p className="text-xl text-blue-100 max-w-2xl mx-auto">
        Discover and explore Hashnode user profiles. Search for your favorite
        content creators.
      </p>
    </div>
  </div>
);
const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

type FeaturedUser = {
  username: string;
  name: string;
  profilePicture: string;
};

const FEATURED_USERNAMES = ["victoria", "iamshadmirza"];

export default function Home() {
  const [searchingUser, setSearchingUser] = useState<string>("");
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>(
    "recentSearches",
    []
  );
  const { details, searchedUser, setSearchedUser } = useDetailsContext();
  const [featuredUsers, setFeaturedUsers] = useState<FeaturedUser[]>([]);
  const MAX_RECENT_SEARCHES = 10;

  const removeRecentSearch = (searchToRemove: string) => {
    setRecentSearches(
      recentSearches.filter((search) => search !== searchToRemove)
    );
  };

  useEffect(() => {
    if (details?.data?.user?.username === searchedUser) {
      setRecentSearches((prevSearchedUser) => {
        const safePrevSearchedUser = prevSearchedUser || [];
        const updatedSearches = [
          searchedUser,
          ...safePrevSearchedUser.filter((user) => user !== searchedUser),
        ];
        return updatedSearches.slice(0, MAX_RECENT_SEARCHES);
      });
    }
  }, [details, searchedUser, setRecentSearches]);

  useEffect(() => {
    const fetchFeaturedUsers = async () => {
      const users = await Promise.all(
        FEATURED_USERNAMES.map(async (username) => {
          const response = await fetch("https://gql.hashnode.com/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: `
                query User($username: String!) {
                  user(username: $username) {
                    username
                    name
                    profilePicture
                  }
                }
              `,
              variables: { username },
            }),
          });
          const data = await response.json();
          return data.data.user;
        })
      );
      setFeaturedUsers(users);
    };

    fetchFeaturedUsers();
  }, []);

  return (
    <main className="min-h-screen  from-background to-muted/50">
      <AnimatedBackground />

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <TypographyH2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent glow">
            HashProfiles
          </TypographyH2>
          <TypographyP className="text-muted-foreground max-w-2xl mx-auto">
            Discover and explore Hashnode user profiles. Search for your
            favorite content creators or browse through our featured users.
          </TypographyP>
        </motion.div>

        {/* Search Section */}
        <Card className="max-w-2xl mx-auto border-2   duration-300">
          <CardContent className="p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearchedUser(searchingUser);
              }}
              className="flex gap-2"
            >
              <Input
                type="text"
                placeholder="Enter a username..."
                className={`${open_sans.className} text-lg`}
                value={searchingUser}
                onChange={(e) => setSearchingUser(e.target.value)}
              />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Featured Users */}
        <section className="space-y-6">
          <TypographyH2 className="text-2xl font-semibold text-center">
            Featured Users
          </TypographyH2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {featuredUsers.map((user) => (
              <motion.div key={user.username} whileHover={{ scale: 1.05 }}>
                <Link
                  href={`/${user.username}`}
                  className="transition-transform duration-200"
                >
                  <UserCard className="h-full backdrop-blur-sm border-2">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <Image
                          src={user.profilePicture}
                          alt={`${user.name}'s profile`}
                          width={60}
                          height={60}
                          className="rounded-full ring-2 ring-primary glow"
                        />
                        <div>
                          <CardTitle className="text-xl">{user.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            @{user.username}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                  </UserCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>


        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <motion.section
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <TypographyH2 className="text-2xl font-semibold text-center">
              Recent Searches
            </TypographyH2>
            <div className="flex flex-wrap gap-2 justify-center">
              {recentSearches.map((recentSearch, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3 py-1.5 text-sm font-medium flex items-center gap-2 hover:bg-secondary/80"
                >
                  <Link href={`/${recentSearch}`}>{recentSearch}</Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 rounded-full"
                    onClick={() => removeRecentSearch(recentSearch)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </motion.section>
        )}

        {/* Search Results */}
{!searchedUser ? (
  <TypographyP className="text-center text-lg text-muted-foreground">
    Search for a Hashnode user or click on one of the featured users
  </TypographyP>
) : !details ? (
  <UserDataLoading />
) : details?.data?.user ? (
  <Link
    href={`/${details.data.user.username}`}
    className="block max-w-2xl mx-auto"
    target="_blank"
  >
    <UserCard enableAtropos={true} user={details.data.user} />
  </Link>
) : (
  <TypographyP className="text-center text-lg text-muted-foreground">
    No user found
  </TypographyP>
)}

      </div>
    </main>
  );
}
