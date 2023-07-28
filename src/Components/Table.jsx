import React, { useEffect, useState } from 'react'
import './Table.css'
const Table = () => {
    // State For The API Data
    const [data, setData] = useState([]);

    // State For The Search Query
    const [searchQuery, setSearchQuery] = useState('');

    // Method That Runs On Each and Every Render
    useEffect(() => {
        // fetching data
        const fetchedData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                if (!response.ok) {
                    console.log('An Error While Fetching');
                }

                // If There's No Error Then we return response and also set to data;
                const jsonData = await response.json();
                setData(jsonData)
            }
            catch (e) {
                console.log('Ooops', e);
            }
        };
        fetchedData();
    }, []);

    // Function to handle search input Value And Store Them To State
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter the data based on the searchQuery
    const filteredData = data.filter((item) =>
        // Checking that username in item is includes with search Query or not
        item.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function To Toggle Input Field
    const toggleSearch = () => {
        document.querySelector('#username').classList.toggle('active')
    };

    return (
        <>
            <div className="container">
                <div className="header">
                    <div className="heading">
                        <h2>User Data</h2>
                    </div>
                    <div className="search">
                        <input type="text" id="username" placeholder='Search By Username' value={searchQuery} onChange={handleSearchChange} />
                        <button className="btn" onClick={toggleSearch}>Search</button>
                    </div>
                </div>
                <table className='table'>
                    <thead id='header'>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>username</th>
                            <th>email</th>
                            <th>address</th>
                        </tr>
                    </thead>

                    <tbody id='body'>   
                        {filteredData.map((value) => ( 
                            // above we are fetching from filtered result instead of direct data, because fetching from data directly will not update the table.
                            <tr key={value.id}>
                                <td>{value.id}.</td>
                                <td>{value.name}</td>
                                <td>{value.username}</td>
                                <td>{value.email}</td>
                                <td>{value.address.street}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table