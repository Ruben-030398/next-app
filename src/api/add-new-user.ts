"use server"

import { revalidateTag } from "next/cache";
import { USERS_TAG } from "./tags";
import { User } from "@/types";

export const addNewUser = async (data: Partial<User>) => {

  await fetch(`http://localhost:8000/data`, {
    method: 'POST',
    body: JSON.stringify({ ...data, avatar: 'https://robohash.org/quisteneturest.png?size=250x250&set=set1'}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  revalidateTag(USERS_TAG)
}