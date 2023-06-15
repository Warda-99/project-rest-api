import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from './TopBar';
import axios from "axios";
import projects from './projectData';
import '../styles/Show.css';

export const Show = () => {
  const Token = localStorage.getItem("token");
  const { id } = useParams();
  const [project, setProject] = useState(null);

  const fetchData = async () => {

		axios({
			url: `https://project-rest-api-production.up.railway.app/project/${id}`,
			method: 'get',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Token}`,
			},
		})
			.then((res) => {
				setProject(res.data)
			})
			.catch((err) => console.log(err))
	}

  useEffect(() => {
    fetchData();
  }, []);

  //console.log(project)

  return (
    <>

      <div><TopBar /></div>
      <div className="show-page">
        <h2>{project && project.nazwa !== '' ? 'Show Project' : 'Project Not Found'}</h2>
        {project && (
          <table>
            <tbody>
              <tr>
                <td>ID:</td>
                <td>{project.id}</td>
              </tr>
              <tr>
                <td>Nazwa:</td>
                <td>{project.nazwa}</td>
              </tr>
              <tr>
                <td>Opis:</td>
                <td>{project.opis}</td>
              </tr>
              <tr>
                <td>Data Utworzenia:</td>
                <td>{project.dataUtworzenia}</td>
              </tr>
              <tr>
                <td>Lista członków:</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
