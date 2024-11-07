"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UserDataLoading } from "@/components/ui/UserDataLoading"
import useLocalStorage from "use-local-storage"
import { Roboto_Condensed, Open_Sans } from "next/font/google"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDetailsContext } from "./context/DetailsContext"
import UserCard from "@/components/ui/UserCard/UserCard"
import { TypographyP } from "@/components/TypographyP"
import { TypographyH2 } from "@/components/TypographyH2"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"

const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

type FeaturedUser = {
  username: string
  name: string
  profilePicture: string
}

const FEATURED_USERNAMES = ["victoria", "iamshadmirza"]

export default function Home() {
  const [searchingUser, setSearchingUser] = useState<string>("")
  const [recentSearches, setRecentSearches] = useLocalStorage<string[]>("recentSearches", [])
  const { details, searchedUser, setSearchedUser } = useDetailsContext()
  const [featuredUsers, setFeaturedUsers] = useState<FeaturedUser[]>([])
  const MAX_RECENT_SEARCHES = 10

  const removeRecentSearch = (searchToRemove: string) => {
    setRecentSearches(recentSearches.filter((search) => search !== searchToRemove))
  }

  useEffect(() => {
    if (details?.data?.user?.username === searchedUser) {
      setRecentSearches((prevSearchedUser) => {
        const safePrevSearchedUser = prevSearchedUser || []
        const updatedSearches = [searchedUser, ...safePrevSearchedUser.filter((user) => user !== searchedUser)]
        return updatedSearches.slice(0, MAX_RECENT_SEARCHES)
      })
    }
  }, [details, searchedUser, setRecentSearches])

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
          })
          const data = await response.json()
          return data.data.user
        })
      )
      setFeaturedUsers(users)
    }

    fetchFeaturedUsers()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <TypographyH2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            HashProfiles
          </TypographyH2>
          <TypographyP className="text-muted-foreground max-w-2xl mx-auto">
            Discover and explore Hashnode user profiles. Search for your favorite content creators or browse through our featured users.
          </TypographyP>
        </div>

        {/* Search Section */}
        <Card className="max-w-2xl mx-auto border-2 shadow-lg">
          <CardContent className="p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSearchedUser(searchingUser)
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
          <TypographyH2 className="text-2xl font-semibold text-center">Featured Users</TypographyH2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {featuredUsers.map((user) => (
              <Link key={user.username} href={`/${user.username}`} className="transition-transform duration-200 hover:scale-105">
                <UserCard className="h-full bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-2">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Image
                        src={user.profilePicture}
                        alt={`${user.name}'s profile`}
                        width={60}
                        height={60}
                        className="rounded-full ring-2 ring-primary"
                      />
                      <div>
                        <CardTitle className="text-xl">{user.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>
                  </CardHeader>
                </UserCard>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <section className="space-y-6">
            <TypographyH2 className="text-2xl font-semibold text-center">Recent Searches</TypographyH2>
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
          </section>
        )}

        {/* Search Results */}
        {!details && searchedUser ? (
          <UserDataLoading />
        ) : searchedUser && details?.data?.user ? (
          <Card className="max-w-2xl mx-auto border-2 shadow-lg overflow-hidden">
            <CardHeader className="border-b bg-muted/50">
              <CardTitle className={`font-bold text-2xl tracking-wider ${roboto.className}`}>User Profile</CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <div className="flex flex-col items-center gap-6">
                <Image
                  src={details.data.user.profilePicture}
                  alt="Profile picture"
                  width={120}
                  height={120}
                  className="rounded-full ring-4 ring-primary/20"
                />
                <div className="text-center">
                  <h3 className="text-2xl font-semibold">{details.data.user.name}</h3>
                  <p className="text-muted-foreground">@{details.data.user.username}</p>
                </div>
              </div>

              {details.data.user.bio.text && (
                <div className="text-center">
                  <p className="text-muted-foreground">{details.data.user.bio.text}</p>
                </div>
              )}

              <Link href={`/${searchedUser}`} className="block">
                <Button className="w-full" size="lg">
                  View Full Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : searchedUser && (!details || !details.data.user) ? (
          <Card className="max-w-2xl mx-auto p-6 text-center">
            <TypographyP>No user found with username &quot;{searchedUser}&quot;</TypographyP>
          </Card>
        ) : null}
      </div>
    </main>
  )
}