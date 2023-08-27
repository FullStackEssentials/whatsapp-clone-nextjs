import { cookies } from "next/headers";
import { generateToken } from "./api/user"
import { ThemedApp } from "../components/ThemedApp";

// TODO: Have a server action to get the data and make this a client only page
export default async function Home() {
  const username = cookies().get('username')?.value || ''
  const loggedUser = await generateToken({
    id: username,
    name: username,
    image: `https://getstream.io/random_png/?id=${username}&name=${username}`,
  })

  return <ThemedApp user={loggedUser} />
}
