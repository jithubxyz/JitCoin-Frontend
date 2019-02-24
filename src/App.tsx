import * as React from 'react';
let styles = require('./App.scss');

export default class App extends React.Component {
  render() {
    return (
    <div className={styles.gridContainer}>
      <div className={styles.headbarLeft}>

      </div>
      <div className={styles.headbarRight}>

      </div>
      <div className={styles.sidebar}>

      </div>
      <div className={styles.main}>
        Put the stuff here
      </div>
      
      <div className={styles.footerRight}>

      </div>
      <div className={styles.footerLeft}>

      </div>
    </div>
    );
  }
}
