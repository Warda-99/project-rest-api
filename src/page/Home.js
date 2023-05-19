import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import projects from './projectData';
import '../styles/Home.css';
import Background from './Background';

export const Home = () => {

const [itemsPerPage, setItemsPerPage] = useState(5);
const [currentPage, setCurrentPage] = useState(0);
const [searchQuery, setSearchQuery] = useState("");
const [activeSearchQuery, setActiveSearchQuery] = useState("");
const [projectList, setProjectList] = useState(projects);
const history = useNavigate();

const handleDeleteProject = (projectId) => {
  setProjectList(projectList.filter(project => project.id !== projectId));
};
const handleAddProject = () => {
  const newProject = {
    id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
    name: '',
    description: '',
    creationTime: ''
  };
  projects.push(newProject);
  history(`/edit/${newProject.id}`);
};
const displayedProjects = projects
.filter(project => project.name.toLowerCase().includes(activeSearchQuery.toLowerCase()))
.slice(
  currentPage * itemsPerPage,
  currentPage * itemsPerPage + itemsPerPage
);
const handleSearchQueryChange = (event) => {
  setSearchQuery(event.target.value);
};
const handleSearch = () => {
  setActiveSearchQuery(searchQuery);
};
const handleItemsPerPageChange = (event) => {
  const newItemsPerPage = parseInt(event.target.value, 10);
  const newMaxPage = Math.ceil(projects.length / newItemsPerPage) - 1;
  const newCurrentPage = Math.min(currentPage, newMaxPage);
  setItemsPerPage(newItemsPerPage);
  setCurrentPage(newCurrentPage);
};
const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
};
 
const handlePreviousPage = () => {
  if (currentPage > 0) {    
    setCurrentPage(currentPage - 1);    
  }
};

const handleNextPage = () => {
  const maxPage = Math.ceil(projects.length / itemsPerPage) - 1;
  if (currentPage < maxPage) {
    setCurrentPage(currentPage + 1);
  }
};

// Authorization session switch (true/false)
const [isLoggedIn] = useState(true);

  return (
    <div class = 'home-page'>
      <div><Background /></div>
      <TopBar/>

      {isLoggedIn ? (
        // isLoggedIn
        <>
        <div>
        <div class="SearchBlok">
          <input type="text" class="inputplaceholder" placeholder="Search" value={searchQuery} onChange={handleSearchQueryChange} onKeyDown={handleKeyDown}/>
          <button class="go" onClick={handleSearch}>Search</button>
        </div>
        <button class="AddProject" onClick={handleAddProject}>Add Project</button>
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
              <th class="action">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedProjects.map((project, index) => (
            <tr key={project.id}>
              <td>{currentPage * itemsPerPage + index + 1}</td>
              <td>{project.id}</td>
              <td>{project.name.length > 10 ? project.name.substring(0, 10) + '...' : project.name}</td>
              <td>{project.description.length > 10 ? project.description.substring(0, 10) + '...' : project.description}</td>
              <td>{project.creationTime}</td>
              <td>{project.defenseDate}</td>
              <td class="action">
                <Link class="table-button" to={`/show/${project.id}`}><button class="table-button">Show</button></Link>
                <Link class="table-button" to={`/edit/${project.id}`}><button class="table-button">Edit</button></Link>
                <button class="table-button delete" onClick={() => handleDeleteProject(project.id)}>Delete</button>
            </td>

            </tr>
          ))}
          </tbody>
        </table>
        <div class="pagesettings">
          <div class="navigation-buttons">
            {currentPage !== 0 && (
              <button onClick={handlePreviousPage}>
                Previous Page
              </button>
            )}
            {currentPage !== Math.ceil(projects.length / itemsPerPage) - 1 && (
              <button onClick={handleNextPage}>
                Next Page
              </button>
            )}
          </div>
          <div class="text-dropdown">
            <span>Items per page: </span>
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
