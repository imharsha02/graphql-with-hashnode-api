import { motion } from "framer-motion";
import Image from "next/image";
import Atropos from 'atropos/react';
import 'atropos/css';

type User = {
  username: string | undefined;
  name: string | undefined;
  profilePicture: string | undefined;
  bio?: { text: string | undefined };
  publications?: { totalDocuments: number };
  followers?: { nodes: any[] };
  dateJoined?: string;
};

const UserCard = ({
  children,
  className,
  user,
  enableAtropos = false
}: {
  children?: React.ReactNode;
  className?: string;
  user?: User;
  enableAtropos?: boolean;
}) => {
  const defaultProfilePicture = "/api/placeholder/100/100";

  // Calculate stats from user data
  const projectCount = user?.publications?.totalDocuments || 0;
  const followerCount = user?.followers?.nodes?.length || 0;
  
  // Calculate years from dateJoined
  const calculateYears = (dateJoined: string | undefined) => {
    if (!dateJoined) return 0;
    const joinDate = new Date(dateJoined);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - joinDate.getTime());
    const years = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    return years;
  };
  
  const yearsOnPlatform = calculateYears(user?.dateJoined);

  const cardContent = (
    <div className="flex flex-col items-center relative p-8">
      {/* Gradient Backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-primary/10" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-5" />
      
      {/* Title Section */}
      <div className="absolute top-4 left-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-primary bg-clip-text text-transparent">
          User Profile
        </h2>
      </div>

      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 via-primary to-purple-500" />

      {/* Profile Section */}
      <div className="relative mt-16 mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-primary rounded-2xl rotate-6 blur-sm opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-2xl -rotate-6 blur-sm opacity-70" />
        <Image
          data-atropos-offset="8"
          src={user?.profilePicture || defaultProfilePicture}
          alt={`${user?.name || 'User'}'s profile picture`}
          width={130}
          height={130}
          className="relative rounded-2xl object-cover border-4 border-background shadow-xl"
        />
      </div>

      {/* Name & Username */}
      <div className="text-center space-y-1 mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-primary bg-clip-text text-transparent">
          {user?.name}
        </h3>
        <p className="text-sm text-muted-foreground font-medium">
          @{user?.username}
        </p>
      </div>

      {/* Bio */}
      {user?.bio?.text && (
        <div className="relative w-full px-6 py-4 bg-background/50 rounded-xl backdrop-blur-sm">
          <div className="absolute top-0 left-4 -mt-2 w-3 h-3 bg-primary rotate-45" />
          <p className="text-sm text-center text-muted-foreground leading-relaxed">
            {user?.bio.text}
          </p>
        </div>
      )}

      {/* Stats Section */}
      <div className="flex gap-6 mt-6 text-center">
        <div className="space-y-1">
          <p className="text-xl font-bold text-primary">{projectCount}</p>
          <p className="text-xs text-muted-foreground">Projects</p>
        </div>
        <div className="w-px bg-border" />
        <div className="space-y-1">
          <p className="text-xl font-bold text-primary">{followerCount}</p>
          <p className="text-xs text-muted-foreground">Followers</p>
        </div>
        <div className="w-px bg-border" />
        <div className="space-y-1">
          <p className="text-xl font-bold text-primary">{yearsOnPlatform}</p>
          <p className="text-xs text-muted-foreground">Years</p>
        </div>
      </div>
    </div>
  );

  if (!enableAtropos) {
    return (
      <motion.div
        className={`${className} relative overflow-hidden rounded-xl border border-blue-500/20 bg-background/95 shadow-lg transition-all duration-300 backdrop-blur-sm hover:border-blue-500/40 hover:shadow-blue-500/10`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        {children || cardContent}
      </motion.div>
    );
  }

  return (
    <Atropos
      className={`${className} my-atropos`}
      rotateXMax={10}
      rotateYMax={10}
      shadowScale={1.05}
      highlight={false}
      shadow={false}
    >
      <div className="relative overflow-hidden rounded-xl border border-blue-500/20 bg-background/95 shadow-lg backdrop-blur-sm hover:border-blue-500/40 hover:shadow-blue-500/10">
        {children || cardContent}
      </div>
    </Atropos>
  );
};

export default UserCard;