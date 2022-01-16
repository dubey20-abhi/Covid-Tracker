import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import {COLUMNS} from './Column'
import '../Style/Table.css'
import GlobalFilter from './GlobalFilter';

function Table({countryData}) {

    const columns = useMemo(()=> COLUMNS, []);
    const data = useMemo(()=> countryData, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
        setGlobalFilter,
    } =  useTable({
        columns,
        data,
        initialState: {
            sortBy: [
                {
                    id: 'newcases',
                    desc: true
                }
            ]
        }
    }, useGlobalFilter, useSortBy, usePagination);

    const{globalFilter} = state;
    console.log(rows);

    return (
        <>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        <table {...getTableProps()}>
            <thead>
                
                {headerGroups.map(headerGroup => (
                     <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}</th>
                ))}
          </tr>
        ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

export default Table
