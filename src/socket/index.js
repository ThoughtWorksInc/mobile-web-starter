import client from 'socket.io-client'

import { addSchedule } from '../schedule/actions/schedule'

export default (store) => {
  const socket = client(global.location.host);

  socket.on('message', (data) => {
    addSchedule(data)(store.dispatch)
  });
}