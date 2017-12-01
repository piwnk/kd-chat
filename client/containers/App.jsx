import React, { Component } from 'react';
import io from 'socket.io-client';

import styles from '../style/App.css';
import '../style/reset.css';

import UsersList from '../components/UsersList';
import MessageList from '../components/MessageList';
import UserForm from './UserForm';
import MessageForm from './MessageForm';


const socket = io('/');

export default class App extends Component {
  state = {
    users: [],
    messages: [],
    // text: '',
    name: ''
  }

  componentDidMount = () => {
    socket.on('message', message => this.messageReceive(message));
    socket.on('update', ({ users }) => this.chatUpdate(users));
  }


  messageReceive = (message) => {
    // 1
    const messages = [message, ...this.state.messages];
    this.setState({ messages });
    // 2
    // this.setState(prevState => ({ messages: [message, ...prevState.messages] }));
  }

  chatUpdate = users => this.setState({ users })

  // handlers
  handleMessageSubmit = (message) => {
    this.messageReceive(message);
    socket.emit('message', message);
  }

  handleUserSubmit = (name) => {
    this.setState({ name });
    socket.emit('join', name);
  }

  // renderers
  renderUserForm = () => (
    <UserForm
      onUserSubmit={name => this.handleUserSubmit(name)}
    />
  )

  renderLayout = () => (
    <div className={styles.App}>
      <div className={styles.AppHeader}>
        <div className={styles.AppTitle}>
          ChatApp
        </div>
        <div className={styles.AppRoom}>
          App room
        </div>
      </div>
      <div className={styles.AppBody}>
        <UsersList
          users={this.state.users}
        />
        <div className={styles.MessageWrapper}>
          <MessageList
            messages={this.state.messages}
          />
          <MessageForm
            onMessageSubmit={message => this.handleMessageSubmit(message)}
            name={this.state.name}
          />
        </div>
      </div>
    </div>
  );

  render() {
    return this.state.name ? this.renderLayout() : this.renderUserForm();
  }
}
