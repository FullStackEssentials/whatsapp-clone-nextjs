import { cookies } from "next/headers";
import { getUsers, generateToken } from "./api/user"
import { Root } from "../components/Root";

export default async function Home() {
  const username = cookies().get('username')?.value || ''
  const loggedUser = await generateToken({
    id: username,
    name: username,
    image: `https://ui-avatars.com/api/?name=${username}`,
  })
  const users = getUsers()

  return <Root users={users} user={loggedUser} />
}
