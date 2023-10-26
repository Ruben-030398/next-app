import { getUserById } from '@/api/get-user-by-id';
import { getUsers } from '@/api/get-users';
import { AtSign, BookUser, Building2, Phone, User2 } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react'

export type UserPageProps = {
  params: { userId: string }
}

export async function generateStaticParams() {
  const posts = await getUsers()
 
  return posts.map((user) => ({
    params: { userId: user.id },
  }))
}

export async function generateMetadata(
  { params }: UserPageProps,
): Promise<Metadata> {
  const id = params.userId

  const user = await getUserById(id)
 
  return {
    title: user.name,
    icons: [user.avatar]
  }
}

const UserPage = async ({ params }: UserPageProps) => {
  const { userId } = params;

  const userData = await getUserById(userId);

  return (
    <div className='w-full flex h-screen p-4 items-center justify-center'>
      <div className='gap-6 flex flex-wrap justify-between items-center flex-col'>
        <div className='mb-3 flex flex-col gap-5 justify-center items-center w-max'>
          <Image width={300} height={300} src={userData.avatar} alt={userData.name} />

          <h1 className='text-3xl'>{userData.name}</h1>
        </div>

        <ul className='flex gap-3 flex-col w-max m-7l'>
          <li className='flex gap-5 justify-between'><User2 /> {userData.username}</li>
          <li className='flex gap-5 justify-between'><AtSign /> {userData.email}</li>
          <li className='flex gap-5 justify-between'><BookUser /> {userData.address}</li>
          <li className='flex gap-5 justify-between'><Phone /> {userData.phone}</li>
          <li className='flex gap-5 justify-between'><Building2 /> {userData.company}</li>
        </ul>
      </div>

    </div>
  )
}

export default UserPage