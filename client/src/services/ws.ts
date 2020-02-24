import io from 'socket.io-client'

const { REACT_APP_WS_URI } = process.env

export default io(REACT_APP_WS_URI || 'http://localhost:3001')
