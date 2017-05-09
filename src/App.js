import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socket from './socket'
import Messages from './components/Messages'

import * as firebase from 'firebase';

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: null,
      message: ""
    };
  }

   

  loginWithFacebook() {  
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      this.setState({user: result.user});
    }.bind(this));
  }

  logOut() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signOut().then(function() {
      this.setState({user: null});
    }.bind(this));
  }
  

  //   const rootRef = firebase.database().ref();
  //   const speedRef = rootRef.child('speed');
  //   speedRef.on('value', snap => {
  //     this.setState({
  //       speed: snap.val(),
  //       user: null
  //     });
  //   });
  // }
  // componentDidMount(){
  //   const rootRef = firebase.database().ref('message');
  //   //const messageRef = rootRef.child('one');
  //   rootRef.on('value', function(snap) {
  //     snap.forEach(function(data){
  //       //console.log(data.val().one);
  //       this.setState({
  //       message: data.val().one
  //     });
  //     })
  //   });
  // }
    
  render() {
    const user = this.state.user;

    return (
      <div className="App">
                   <button onClick={this.loginWithFacebook.bind(this)}>Login with Facebook</button><button onClick={this.logOut.bind(this)}>Log Out</button>

     <Messages />

        <form onSubmit={this.sendMessage}>
          <input ref={(input)=> this.input = input } autoComplete="off" />
          <button onClick={this.sendMessage} >Send</button>
        </form>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
  sendMessage = (event) => {
    const rootRef = firebase.database().ref('message');
    
    rootRef.push().set({
      one: this.input.value

    })
    // this.setState({message: this.input.value});
    event.preventDefault();
    console.log(this.input.value);
    socket.emit('chat message', this.input.value);
    this.input.value = ''
  }
}

export default App;
