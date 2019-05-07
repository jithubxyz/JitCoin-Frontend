import * as React from 'react';
import App, { AppState } from "../App";
import { getLastBlock } from '../api/endpoints';
import { Error } from './shared';
let styles = require('../App.scss');

export default class MainView extends React.Component<AppState, { lastBlock: any }> {
    constructor(props: any) {
        super(props);

        this.state = { lastBlock: undefined };
    }

    componentDidMount() {
        getLastBlock().then((content) => {
            this.setState({ lastBlock: content });
        });
    }
    render() {
        if (this.state.lastBlock) {
            return <div>{this.state.lastBlock.header.hash}</div>
        }
        if (this.state.lastBlock === null) {
            return <Error message="No last block found"></Error>
        }
        return(
            <div className={styles.main}>
                Selected game: {this.props.selectedName} [ID: {this.props.selectedId}]
            </div>
        );
    }
}