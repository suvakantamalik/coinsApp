import React, { useEffect, useState } from 'react'
import { API } from '../Utils/Api';

const Landing = () => {

    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    //fetch data using .then
    const fetchDataAsync = async () => {
        try {
            const response = await fetch(API)
            const jsonData = await response.json()
            console.log(jsonData)
            setData(jsonData);
            setFilterData(jsonData);
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    //fetch data using .then
    const fetchDataThen = () => {
        fetch(API)
            .then((response) => response.json())
            .then((jsonData) => {
                setData(jsonData);
                console.log(jsonData);
                setFilterData(jsonData);
            })
            .catch((error) => console.error('Error:', error));
    }

    useEffect(() => {
        fetchDataAsync();
        // fetchDataThen();
    }, [])

    //search function
    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);

        if (searchValue === '') {
            console.log(data);
            setFilterData(data)
        }
        else {
            const filtered = data.filter((coins) =>
                coins.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            console.log(filtered);
            setFilterData(filtered);
        }

    }

    const sortByMarketCap = () => {
        const sortedData = [...filterData].sort((a, b) => b.market_cap - a.market_cap);
        setFilterData(sortedData);
    };

    const sortByPercentageChange = () => {
        const sortedData = [...filterData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        setFilterData(sortedData);
    }
    return (

        <div className='container mx-auto p-4 ' >

            <div className='flex justify-center mb-6'>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder='Search By Name or Symbol'
                    className='border px-4 py-2 w-full mr-3 border-[#8E8E8E] hover:bg-[#8E8E8E] hover:placeholder-[#1A1A1C]'
                />

                <button
                    onClick={sortByMarketCap}
                    className='border px-4 py-2 w-52 mr-3 border-[#8E8E8E] hover:bg-[#8E8E8E] hover:text-[#1A1A1C]'
                >Sort By Mkt Cap</button>
                <button
                    onClick={sortByPercentageChange}
                    className='border px-4 py-2 w-60 border-[#8E8E8E] hover:bg-[#8E8E8E] hover:text-[#1A1A1C]'
                >Sort by percentage</button>
            </div>


            <div>
                <table>
                    <tbody className='w-full'>
                        {filterData.map((datas) => (
                            <tr key={datas.id} className='border-b-2 border-[#8E8E8E]'>
                                <td className='mr-6'>
                                    <img src={datas.image} alt={datas.name} width="30" height="30" />
                                </td>
                                <td className='px-6 py-3 pr-24'>{datas.name}</td>
                                <td className='px-6 py-3 pr-24'>{datas.symbol}</td>
                                <td className='px-6 py-3 pr-24'>${datas.current_price}</td>
                                <td className='px-6 py-3 pr-24'>${datas.total_volume.toLocaleString()}</td>
                                <td className={`px-6 py-3 pr-24
                                    ${
                                    datas.price_change_percentage_24h < 0
                                    ? 'text-red-500'
                                    : 'text-green-500'
                                    }`}>{datas.price_change_percentage_24h}%</td>
                                <td className='px-6 py-3'>Mkt cap: ${datas.market_cap}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Landing