import * as React from 'react';
import { Link } from 'react-router-dom';

let styles = require('./Home.scss');

export default class Home extends React.Component {
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
        We are using Node.js <script>
          document.write(process.versions.node)
        </script>,
        Chromium <script>
          document.write(process.versions.chrome)
        </script>,
        and Electron <script>
          document.write(process.versions.electron)
        </script>
        <Link to="/counter">to Counter</Link>
      </div>
      
      <div className={styles.footerRight}>

      </div>
      <div className={styles.footerLeft}>

      </div>
    </div>
    );
  }
}
