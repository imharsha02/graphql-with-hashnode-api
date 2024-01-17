"use client"
import { createContext, useState, useEffect } from "react";

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
export const detailsContext =createContext<{
  details:UserDetails|null,
  setSearchedUser: (user: string) => void,
  searchedUser:string
}>({ details: null, setSearchedUser: () => {}, searchedUser:'' });

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

const DetailsProvider = ({
  children,
}: {
  children: React.ReactNode;
  searchedUser: string;
}) => {
  const [searchedUser,setSearchedUser] = useState<string>("")
  const [details, setDetails] = useState<UserDetails | null>(null);
  useEffect(() => {
    const fetchDetails = async () => {
      const vars = {
        username: searchedUser,
        pageSize: 12,
      };
      try{
        const response = await fetch("https://gql.hashnode.com/",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({query,variables:vars})
        })
        const data = await response.json();
        console.log(data);
        setDetails(data);
      }catch(error){
        console.log("Error: ", error)
      }
    };
      fetchDetails();
  },[searchedUser])
  return (
    <detailsContext.Provider value={{details,setSearchedUser, searchedUser}}>
      {children}
    </detailsContext.Provider>
  );
};

export default DetailsProvider;
