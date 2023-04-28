import React, { useState } from 'react';
import TopBar from './TopBar';
import '../styles/Home.css';

export const Home = () => {
//info for test table
  const projects = [
    {
      no: 1,
      id: 101,
      name: 'Project A',
      description: 'Project A description',
      creationTime: '2023-04-10 14:30',
      defenseDate: '2023-06-20',
    },
    {
      no: 2,
      id: 102,
      name: 'Project B',
      description: 'Project B description',
      creationTime: '2023-04-15 11:15',
      defenseDate: '2023-06-25',
    },
    {
      no: 3,
      id: 103,
      name: 'Project C',
      description: 'Project C description',
      creationTime: '2023-04-30 15:45',
      defenseDate: '2023-06-30',
    },
    {
      no: 4,
      id: 104,
      name: 'Project D',
      description: 'Project D description',
      creationTime: '2023-04-10 10:25',
      defenseDate: '2023-06-30',
    },
    {
      no: 5,
      id: 105,
      name: 'Project E',
      description: 'Project E description',
      creationTime: '2023-04-40 18:45',
      defenseDate: '2023-06-30',
    },
    {
      no: 6,
      id: 106,
      name: 'Project F',
      description: 'Project F description a lot fot text',
      creationTime: '2023-04-20 15:15',
      defenseDate: '2023-06-30',
    },
    
  ];
const [itemsPerPage, setItemsPerPage] = useState(5);
const [currentPage, setCurrentPage] = useState(0);
const displayedProjects = projects.slice(
  currentPage * itemsPerPage,
  currentPage * itemsPerPage + itemsPerPage
);
const handleItemsPerPageChange = (event) => {
  setItemsPerPage(parseInt(event.target.value, 10));
  setCurrentPage(0);
};
//end info  

// Authorization session switch (true/false)
const [isLoggedIn] = useState(true);

  return (
    <div>
      <TopBar/>

      {isLoggedIn ? (
        // isLoggedIn
        <>
        <div>
        <div class="SearchBlok">
          <input type="text" class="inputplaceholder" placeholder="Search" />
          <button class="go">Search</button>
        </div>
        <button class="AddProject">Add Project</button>
        <h1>Project List</h1>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Creation Time</th>
              <th>Defense Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedProjects.map((project) => (
            <tr key={project.id}>
              <td>{project.no}</td>
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.creationTime}</td>
              <td>{project.defenseDate}</td>
              <td>
                <button class="table-button">Show</button>
                <button class="table-button">Edit</button>
                <button class="table-button delete">Delete</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        <div class="pagesettings">
          <div class="navigation-buttons">
            <button>Previous Page</button>
            <button>Next Page</button>
          </div>
          <div class="text-dropdown">
            <span>Items per page:</span>
            <select onChange={handleItemsPerPageChange}>
              <option>5</option>
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
        </div>
      </div>
        </>
      ) : (
        // !isLoggedIn
        <div class="message">
          <h2>Registration Required</h2>
          <p>You need to be registered to access this page.</p>
          <a href="#">Sign Up</a>
        </div>
      )}
    </div>
  );
};
