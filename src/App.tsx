import * as React from 'react';
import Sidebar from './components/sidebar';
import MainView from './components/mainView';

let styles = require('./App.scss');
const uuidv4 = require('uuid/v4');

export type AppState = {
    selectedId: string;
    selectedName: string;
    handleSelection: Function;
    changeNodes: Function;

    nodes: { id: string, name: string }[];
}

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

    public readonly state: AppState = {
        selectedId: "",
        selectedName: "",
        handleSelection: this.handleSelectionChange,
        changeNodes: this.changeNodes,
        nodes: [] // TODO: Get from API
    }

    handleSelectionChange(id: string, name: string) {
        this.setState({selectedId: id});
        this.setState({selectedName: name})
    }

    changeNodes(newNodes: { id: string, name: string }[]) {
        this.setState({nodes: newNodes})
    }

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

    render() {
        return (
            <div className={styles.gridContainer}>
                <div className={styles.headbarLeft}>
                    <button onClick={() => this.addGame("roulette")}>Add Roulette</button>
                    <button onClick={() => this.addGame("slots")}>Add Slots</button>
                </div>
                <div className={styles.headbarRight}>

                </div>

                <Sidebar handleSelection={this.handleSelectionChange} changeNodes={this.changeNodes} selectedId={this.state.selectedId} selectedName={this.state.selectedName} nodes={this.state.nodes}/>
                <MainView handleSelection={this.handleSelectionChange} changeNodes={this.changeNodes} selectedId={this.state.selectedId} selectedName={this.state.selectedName} nodes={this.state.nodes}/>

                <div className={styles.footerRight}>

                </div>
                <div className={styles.footerLeft}>

                </div>
            </div>
        );
    }
}