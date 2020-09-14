import React, { useState, useReducer } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Modal, ModalBody } from "./part-detail-modal.styles";

const PartDetailModal = ({ part, setShowModal, newPart }) => {
  const { inStock } = part;

  // quantity value for purposes of display
  const [quantity, setQuantity] = useState(inStock ? inStock : 0);

  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      partNumber: part.partNumber,
      name: part.name,
      description: part.description,
      notes: part.notes,
      cost: part.cost,
    }
  );

  // handle updating a part
  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .put(`http://localhost:9001/parts/${part.id}`, {
        partNumber: userInput.partNumber,
        name: userInput.name,
        description: userInput.description,
        notes: userInput.notes,
        cost: userInput.cost,
      })
      .then((response) => {
        if (response.status === 200) toast("Part updated successfully!");
        else toast(response.status);
      })
      .catch((error) => toast(error));
  };

  // handle adding a part
  const handleAdd = async (event) => {
    event.preventDefault();

    await axios
      .post("http://localhost:9001/parts/", {
        partNumber: userInput.partNumber,
        name: userInput.name,
        description: userInput.description,
        notes: userInput.notes,
        cost: userInput.cost,
      })
      .then((response) => {
        if (response.status === 200) toast("Part added successfully!");
        else toast(response.status);
      })
      .catch((error) => toast(error));
  };

  // handle removing a part
  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:9001/parts/${part.id}`)
      .then((response) => {
        if (response.status === 200) toast("Part removed successfully!");
        else toast(response.status);
      })
      .catch((error) => toast(error));
  };

  // send request to increase part count
  const handleReceive = async () => {
    await axios
      .put(`http://localhost:9001/parts/${part.id}/receive`, {
        quantity: 1,
      })
      .then((response) => {
        if (response.status === 200) setQuantity(quantity + 1);
      });
  };

  // send request to reduce part count
  const handleConsume = async () => {
    await axios
      .put(`http://localhost:9001/parts/${part.id}/consume`, {
        quantity: 1,
      })
      .then((response) => {
        if (response.status === 200) setQuantity(quantity - 1);
      });
  };

  const handleChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;

    setUserInput({ [name]: value });
  };

  return (
    <Modal>
      <ToastContainer />
      <button type="button" onClick={() => setShowModal(false)}>
        close
      </button>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <label>Part Number</label>
          <input
            type="text"
            name="partNumber"
            value={userInput.partNumber}
            placeholder="Part Number"
            onChange={handleChange}
          />
          <label>Part Name</label>
          <input
            type="text"
            name="name"
            value={userInput.name}
            placeholder="Name"
            onChange={handleChange}
          />
          <label>Description</label>
          <textarea
            rows={10}
            cols={50}
            name="description"
            value={userInput.description}
            placeholder="Description"
            onChange={handleChange}
          />
          <label>Notes</label>
          <textarea
            name="notes"
            value={userInput.notes}
            placeholder="Notes"
            onChange={handleChange}
          />
          <p>Quantity: {quantity}</p>
          <div style={{ display: "flex" }}>
            <label>$&nbsp;</label>
            <input
              type="text"
              name="cost"
              value={userInput.cost}
              placeholder="Price"
              onChange={handleChange}
            />
          </div>
        </ModalBody>
        {
          // if it is a new part, show add button, if it is existing, show update
          // and delete
          newPart ? (
            <button
              style={{ margin: "5px", backgroundColor: "aquamarine" }}
              onClick={handleAdd}
              name="add"
            >
              Add Part
            </button>
          ) : (
            [
              <button
                style={{ margin: "5px", backgroundColor: "aquamarine" }}
                type="submit"
                name="update"
              >
                Update Part
              </button>,
              <button
                style={{ margin: "5px", backgroundColor: "red" }}
                onClick={handleDelete}
                name="delete"
              >
                Delete Part
              </button>,
            ]
          )
        }
      </form>
      <button
        style={{ margin: "5px", backgroundColor: "LawnGreen" }}
        type="button"
        onClick={handleReceive}
      >
        Receive
      </button>
      <button
        style={{ margin: "5px", backgroundColor: "Orange" }}
        type="button"
        disabled={quantity < 1}
        onClick={handleConsume}
      >
        Consume
      </button>
    </Modal>
  );
};

export default PartDetailModal;
