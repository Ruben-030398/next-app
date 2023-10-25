"use client"

import React, { useState } from 'react'
import { ColumnDef, SortingState, Table, TableOptions, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'

import { Table as RadixTable, TextField } from '@radix-ui/themes'

export type TableProps<T> = {
  data: Array<T>,
  columns: Array<ColumnDef<T>>,
  tableOptions?: TableOptions<T>,
  toolbarActions?: React.ReactNode, 
}

export default function Table<T>({ data, columns, tableOptions, toolbarActions }: TableProps<T>) {
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter: search,
      ...tableOptions?.state
    },
    onGlobalFilterChange: setSearch,
    ...tableOptions,
  })

  return (
    <div className='shadow-lg bg-white min-w-[md] min-h-[20rem] h-full mx-auto p-4 w-full rounded-md dark:border-slate-700 dark:bg-slate-900 border'>
      <div className='w-full py-2 flex items-center justify-between'>
        <TextField.Root className='w-max'>
          <TextField.Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='Search' className='pl-2 bg-transparent rounded-md p-1 border border-indigo-500 focus:outline-none'
          />
        </TextField.Root>

        {toolbarActions}
      </div>

      <RadixTable.Root className='w-full' size="3">
        <RadixTable.Header className='border border-indigo-200 border-t-0 border-l-0 border-r-0 border-b-indigo-500'>
          {table.getHeaderGroups().map(headerGroup => (
            <RadixTable.Row className='' key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <RadixTable.RowHeaderCell className='text-start p-5' key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        }
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                </RadixTable.RowHeaderCell>
              ))}
            </RadixTable.Row>
          ))}
        </RadixTable.Header>
        {
          table.getRowModel().rows.length ? (
            <RadixTable.Body className='w-full'>
              {
                table.getRowModel().rows.map(row => (
                  <RadixTable.Row className='border-b-2  dark:border-b-slate-800' key={row.id}  >
                    {row.getVisibleCells().map(cell => (
                      <RadixTable.Cell title={String(cell.getValue())} className='p-5 overflow-hidden text-ellipsis max-w-[15rem]' key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </RadixTable.Cell>
                    ))}
                  </RadixTable.Row>
                ))
              }
            </RadixTable.Body>
          ) : (
            <div className='w-full h-full mt-3'>
              <h2>No values found</h2>
            </div>
          )
        }
      </RadixTable.Root>
    </div>
  )
}
