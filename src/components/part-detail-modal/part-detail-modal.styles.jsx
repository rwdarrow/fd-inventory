import styled from "styled-components"

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #95dada;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 25px;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
`

export const ModalBody = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  padding: 10px;
`