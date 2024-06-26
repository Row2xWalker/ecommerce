import { ArrowDownOutlined, CaretDownOutlined, CaretUpOutlined, DoubleLeftOutlined, DoubleRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'


import React, { useState } from 'react'
import { Input } from './ui/input'

const DataTable = ({ data, columns }) => {

    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering
    })

    return (
        <div className="w-full">
             <div className="flex items-center py-4 text-white">
                <Input
                    placeholder="Filter name..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <table>
                <thead className="bg-neutral-700 text-white border border-rounded-md">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className={`${header.id=="category"||"description"?"w-[300px]":"w-[50px]"} border border-white py-4`}
                                >
                                    {header.isPlaceholder ? null : (
                                        <div >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {
                                                header.column.getIsSorted() === "desc" ? (
                                                    <CaretDownOutlined className="ml-2 h-2 w-4" />
                                                  ) : header.column.getIsSorted() === "asc" ? (
                                                    <CaretUpOutlined className="ml-2 h-2 w-4" />
                                                  ) : (
                                                   null
                                                  )
                                            }
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td className={`bg-white py-2 text-center border`} key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex-1 text-sm text-muted-foreground"> 
                    {/* .toLocaleString() */}
                    Shows {(table.getPageCount()==1?table.getFilteredRowModel().rows.length:(table.getPageCount()==table.getState().pagination.pageIndex+1?table.getFilteredRowModel().rows.length:table.getRowModel().rows.length*(table.getState().pagination.pageIndex +1)))} out of{" "}
                    {table.getFilteredRowModel().rows.length} items.
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                <div className="py-2 bg-gray-100 flex gap-2 items-center">
                    <button 
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => table.setPageIndex(0)}
                        className="disabled:opacity-60"
                    >
                        <DoubleLeftOutlined className="bg-neutral-700 text-white rounded-md p-2"/>
                    </button>
                    <button
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => table.previousPage()}
                        className="disabled:opacity-60"
                    >
                        <LeftOutlined className="bg-neutral-700 text-white rounded-md p-2" />
                    </button>
                    <button
                        disabled={!table.getCanNextPage()}
                        onClick={() => table.nextPage()}
                        className="disabled:opacity-60"
                    >
                        <RightOutlined className="bg-neutral-700 text-white rounded-md p-2"/>
                    </button>
                    <button 
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)} 
                        disabled={!table.getCanNextPage()}
                        className="disabled:opacity-60"
                    >
                        <DoubleRightOutlined className="bg-neutral-700 text-white rounded-md p-2"/>
                    </button>
                </div>
            </div>
        </div>

    )
}

export default DataTable