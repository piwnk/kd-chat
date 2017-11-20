import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../style/UserForm.css';

export default class UserForm extends Component {
  static propTypes = {
    onUserSubmit: PropTypes.func.isRequired
  }

  state = {
    name: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onUserSubmit(this.state.name);
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value });
    if (e.keyCode === 13) {
      this.handleSubmit(e);
    }
  }

  render() {
    return (
      <form
        className={styles.UserForm}
        onSubmit={e => this.handleSubmit(e)}
      >
        <input
          className={styles.UserInput}
          placeholder="Write your nickname and press enter"
          type="text"
          onChange={e => this.handleChange(e)}
          // onKeyUp={e => this.handleChange(e)}
          value={this.state.name}
        />
      </form>
    );
  }
}
