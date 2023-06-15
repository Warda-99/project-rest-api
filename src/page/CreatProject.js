import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import "../styles/Edit.css";
import axios from "axios";

export const CreateProject = () => {
  const Token = localStorage.getItem("token");
  const [project, setProject] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {

    //setProject = { name, description }
    // console.log(project)

    axios({
      url: `https://project-rest-api-production.up.railway.app/addProject`,
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
      data: {
        "nazwa": name,
        "opis": description,
      }
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <TopBar />
      </div>
      <div className="edit-page">
        <h2>
          {project && project.name !== "" ? "Edit Project" : "Create Project"}
        </h2>
        <table>
          <tbody>
            <tr>
              <td>ID:</td>
              <td>{project && project.id}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>Team:</td>
              <td>
                <textarea value={null} />
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleSave}>Save</button>
      </div>
    </>
  );
};
