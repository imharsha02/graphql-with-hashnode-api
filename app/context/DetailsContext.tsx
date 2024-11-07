// "use client";
// import { createContext, useState, useEffect, useContext } from "react";

// interface UserDetails {
//   // Defining the  type of data (typescript)
//   data: {
//     user: {
//       id: string;
//       username: string;
//       name: string;
//       follows: {
//         nodes: {
//           name: string;
//           username: string;
//         }[];
//       };
//       followers: {
//         nodes: {
//           name: string;
//           username: string;
//         }[];
//       };
//       bio: {
//         markdown: string;
//         html: string;
//         text: string;
//       };
//       profilePicture: string;
//       socialMediaLinks: {
//         website: string;
//         github: string;
//         twitter: string;
//         instagram: string;
//         facebook: string;
//         stackoverflow: string;
//         linkedin: string;
//         youtube: string;
//       };
//       badges: {
//         id: string;
//         name: string;
//         description: string;
//         image: string;
//       }[];
//       tagline: string;
//       dateJoined: string;
//       location: string;
//       availableFor: string;
//       tagsFollowing: {
//         id: string;
//         name: string;
//         slug: string;
//         logo: string;
//         tagline: string;
//         followersCount: number;
//         postsCount: number;
//       }[];
//       publications: {
//         totalDocuments: number;
//         edges: {
//           node: {
//             title: string;
//             posts: {
//               edges: {
//                 node: {
//                   tags: [{ name: string }];
//                   title: string;
//                   url: string;
//                 };
//               }[];
//             };
//           };
//         }[];
//       };
//       deactivated: boolean;
//       followsBack: boolean;
//       isPro: boolean;
//     };
//   };
// }
// export const detailsContext = createContext<{ //Creating the context
//   details: UserDetails | null;
//   setSearchedUser: (user: string) => void;
//   searchedUser: string;
// }>({ details: null, setSearchedUser: () => {}, searchedUser: "" });

// //Writing the query
// const query = ` 
// query User($username: String!, $pageSize: Int!, $page:Int!) {
//   user(username: $username) {
//     id
//     username
//     name
//     location
//     follows(pageSize:$pageSize, page:$page){
//       nodes{
//         name
//         username
//       }
//     }
//     followers(pageSize:$pageSize, page:$page){
//       nodes{
//         name
//         username
//       }
//     }
//     bio {
//       markdown
//       html
//       text,
      
//     }
//     posts(pageSize: $pageSize, page: $pageSize) {
//       totalDocuments
//     }
//     profilePicture
//     socialMediaLinks {
//       website
//       github
//       twitter
//       instagram
//       facebook
//       stackoverflow
//       linkedin
//       youtube
//     }
//     badges {
//       id
//       name
//       description
//       image
//       dateAssigned
//       infoURL
//       suppressed
//     }
//     followersCount
//     followingsCount
//     tagline
//     dateJoined
//     location
//     availableFor
//     tagsFollowing {
//       id
//       name
//       slug
//       logo
//       tagline
//       followersCount
//       postsCount
      
//     }
//     publications(first: $pageSize) {
      
//       totalDocuments
//       edges {
//         node {
//           title
//           posts(first: $pageSize) {
//             totalDocuments
//             edges {
//               node {
//                 title,
//                 url
//                 tags {
//                   name
                  
//                 },
//                 publishedAt
//               }
//             }
//           }
//         }
//       }
//     }
//     deactivated
    
//     followsBack
//     isPro
//   }
// }
// `;

// // A component that wraps everything with the context provider
// const DetailsProvider = ({ children }: { children: React.ReactNode }) => {
//   const [searchedUser, setSearchedUser] = useState<string>("");
//   const [details, setDetails] = useState<UserDetails | null>(null);
//   useEffect(() => {
//     const fetchDetails = async () => {
//       const vars = { // Variables for the fetch's post request
//         username: searchedUser,
//         pageSize: 12,
//         page: 1,
//       };
//       try {
//         const response = await fetch("https://gql.hashnode.com/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ query, variables: vars }),
//         });
//         const data = await response.json();
//         setDetails(data);
//       } catch (error) {
//         console.log("Error: ", error);
//       }
//     }; // Making the fetch post request to get the required data.
//     if (searchedUser && searchedUser != "") {
//       fetchDetails();
//     }
//   }, [searchedUser]);
//   return (
//     <detailsContext.Provider value={{ details, setSearchedUser, searchedUser }}>
//       {children}
//     </detailsContext.Provider>
//   );
// };

// export const useDetailsContext = () => useContext(detailsContext); // A hook that uses the context
// export default DetailsProvider;


"use client"

import { createContext, useState, useEffect, useContext } from "react"

// Types
type UserDetails = {
  data: {
    user: {
      id: string
      username: string
      name: string
      follows: { nodes: Array<{ name: string; username: string }> }
      followers: { nodes: Array<{ name: string; username: string }> }
      bio: { markdown: string; html: string; text: string }
      profilePicture: string
      socialMediaLinks: {
        website?: string
        github?: string
        twitter?: string
        instagram?: string
        facebook?: string
        stackoverflow?: string
        linkedin?: string
        youtube?: string
      }
      badges: Array<{
        id: string
        name: string
        description: string
        image: string
      }>
      tagline: string
      dateJoined: string
      location: string
      availableFor: string
      tagsFollowing: Array<{
        id: string
        name: string
        slug: string
        logo: string
        tagline: string
        followersCount: number
        postsCount: number
      }>
      publications: {
        totalDocuments: number
        edges: Array<{
          node: {
            title: string
            posts: {
              edges: Array<{
                node: {
                  tags: Array<{ name: string }>
                  title: string
                  url: string
                }
              }>
            }
          }
        }>
      }
      deactivated: boolean
      followsBack: boolean
      isPro: boolean
    }
  }
}

type DetailsContextType = {
  details: UserDetails | null
  setSearchedUser: (user: string) => void
  searchedUser: string
  isLoading: boolean
  error: string | null
}

const detailsContext = createContext<DetailsContextType>({
  details: null,
  setSearchedUser: () => {},
  searchedUser: "",
  isLoading: false,
  error: null,
})

// GraphQL query
const query = `
  query User($username: String!, $pageSize: Int!, $page: Int!) {
    user(username: $username) {
      id
      username
      name
      location
      follows(pageSize: $pageSize, page: $page) {
        nodes {
          name
          username
        }
      }
      followers(pageSize: $pageSize, page: $page) {
        nodes {
          name
          username
        }
      }
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
      }
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
                  url
                  tags {
                    name
                  }
                }
              }
            }
          }
        }
      }
      deactivated
      followsBack
      isPro
    }
  }
`

const DetailsProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchedUser, setSearchedUser] = useState<string>("")
  const [details, setDetails] = useState<UserDetails | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true)
      setError(null)
      const vars = {
        username: searchedUser,
        pageSize: 12,
        page: 1,
      }
      try {
        const response = await fetch("https://gql.hashnode.com/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query, variables: vars }),
        })
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        if (data.errors) {
          throw new Error(data.errors[0].message)
        }
        setDetails(data)
      } catch (error) {
        console.error("Error fetching user details:", error)
        setError(error instanceof Error ? error.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    if (searchedUser && searchedUser !== "") {
      fetchDetails()
    }
  }, [searchedUser])

  return (
    <detailsContext.Provider value={{ details, setSearchedUser, searchedUser, isLoading, error }}>
      {children}
    </detailsContext.Provider>
  )
}

export const useDetailsContext = () => useContext(detailsContext)
export default DetailsProvider