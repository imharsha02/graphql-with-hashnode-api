
const UserPage = ({params}:{params:{searchedUser:string}}) => {
  return (
    <div>
      {params.searchedUser}
    </div>
  )
}

export default UserPage
