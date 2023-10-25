import { User } from "@/types";
import { USERS_TAG } from "./tags";

export const getUsers = async () => {

  return await (await fetch(
    'http://localhost:8000/data', 
    { next: { tags: [USERS_TAG] } })).json() as Awaited<Array<User>>; 
}