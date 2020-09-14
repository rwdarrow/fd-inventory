import React, { useEffect, useState } from "react";
import axios from "axios";

import PartCard from "../part-card/part-card.component";

import { PartListContainer } from "./part-list.styles";
import PartDetailModal from "../part-detail-modal/part-detail-modal.component";

const PartList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [parts, setParts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // fetch the parts on component mount
  useEffect(() => {
    (async function fetchParts() {
      const response = await axios("http://localhost:9001/parts");

      setParts(response.data);
      setIsLoading(false);
    })();
  }, []);

  // while loading show the loading screen, otherwise render the list
  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div style={{ textAlign: "center" }}>
      <h1>Partmonger</h1>
      <PartListContainer>
        {parts.map((part) => {
          return <PartCard key={part.id} part={part} />;
        })}
        <button type="button" onClick={() => setShowModal(true)}>
          Add New Part
        </button>
        {showModal && (
          <PartDetailModal
            part={{}}
            setShowModal={setShowModal}
            newPart={true}
          />
        )}
      </PartListContainer>
    </div>
  );
};

export default PartList;
