const UserCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`${className} shadow-lg shadow-gray-300 border rounded-lg border-solid p-3 border-gray-200 transition`}
    >
      {children}
    </div>
  );
};

export default UserCard;
