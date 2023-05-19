import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from './TopBar';
import projects from './projectData';
import '../styles/Show.css';

export const Show = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const foundProject = projects.find((proj) => proj.id === parseInt(id));
    if (foundProject) {
      setProject(foundProject);
    }
  }, [id]);

  return (
    <>
      <div><TopBar /></div>
      <div className="show-page">
        <h2>{project && project.name !== '' ? 'Show Project' : 'Project Not Found'}</h2>
        {project && (
          <table>
            <tbody>
              <tr>
                <td>ID:</td>
                <td>{project.id}</td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>{project.name}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{project.description}</td>
              </tr>
              <tr>
                <td>Date:</td>
                <td>{project.creationTime}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
