import { getUsers } from '@/api/get-users';
import React from 'react'

import { columns } from './columns';
import ToolbarActions from '@/components/toolbar-actions';
import Table from '@/components/table'

const Users = async () => {
  const usersData = await getUsers();

  return (
    <div className="p-2 w-full flex h-max items-center overflow-auto flex-col">
      <Table 
        columns={columns} 
        data={usersData}
        toolbarActions={<ToolbarActions />}
      />
    </div>
  )
}

export default Users