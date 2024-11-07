import { motion } from "framer-motion";
import Image from "next/image";

type User = {
  username: string | undefined;
  name: string | undefined;
  profilePicture: string | undefined;
  bio?: { text: string | undefined };
};

const UserCard = ({
  children,
  className,
  user,
}: {
  children?: React.ReactNode;
  className?: string;
  user?: User;
}) => {
  const defaultProfilePicture = "/api/placeholder/100/100";

  return (
    <motion.div
      className={`${className} shadow-md shadow-primary/40 border border-primary/40 rounded-lg p-6 transition-all bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.05,
      }}
      
    >
      {children ? (
        children
      ) : (
        <div className="flex flex-col items-center gap-4">
          <Image
            src={user?.profilePicture || defaultProfilePicture}
            alt={`${user?.name || 'User'}'s profile picture`}
            width={100}
            height={100}
            className="rounded-full ring-4 ring-primary/20"
          />
          <h3 className="text-2xl font-semibold">{user?.name}</h3>
          <p className="text-muted-foreground">@{user?.username}</p>
          {user?.bio?.text && (
            <p className="text-center text-muted-foreground mt-2">
              {user?.bio.text}
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default UserCard;