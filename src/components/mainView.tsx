import * as React from 'react';
import App, { AppState } from "../App";
import { getLastBlock } from '../api/endpoints';
import { Error } from './shared';

// Start IpcRenderer import
import { IpcRenderer } from 'electron';
declare global {
  interface Window {
    ipcRenderer: IpcRenderer
  }
}

export const { ipcRenderer } = window;
// End IpcRenderer import

let styles = require('../App.scss');

export default class MainView extends React.Component<AppState, { lastBlock: any }> {
    constructor(props: any) {
        super(props);

        this.state = { lastBlock: undefined };
    }

    componentDidMount() {
        ipcRenderer.send("getLastBlock"); // Requests the last block from the API
        ipcRenderer.on("lastBlockReceived", (event: any, response: any) => {
            this.setState({ lastBlock: response.data }); // Sets the lastBlock state to the API response (no custom model!)
            console.log(response.data);
        })
    }
    render() {
        
        if (this.state.lastBlock) { // Does the state exist? Only true after componentDidMount().
            if (this.state.lastBlock.code == 0) { // Check if the API response is a success
                return(
                    <div className={styles.main}>
                        <p>{this.state.lastBlock.data[0].hash}</p>
                    </div>)
            }
            else {
                return <Error message={this.state.lastBlock.message}></Error> // Else, display the API error message
            }
        }
        return(
            <div className={styles.main}>
                Selected game: {this.props.selectedName} [ID: {this.props.selectedId}]
            </div>
        );
    }
}