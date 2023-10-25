"use server"

import { revalidateTag } from "next/cache";
import { USERS_TAG } from "./tags";

export const deleteUserById = async (id: string) => {  
  await fetch(`http://localhost:8000/data/${id}`, {
    method: 'DELETE',
  });

  revalidateTag(USERS_TAG)
}