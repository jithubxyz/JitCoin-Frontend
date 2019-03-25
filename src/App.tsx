import * as React from 'react';
import Sidebar from './components/sidebar';
import GameProps from './components/sidebar';
import MainView from './components/mainView';
import { string } from 'prop-types';

let styles = require('./App.scss');

export type AppState = {
    selected?: string;
    handleSelectionChange: Function;
}

export interface SelectionProps {
    uid: string;
    onClick: Function;
}


export default class App extends React.Component {
    constructor(props: any) {
        super(props);
    }

    public readonly state: AppState = {
        selected: "",
        handleSelectionChange: this.handleSelectionChange.bind(this)
    }

    handleSelectionChange(id: string) {
        this.setState({selected: id});
    }

    render() {
        return (
            <div className={styles.gridContainer}>
                <div className={styles.headbarLeft}>

                </div>
                <div className={styles.headbarRight}>

                </div>

                <Sidebar />
                <MainView selected={this.state.selected} />

                <div className={styles.footerRight}>

                </div>
                <div className={styles.footerLeft}>

                </div>
            </div>
        );
    }
}