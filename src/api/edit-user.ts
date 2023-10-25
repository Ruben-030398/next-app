"use server"

import { revalidateTag } from "next/cache";
import { USERS_TAG } from "./tags";
import { User } from "@/types";

export const editUserById = async (id: number, update: Partial<User>) => {
  console.log(id, 'id');

  await fetch(`http://localhost:8000/data/${id}`, {
    method: 'PUT',
    body: JSON.stringify(update),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  revalidateTag(USERS_TAG)
}