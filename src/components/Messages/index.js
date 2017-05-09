import React, {Component} from 'react'
import socket from './socket'
import * as firebase from 'firebase';


class Messages extends Component {
  render() {
    return (<ul>
      {this.state.messages.map((message, index)=><li key={index} >{message}</li>)}
    </ul>)
  }
  constructor() {
    super()
    this.state = {
      messages: []
    }
  }
  componentWillMount() {
    socket.on('chat message', (msg) => {
      this.setState(prevState=>{
        return {
          messages: prevState.messages.concat(msg)
        }
      })
    });
  }

   componentDidMount() {

    const rootRef = firebase.database().ref('message');
    //const messageRef = rootRef.child('one');
    rootRef.on('value', (snap) => {
      snap.forEach((data) => {
          if(!this.state.messages.includes(data.val().one)){
          this.state.messages.push(data.val().one)
          }

        this.setState({
        messages: this.state.messages
      });

      })
    });
  }
}


export default Messages
