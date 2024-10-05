import styled from "styled-components"

export const StorageContainer = styled.main`
  flex: 1;
  padding: 4rem 2rem 1rem;
  height: 100dvh;
  max-width: 70rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const StorageHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    gap: 1rem;

    a {
      color: #29292E;

      &.active {
        color: #fcc90a;
      }
    }
  }

  h1 {
    font-size: 1.5rem;
    color: #29292E;
    font-weight: bold;
  }
`

export const StorageSearch = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  svg {
    cursor: pointer;
    color: #fcc90a;

    &:hover {
      color: #dcad06;
      transition: 0.3s;
    }

    &.active {
      color: $primary;
    }
  }
`
   
export const StorageMaterialsList = styled.section`
  flex: 1;
  overflow: auto;
  margin-top: 1rem;
  
  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: #FF9971;
      padding: 1rem;
      text-align: left;
      color: white;
      font-size: 0.875rem;
      line-height: 1.6;
      font-weight: 500;
    
      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }
    
      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }
    
    td {
      background-color: #f4f4f4;
      border-top: 4px solid #fff;
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;
    
      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }
    
      &:last-child {
        padding-right: 1.5rem;
      }
    }
    
    tr:hover td {
      background-color: #f7f7f8;
      cursor: pointer;
    }
  }
` 
   
export const Input = styled.input`
  flex-grow: 1;
  max-width: 30rem;
  padding: 0.3rem 0.625rem;
  outline: none;
  border: 1px solid #29292E;
  border-radius: 0.5rem;
 
  &.search-input {
    background: url("/src/assets/icons/search-icon.svg") no-repeat;
    background-position: calc(100% - 10px) center;
  }
`
  

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`

export const Form = styled.form`

`


export const ModalContainer = styled.div`
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  h1 {
    font-size: 1.2rem;
    font-weight: bold;

    display: flex;
    flex-direction: column;
    text-align: center;
    line-height: 1.3;

    span {
      font-size: 1rem;
      font-weight: normal;
    }
  }

`