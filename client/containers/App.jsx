import React, { Component } from 'react';
import io from 'socket.io-client';

import styles from '../style/App.css';

import UsersList from '../components/UsersList';
import UserForm from '../components/UserForm';
import MessageList from '../components/MessageList';
import MessageForm from '../components/MessageForm';


const socket = io('/');

export default class App extends Component {
  state = {
    users: [],
    messages: [],
    text: '',
    name: ''
  }

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
