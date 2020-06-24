import React, { createContext } from 'react'
import io from 'socket.io-client'
// import { WS_BASE } from '../config'
import { useDispatch } from 'react-redux'
// import { updateTweetList } from '../actions/tweet'
import { NEW_REPORT } from '../actions/types'
// import Notifier from 'react-desktop-notification'

const WebSocketContext = createContext(null)

export { WebSocketContext }

var socket
export default ({ children }) => {
  console.log(children)
  let ws
  const dispatch = useDispatch()
  // const sendMessage = (roomId, message) => {
  //   const payload = {
  //     roomId: roomId,
  //     data: message
  //   }
  //   socket.emit('event://send-message', JSON.stringify(payload))
  //   dispatch(updateChatLog(payload))
  // }
  if (!socket) {
    const token = localStorage.getItem('token')
    const accessToken = localStorage.getItem('accessToken')

    socket = io.connect(window.location.origin, {
      query: { token, accessToken }
    })

    socket.on('event://blur', (payload) => {
      dispatch({
        type: NEW_REPORT,
        payload: payload
      })
    })
    socket.on('event://focus', (payload) => {
      dispatch({
        type: NEW_REPORT,
        payload: payload
      })
    })
    // socket.on('event://new-message', (payload) => {
    //   console.log(payload)
    //   dispatch({
    //     type: SEND_MESSAGE,
    //     payload: payload
    //   })
    // })

    ws = {
      socket
      // sendMessage
    }
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )
}
