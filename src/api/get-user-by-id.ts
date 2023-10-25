import { User } from "@/types";

export const getUserById = async (id: string) => {

  return await (await fetch(`http://localhost:8000/data/${id}`)).json() as Awaited<User>; 
}