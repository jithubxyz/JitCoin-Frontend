import * as React from 'react';
import Sidebar from './components/sidebar';
import GameProps from './components/sidebar';
import MainView from './components/mainView';

let styles = require('./App.scss');

export default class App extends React.Component {
    render() {
        return (
            <div className={styles.gridContainer}>
                <div className={styles.headbarLeft}>

                </div>
                <div className={styles.headbarRight}>

                </div>

                <Sidebar />
                <MainView />

                <div className={styles.footerRight}>

                </div>
                <div className={styles.footerLeft}>

                </div>
            </div>
        );
    }
}
