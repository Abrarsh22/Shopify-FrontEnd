import React from "react";

const DeleteWarningModel = ({label, id, handledelete, handleDeleteDisplay}) => {
    const handleModalDelete = (id) => {
        handleDeleteDisplay(false);
        handledelete(id);
    }
    const handleModalDisplayChange = () => {
        handleDeleteDisplay(false);
    }
  return (
    <div>
      <div className="modal">
        <div className="modal-content-form">
          <h3 className="modal-heading-h3">Are you sure you want to delete {label} field ?</h3>
          <div className="modal-buttons">
            <button onClick={() => handleModalDelete(id)}>Yes</button>
            <button onClick={() => handleModalDisplayChange()}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteWarningModel;
