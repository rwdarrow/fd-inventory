import styled from "styled-components"

export const PartCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-position: center;
  color: white;
  font-weight: bold;
  background-color: #95dada;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 25px;
  cursor: pointer;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;

  &:hover {
    transform: scale(1.05);
  }
`

export const ModalContainer = styled.div`
  position: fixed;
  z-index: 1;
`