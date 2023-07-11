import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "./TopBar";
import axios from "axios";
import "../styles/Show.css";
import Modal from "./Modal";

export const Show = () => {
  const navigate = useNavigate();
  const Token = localStorage.getItem("token");
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [users, setUsers] = useState({});
  const [coopUsers, setCoopUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [file, setFile] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [userToAdd, setUserToAdd] = useState({});
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddFile, setShowAddFile] = useState(false);

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

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
      })
      .catch((err) => console.log(err));

    // file list
    axios({
      url: `https://project-rest-api-production.up.railway.app/files/${id}`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        setFileList(res.data);
        console.log(res.data)
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

    // tasks
    axios({
      url: `https://project-rest-api-production.up.railway.app/getAllZadaniaProjektu/${id}`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        setTasks(res.data);
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

  const handleAddTask = () => {
    axios({
      url: `https://project-rest-api-production.up.railway.app/addZadanie/${id}`,
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
      data: {
        nazwa: taskName,
        opis: taskDescription,
      },
    })
      .then((res) => {
        console.log(res);
        setShowAddTask(false);
      })
      .catch((err) => console.log(err));
  };

  const handleFinishProject = () => {
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

  const [openModals, setOpenModals] = useState({});

  const handleOpenModal = (taskId) => {
    setOpenModals((prevModals) => ({
      ...prevModals,
      [taskId]: true,
    }));
  };

  const handleCloseModal = (taskId) => {
    setOpenModals((prevModals) => ({
      ...prevModals,
      [taskId]: false,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    axios({
      url: `https://project-rest-api-production.up.railway.app/file/save/${id}`,
      method: "post",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Token}`,
      },
      data: formData,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
                  <td>{project?.id}</td>
                </tr>
                <tr>
                  <td>Nazwa:</td>
                  <td>{project?.nazwa}</td>
                </tr>
                <tr>
                  <td>Opis:</td>
                  <td>{project?.opis}</td>
                </tr>
                <tr>
                  <td>Data Utworzenia:</td>
                  <td>{project?.dataUtworzenia}</td>
                </tr>
                <tr>
                  <td>Lista członków:</td>
                  <td>
                    {coopUsers.map((user) => (
                      <>
                        <div>{user?.email}</div>
                      </>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>Zadania:</td>
                  <td>
                    {tasks.map((task) => (
                      <div key={task.id}>
                        <button
                          className="btn-task"
                          onClick={() => handleOpenModal(task.id)}
                        >
                          {task?.nazwa} - {task?.status}
                        </button>
                        {/* {console.log(task)} */}
                        <Modal
                          open={openModals[task.id]}
                          task={task}
                          coopUsers={coopUsers}
                          onClose={() => handleCloseModal(task.id)}
                        />
                      </div>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td>Pliki:</td>
                  <td>
                    
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Przyciski */}
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
              <button
                className="btn-add-users"
                onClick={() => setShowAddFile(!showAddFile)}
              >
                dodaj plik
              </button>
              <button
                className="btn-finish"
                onClick={() => handleFinishProject()}
              >
                zakoncz
              </button>
            </div>

            {/* add user */}
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

            {/* add task */}
            {showAddTask === true ? (
              <div className="add-task-container">
                <div>
                  <input
                    type="text"
                    placeholder="nazwa"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </div>
                <div>
                  <textarea
                    placeholder="opis"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                </div>
                <button onClick={() => handleAddTask()}>dodaj</button>
              </div>
            ) : (
              <></>
            )}

            {/* add file */}
            {showAddFile === true ? (
              <div className="add-user-container">
                <div>
                  <input type="file" onChange={handleFileChange} />
                </div>

                <button onClick={handleFileUpload}>Prześlij</button>
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
