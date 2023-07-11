import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
// import projects from "./projectData";
import axios from "axios";
import "../styles/Home.css";

export const MyProjects = () => {
    const navigate = useNavigate();
  // Authorization session switch (true/false)
  const [isLoggedIn] = useState(true);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/registrationrequired');
    }
  }, [isLoggedIn, navigate]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchQuery, setActiveSearchQuery] = useState("");
  const history = useNavigate();

  const Token = localStorage.getItem("token");
  const [projects, setProjectData] = useState([]);
  
  const [projectList, setProjectList] = useState(projects);

  const fetchData = async () => {
		axios({
			url: 'https://project-rest-api-production.up.railway.app/createdProjects',
			method: 'get',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Token}`,
			},
		})
			.then((res) => {
				setProjectData(res.data)
			})
			.catch((err) => console.log(err))
	}

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteProject = (projectId) => {
    setProjectList(projectList.filter((project) => project.id !== projectId));
  };

  const handleAddProject = () => {
    history(`/creatProject`);
  };

  const displayedProjects = projects
    .filter((project) =>
      project.nazwa.toLowerCase().includes(activeSearchQuery.toLowerCase())
    )
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
    if (event.key === "Enter") {
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


  return (
    <div class="home-page">
      <TopBar />

      {
        <>
          <div>
            <div class="SearchBlok">
              <input
                type="text"
                class="inputplaceholder"
                placeholder="Szukaj"
                value={searchQuery}
                onChange={handleSearchQueryChange}
                onKeyDown={handleKeyDown}
              />
              <button class="go" onClick={handleSearch}>
                Szukaj
              </button>
            </div>
            <button class="AddProject" onClick={handleAddProject}>
              Dodaj projekt
            </button>
            <h1>Lista projektów</h1>
            <table>
              <thead>
                <tr>
                <th>No.</th>
                  <th class="hide-on-small">ID</th>
                  <th>Nazwa</th>
                  <th>Opis</th>
                  <th class="hide-on-small">Data utworzenia</th>
                  <th class="hide-on-small">Data wykonania</th>
                  <th class="action">Akcja</th>
                </tr>
              </thead>
              <tbody>
                {displayedProjects.map((project, index) => (
                  <tr key={project.id}>
                    <td>{currentPage * itemsPerPage + index + 1}</td>
                    <td class="hide-on-small">{project.id}</td>
                    <td>
                      {project.nazwa.length > 10
                        ? project.nazwa.substring(0, 10) + "..."
                        : project.nazwa}
                    </td>
                    <td>
                      {project.opis.length > 10
                        ? project.opis.substring(0, 10) + "..."
                        : project.opis}
                    </td>
                    <td class="hide-on-small">{project.dataUtworzenia}</td>
                    <td class="hide-on-small">{project.dataOddania}</td>
                    <td class="action">
                      <Link class="table-button" to={`/show/${project.id}`}>
                        <button class="table-button">Pokaż</button>
                      </Link>
                      <Link class="table-button" to={`/edit/${project.id}`}>
                        <button class="table-button">Edytuj</button>
                      </Link>
                      <button
                        class="table-button delete"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        Usuń
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div class="pagesettings">
              <div class="navigation-buttons">
                {currentPage !== 0 && (
                  <button onClick={handlePreviousPage}>Poprzednia strona</button>
                )}
                {currentPage !==
                  Math.ceil(projects.length / itemsPerPage) - 1 && (
                  <button onClick={handleNextPage}>Następna strona</button>
                )}
              </div>
              <div class="text-dropdown">
                <span class="hide-on-small">Elementy na stronę: </span>
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
      }
    </div>
  );
};
