import styled, { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    height: 100%;
  }

  ::-webkit-scrollbar {
    width: 14px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #78c2ad;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #000;
  }
`

export const Wrapper = styled.div`
  padding: 20px;
  background: #ccc;
  border-radius: 0.4rem;
`

export const Messages = styled.section`
  display: block;
  padding: 20px;
  overflow-y: scroll;
  height: 320px;
  max-height: 320px;
  border-radius: 8px !important;
  margin: 0 0 20px 0;
  background: #fff;
`

export const Message = styled.div`
  display: block;
  margin: 0;
  text-align: right;
  &:not(:last-of-type) {
    margin: 0 0 10px 0;
  }
  > p {
    display: inline-block;
    margin: 0;
    padding: 5px 10px;
    border-radius: 6px;
    background: #eee;
    opacity: 0.8;
    box-shadow: 2px 4px 12px -7px rgba(0, 0, 0, 0.4);
    color: #000;
    strong {
      color: #78c2ad;
      font-size: 1.125rem;
    }
  }
`
