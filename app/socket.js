import io from 'socket.io-client';
import { addNewProject } from './reducers/projects';
// import store from './store'

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('I am now connected to the server!');
});
socket.on('new-project', project => {
  //add project to state
  store.dispatch(addNewProject(project));
})

// socket.on('delete-message', messageId => {
//   store.dispatch(deleteMessageFromState(messageId));
// })

export default socket;
