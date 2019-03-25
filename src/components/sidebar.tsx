import * as React from 'react';
import App, { AppState, SelectionProps } from "../App";
let styles = require('../App.scss');

export default class Sidebar extends React.Component<AppState> {
    // TODO: Sidebar constructor gets API data of current games in an object array
    constructor(props: any) {
        super(props);
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleSelection(e: any) {
        this.props.handleSelectionChange(e.target.value)
    }

    handleClick(id: string) {
        console.log("Wowee, id="+ id);
        this.setState({selected: id});
        this.handleSelection(id);
    }

    // Adds a new GameComponent, TODO: generated from this.props
    addGameComponent(id: string) {
        return (
            <GameComponent 
                uid={id}
                onClick={() => this.handleClick(id)}
            />
        );
    }

    render() {
        return (
            <div className={styles.sidebar}>
                {this.addGameComponent("test")}
            </div>
        );
    }
}

class GameComponent extends React.Component<SelectionProps> {
    render() {
        return (
            <button className={styles.GameComponent} onClick={() => this.props.onClick()}>
                ID={this.props.uid}
            </button>
        );
    }
}