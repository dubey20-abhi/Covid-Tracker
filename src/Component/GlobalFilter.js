import React,{useState} from 'react'
import { useAsyncDebounce } from 'react-table';
import '../Style/Table.css'

function GlobalFilter({filter, setFilter}) {
    const[value, setValue] = useState(filter);

    const onChange = useAsyncDebounce((value)=>{
        setFilter(value || undefined);
    }, 1000);

    return (
        <div className='filter'>
            <input value={filter || ''} onChange={(e)=>{
                setFilter(e.target.value) 
                onChange(e.target.value)}} placeholder='Enter Country or Continent'/>
        </div>
    )
}

export default GlobalFilter;
