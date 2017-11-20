import React from 'react';
import PropTypes from 'prop-types';

import styles from '../style/UsersList.css';

const UsersList = props => (
  <div className={styles.Users}>
    <div className={styles.UserOnline}>
      {props.users.length} people online
    </div>
    <ul className={styles.UsersList}>
      {props.users.map(user => (
        <li
          key={user.id}
          className={styles.UserItem}
        >{user.name}
        </li>
      ))}
    </ul>
  </div>
);

UsersList.propTypes = {
  users: PropTypes.array.isRequired
};

export default UsersList;
