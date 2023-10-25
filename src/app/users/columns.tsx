"use client"

import { deleteUserById } from "@/api/delete-user";
import { registerDialog } from "@/atoms/global-dialogs";
import Menu from "@/components/menu";
import { User } from "@/types";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import UserDialog from "@/dialogs/user-dialog";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const columnHelper = createColumnHelper<User>();

export const columns: ColumnDef<User, any>[] = [
  columnHelper.accessor('avatar', {
    cell: (info) => <Image className="min-w-[2rem]" alt={info.row.original.name} src={info.getValue()} width={50} height={50} />,
    id: 'avatar',
    header: () => null
  }),
  columnHelper.accessor('name', {
    cell: info => {
      return <Link className="text-violet-500 border-b-2 border-transparent hover:border-violet-600" href={`users/${info.row.original.id}`}>{info.getValue()}</Link>
    },
    header: () => <span>Name</span>,
    id: 'name',
  }),
  columnHelper.accessor('username', {
    cell: info => info.getValue(),
    header: () => <span>User name</span>,
  }),
  columnHelper.accessor('email', {
    cell: info => info.getValue(),
    header: () => <span>Email</span>,
  }),
  columnHelper.accessor('address', {
    cell: info => info.getValue(),
    header: () => <span>Address</span>,
  }),
  columnHelper.accessor('phone', {
    cell: info => info.getValue(),
    header: () => <span>Phone</span>,
  }),
  columnHelper.accessor('company', {
    cell: info => info.getValue(),
    header: () => <span>Company</span>,
  }),
  columnHelper.accessor('id', {
    cell: (info) => <Menu actions={[
      {
        text: (
          <div className="flex justify-between gap-4 w-full items-center">
            <span>Edit</span>
            <Pencil className="w-4" />
          </div>
        ),
        onClick: () => registerDialog({
          Component: UserDialog,
          props: { editMode: true, userData: info.row.original },
        }),
      },
      {
        className: 'text-red-500',
        text: (
          <>
            Delete
            <Trash2 className="w-4 text-red-500" />
          </>
        ),
        onClick: () => deleteUserById(info.getValue()),
      }
    ]} />,
    header: () => null
  }),
]