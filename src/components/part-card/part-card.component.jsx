import React, { useState } from "react";

import PartDetailModal from "../part-detail-modal/part-detail-modal.component";

import { PartCardContainer, ModalContainer } from "./part-card.styles";

const PartCard = ({ part }) => {
  const [showModal, setShowModal] = useState(false);
  const { partNumber, name, image } = part;

  return (
    <>
      <PartCardContainer
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.99), rgba(0, 0, 0, 0.2)), url(${image})`,
        }}
        onClick={() => setShowModal(true)}
      >
        {partNumber}
        {" | "}
        {name}
      </PartCardContainer>
      {showModal && (
        <ModalContainer>
          <PartDetailModal part={part} setShowModal={setShowModal} />
        </ModalContainer>
      )}
    </>
  );
};

export default PartCard;
