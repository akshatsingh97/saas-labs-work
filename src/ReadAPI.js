import React, { useState, useEffect } from 'react'
import './ReadAPI.css'

const ReadAPI = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentGroup, setCurrentGroup] = useState(1);
    const recordsPerPage = 5;
    const buttonsPerGroup = 5;
    

    useEffect(() => {
        fetchAPI();
    },[]);

    const fetchAPI = async () => {
        try{
            const value = await fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json');

            if(!value.ok){
                throw new Error(`HTTP error! status: ${value.status}`)
            }

            const result = await value.json();
            setData(result);
        }
        catch(err){
            setError(err.message);
        }
    }

    const idxLastRecord = currentPage * recordsPerPage;
    const idxFirstRecord = idxLastRecord - recordsPerPage;
    const currentRecords = data.slice(idxFirstRecord, idxLastRecord);

    const totalNumberOfPages = Math.ceil(data.length / recordsPerPage);
    const totalPagesGroup = Math.ceil(totalNumberOfPages / buttonsPerGroup)

    const pageChange = (page) => {
        setCurrentPage(page);
    }

    const nextGroup = () => {
        if(currentGroup < totalPagesGroup) {
            setCurrentGroup((prev) => prev + 1);
        }
    }

    const previousGroup = () => {
        if(currentGroup > 1){
            setCurrentGroup((prev) => prev - 1);
        }
    }

    const renderPageButtons = () => {
        const startPage = (currentGroup -1) * buttonsPerGroup + 1;
        const endPage = Math.min(startPage + buttonsPerGroup - 1, totalNumberOfPages);

        return Array.from({ length: endPage - startPage + 1}, (_, index) => {
            const page = startPage + index;
            return (
            <button
                key={page}
                className={`page-button ${currentPage === page ? "active" : ""}`}
                onClick={() => pageChange(page)}
                >
                {page}
            </button>
            );
        })
    }


  if(error) return <p> Error: {error}</p>;

  return (
    <div className='read-api'>
        <h1>KickStarter Project</h1>
        <table className='project-table'>
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>Percentage Funded</th>
                    <th>Amount Pledged</th>
                </tr>
            </thead>
            <tbody>
                {currentRecords.map((item) => (
                    <tr key={item["s.no"]}>
                        <td>{item["s.no"]}</td>
                        <td>{item["percentage.funded"]}</td>
                        <td>{item["amt.pledged"]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className='project-pagination'>
            <button
                className='page-button'
                disabled={currentGroup === 1}
                onClick={previousGroup}
            >
            Previous
            </button>
            {renderPageButtons()}
            <button
                className='page-button'
                disabled={currentGroup === totalPagesGroup}
                onClick={nextGroup}
            >
            Next
            </button>
        </div>
    </div>
  )
}

export default ReadAPI;