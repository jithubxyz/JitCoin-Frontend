import * as React from 'react';
import App, { AppState } from "../App";
let styles = require('../App.scss');

export default class MainView extends React.Component<AppState> {
    render() {
        return(
            <div className={styles.main}>
                Selected game: {this.props.selectedName} [ID: {this.props.selectedId}]
            </div>
        );
    }
}