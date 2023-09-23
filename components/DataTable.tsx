import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'


import React, { useState } from 'react'

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
        onGlobalFilterChange: setFiltering,
    })

    return (
        <div className="">
            <table className="w-full">
                <thead className="bg-gray-100 ">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className="py-4"
                                >
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {
                                                { asc: '🔼', desc: '🔽' }[
                                                header.column.getIsSorted() ?? null
                                                ]
                                            }
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="p-2">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} >
                            {row.getVisibleCells().map(cell => (
                                <td className="bg-white text-center" key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table >
            <div className="bg-gray-100 flex gap-2 justify-center text-black font-bold">
                <button className="bg-gray-400 my-2 p-2 rounded-md w-[50px]" onClick={() => table.setPageIndex(0)}>{"<<"}</button>
                <button
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                    className="bg-gray-400 m-2 p-2 rounded-md w-[50px] disabled:opacity-60"
                >
                    {"<"}
                </button>
                <button
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                    className="bg-gray-400 m-2 p-2 rounded-md w-[50px]  disabled:opacity-60"
                >
                    {">"}
                </button>
                <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} className="bg-gray-400 m-2 p-2 rounded-md w-[50px]" >
                    {">>"}
                </button>
            </div>
        </div>

    )
}

export default DataTable