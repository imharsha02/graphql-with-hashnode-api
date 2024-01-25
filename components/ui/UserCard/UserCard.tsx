const UserCard = ({children, className}:{children:React.ReactNode, className?:string}) => {
  return (
    <div className={`${className} shadow-lg border rounded-lg border-solid p-3 border-gray-200 hover:border-teal-500`}>
        {children}
    </div>
  );
};

export default UserCard;
