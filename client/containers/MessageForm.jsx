import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../style/MessageForm.css';

export default class MessageForm extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onMessageSubmit: PropTypes.func.isRequired
  }

  state = {
    text: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const message = {
      from: this.props.name,
      text: this.props.text
    };
    console.log(message);
    this.props.onMessageSubmit(message);
    this.setState({ text: '' });
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value });
    if (e.keyCode === 13) {
      this.handleSubmit(e);
    }
  }

  render() {
    return (
      <form
        className={styles.MessageForm}
        onSubmit={e => this.handleSubmit(e)}
      >
        <input
          className={styles.MessageInput}
          // onKeyUp={e => this.handleChange(e)}
          onChange={e => this.handleChange(e)}
          value={this.state.text}
          placeholder="Message"
        />
      </form>
    );
  }
}
