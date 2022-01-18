import React, { useMemo } from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'
import {COLUMNS} from './Column'
import '../Style/Table.css'

function TableSec({countryData}) {
    const columns = useMemo(()=> COLUMNS, []);
    const data = useMemo(()=> countryData, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        prepareRow,
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
    }, useSortBy, usePagination);

    const{pageIndex} = state;
    return (
        <>
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
        <div className='pagination' >
            <span>
                page{' : '}
                <strong>
                    {pageIndex+1} of {pageOptions.length}
                </strong>{'  '}
            </span>
            <span>
                Go to page:{' '}
                <input
                    type={"number"}
                    defaultValue={pageIndex + 1}
                    onChange={(e)=>{
                        const pageNo = e.target.value ? Number(e.target.value) - 1 : 0 ;
                        gotoPage(pageNo);
                    }}
                />
            </span>
            <button onClick={()=>{gotoPage(0)}} disabled={!canPreviousPage}>{'<<'}</button>
            <button onClick={()=>{previousPage()}} disabled={!canPreviousPage}>Previous</button>
            <button onClick={()=>{nextPage()}} disabled={!canNextPage}>Next</button>
            <button onClick={()=>{gotoPage(pageCount-1)}} disabled={!canNextPage}>{'>>'}</button>
        </div>
        </>
    )
}

export default TableSec
