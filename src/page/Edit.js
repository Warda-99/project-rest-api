import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from './TopBar';
import projects from './projectData';
import '../styles/Edit.css';

export const Edit = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creationTime, setCreationTime] = useState('');
  const [isCreating, setIsCreating] = useState(false);

// useEffect(() => {
// const foundProject = projects.find((proj) => proj.id === parseInt(id));
// if (!foundProject) {
//     foundProject = {
//       id: parseInt(id),
//       name: '',
//       description: '',
//       creationTime: '',
//     };
//     projects.push(foundProject);
//     setIsCreating(true);
//   }
//   setProject(foundProject);
//   setName(foundProject.name);
//   setDescription(foundProject.description);
//   setCreationTime(foundProject.creationTime);
// }, [id]);

const handleSave = () => {
// logic to save changes goes here
// axios.put(`/api/projects/${id}`, {
//   name,
//   description,
//   creationTime
// })

//Local Update
// const updatedProjects = projects.map(proj => 
//     proj.id === project.id ? { ...proj, name, description, creationTime } : proj
// );

// const updatedProject = updatedProjects.find(proj => proj.id === project.id);
// setProject(updatedProjects.find(proj => proj.id === project.id));
// setName(updatedProject.name);
// setDescription(updatedProject.description);
// setCreationTime(updatedProject.creationTime);
};

return (
<>
    <div><TopBar /></div>
    <div className="edit-page">
    <h2>{project && project.name !== '' ? 'Edit Project' : 'Create Project'}</h2>
    <table>
        <tbody>
        <tr>
            <td>ID:</td>
            <td>{project && project.id}</td>
        </tr>
        <tr>
            <td>Name:</td>
            <td><input type="text" value={name} onChange={e => setName(e.target.value)} /></td>
        </tr>
        <tr>
            <td>Description:</td>
            <td><textarea value={description} onChange={e => setDescription(e.target.value)} /></td>
        </tr>
        <tr>
            <td>Team:</td>
            <td><textarea value={null} /></td>
        </tr>
        <tr>
            <td>Date:</td>
            <td><input type="datetime-local" value={creationTime} onChange={e => setCreationTime(e.target.value)} /></td>
        </tr>
        </tbody>
    </table>
    <button onClick={handleSave}>Save</button>
    </div>
</>
);
};
