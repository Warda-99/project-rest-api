import React, { useState } from "react";
import "../styles/Modal.css";

const Modal = ({ open, onClose, task, coopUsers }) => {
  const [modalTask, setModalTask] = useState(task); // Przypisanie wartości task do stanu modalTask
  const Token = localStorage.getItem("token");

  const [showAddUser, setShowAddUser] = useState(false);
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [statusToChange, setStatusToChange] = useState('');
  const [userToAdd, setUserToAdd] = useState('');

  if (!open) return null;

  const handleShowAddUser = () => {
    setShowAddUser(!showAddUser);
    showChangeStatus === true ? setShowChangeStatus(false) : <></>;
  };

  const handleShowChangeStatus = () => {
    setShowChangeStatus(!showChangeStatus);
    showAddUser === true ? setShowAddUser(false) : <></>;
  };

  return (
    <div onClick={onClose} className="overlay-popup">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-container"
      >
        <button className="btn-close-popup" onClick={onClose}>
          x
        </button>

        <div className="content-modal">
          <table>
            <tbody>
              <tr>
                <td>Nazwa</td>
                <td>{modalTask.nazwa}</td>
              </tr>
              <tr>
                <td>Opis</td>
                <td>{modalTask.opis}</td>
              </tr>
              <tr>
                <td>Data</td>
                <td>{modalTask.czasDodania}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{modalTask.status}</td>
              </tr>
              <tr>
                <td>Odpowiedzialni</td>
                <td>Jan</td>
              </tr>
            </tbody>
          </table>

          <div className="btn-container">
            <button
              className="btn-add-users"
              onClick={() => handleShowAddUser()}
            >
              Dodaj osobę
            </button>
            <button
              className="btn-add-users"
              onClick={() => handleShowChangeStatus()}
            >
              Zmień status
            </button>
          </div>

          {/* add user */}
          {showAddUser === true ? (
            <div className="add-user-container">
              {coopUsers.map((user) => (
                <label key={user.id} className="radio-label">
                  <input
                    type="radio"
                    className="radio-input"
                    // onChange={() => setUserToAdd(user.id)}
                  />
                  {user.email}
                </label>
              ))}

              <button onClick={() => {}}>zapisz</button>
            </div>
          ) : (
            <></>
          )}

          {/* change status */}
          {showChangeStatus === true ? (
            <div className="add-user-container">

              <label className="radio-label">
                <input
                  type="radio"
                  className="radio-input"
                  onChange={() => setStatusToChange('DO_ZROBIENIA')}
                />
                DO ZROBIENIA
              </label>

              <label className="radio-label">
                <input
                  type="radio"
                  className="radio-input"
                  onChange={() => setStatusToChange('W_TRAKCIE')}
                />
                W TRAKCIE
              </label>

              <label className="radio-label">
                <input
                  type="radio"
                  className="radio-input"
                  onChange={() => setStatusToChange('GOTOWE')}
                />
                GOTOWE
              </label>

              <button onClick={() => {}}>zapisz</button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
