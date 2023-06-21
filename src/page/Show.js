import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "./TopBar";
import axios from "axios";
import "../styles/Show.css";

export const Show = () => {
  const navigate = useNavigate();
  const Token = localStorage.getItem("token");
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [users, setUsers] = useState({});
  const [coopUsers, setCoopUsers] = useState([]);
  const [userToAdd, setUserToAdd] = useState({});
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

  const fetchData = async () => {
    // project
    axios({
      url: `https://project-rest-api-production.up.railway.app/project/${id}`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        setProject(res.data);
        //console.log(res.data);
      })
      .catch((err) => console.log(err));

    // all users
    axios({
      url: `https://project-rest-api-production.up.railway.app/usersToProject`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));

    // users coop project
    axios({
      url: `https://project-rest-api-production.up.railway.app/projectCoop/${id}`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        setCoopUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowAddUser = () => {
    setShowAddUser(!showAddUser);
    showAddTask === true ? setShowAddTask(false) : <></>;
  };

  const handleShowAddTask = () => {
    setShowAddTask(!showAddTask);
    showAddUser === true ? setShowAddUser(false) : <></>;
  };

  const handleAddUser = () => {
    axios({
      url: `https://project-rest-api-production.up.railway.app/addCoopUser`,
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
      data: {
        user: { id: userToAdd },
        projekt: { id: id },
      },
    })
      .then((res) => {
        console.log(res);
        setShowAddUser(false);
      })
      .catch((err) => console.log(err));
  };

  const handleFinishTask = () => {
    axios({
      url: `https://project-rest-api-production.up.railway.app/endProject/${id}`,
      method: "patch",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        console.log(res);
        navigate(-1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <TopBar />
      </div>
      <div className="show-page">
        <h2>
          {project && project.nazwa !== ""
            ? "Show Project"
            : "Project Not Found"}
        </h2>
        {project && (
          <>
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
                  <td>
                    {coopUsers.map((user) => (
                      <>
                        <div>{user.email}</div>
                      </>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>Zadania:</td>
                  <td>z1</td>
                </tr>
              </tbody>
            </table>

            <div className="btn-container">
              <button
                className="btn-add-users"
                onClick={() => handleShowAddUser()}
              >
                dodaj członków
              </button>
              <button
                className="btn-add-users"
                onClick={() => handleShowAddTask()}
              >
                dodaj zadanie
              </button>
              <button className="btn-finish" onClick={() => handleFinishTask()}>
                zakoncz
              </button>
            </div>

            {showAddUser === true ? (
              <div className="add-user-container">
                {users.map((user) => (
                  <label key={user.id} className="radio-label">
                    <input
                      type="radio"
                      className="radio-input"
                      onChange={() => setUserToAdd(user.id)}
                    />
                    {user.email}
                  </label>
                ))}

                <button onClick={() => handleAddUser()}>zapisz</button>
              </div>
            ) : (
              <></>
            )}

            {showAddTask === true ? (
              <div className="add-user-container">
                <input type="text"/>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </>
  );
};
