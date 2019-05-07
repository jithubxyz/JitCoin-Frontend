import * as React from 'react';
import Sidebar from './components/sidebar';
import MainView from './components/mainView';
import Modal from "./components/userModal";
import * as UIControllers from "./UIControllers";
import { Switcher } from './components/demo/Switcher';

let styles = require('./App.scss');
const uuidv4 = require('uuid/v4');

// The global App state, containing info about the current selection (getting passed to child components)
export type AppState = {
    selectedId: string;
    selectedName: string;
    handleSelection: Function;
    changeNodes: Function;

    nodes: { id: string, name: string }[]; // Node array is used to create GameComponents dynamically
}
// The props getting passed to GameProps
export interface SelectionProps {
    uid: string;
    name: string;
    onSelect: Function;
    onDelete: Function;
}

export default class App extends React.Component {
    constructor(props: any) {
        super(props);
        this.handleSelectionChange = this.handleSelectionChange.bind(this)
        this.changeNodes = this.changeNodes.bind(this)
    }

    // Create actual state from above type
    public readonly state: AppState = {
        selectedId: "",
        selectedName: "",
        handleSelection: this.handleSelectionChange,
        changeNodes: this.changeNodes,
        nodes: [] // TODO: Get from API (only nodes in progress are required)
    }

    // Passses selections to state (thus updating the children)
    handleSelectionChange(id: string, name: string) {
        this.setState({selectedId: id});
        this.setState({selectedName: name})
    }

    // Sets the node array state to the updated version
    changeNodes(newNodes: { id: string, name: string }[]) {
        this.setState({nodes: newNodes})
    }

    // Pushes new content into the nodes array
    addGame(game: string) {
        var nodes: { id: string, name: string }[] = this.state.nodes;
        switch (game) {
            case "roulette":
                nodes.push({id: uuidv4(),name: "Roulette"})
                this.setState({nodes: nodes})
                break;
            case "slots":
                nodes.push({id: uuidv4(),name: "Slots"})
                this.setState({nodes: nodes})
                break;
        }
    }

    // Page layout
    render() {
        return (
            <div className={styles.gridContainer}>
                <div className={styles.headbarLeft}></div>
                <div className={styles.headbarRight}></div>

                <Sidebar handleSelection={this.handleSelectionChange} changeNodes={this.changeNodes} selectedId={this.state.selectedId} selectedName={this.state.selectedName} nodes={this.state.nodes}/>
                
                {/* For demo purposes */}
                <Switcher />

                <div className={styles.footerRight}>

                </div>
                <div className={styles.footerLeft}>

                </div>
            </div>
        );
    }
}