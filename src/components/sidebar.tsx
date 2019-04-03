import * as React from 'react';
import App, { AppState, SelectionProps } from "../App";
import ReactDOM from 'react-dom';
let styles = require('../App.scss');

export default class Sidebar extends React.Component<AppState> {
    // TODO: Sidebar constructor gets API data of current games in an object array
    constructor(props: any) {
        super(props);
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleSelection(id: string, name: string) {
        this.props.handleSelection(id, name)
    }

    handleClick(id: string,name: string) {
        console.log("Wowee, id="+ id);
        this.setState({selected: id});
        this.handleSelection(id, name);
    }

    render() {
        return (
            <div className={styles.sidebar}>
                {
                this.props.nodes.map((node) => {
                    <GameComponent
                        uid={node.id} 
                        name={node.name}
                        onSelect={() => this.handleClick(node.id, node.name)}>
                    </GameComponent>
                })
                }
            </div>
        );
    }
}

class GameComponent extends React.Component<SelectionProps> {
    render() {
        return (
            <React.Fragment>
                <p>Name: {this.props.name}</p>
                <button className={styles.TODO} onClick={() => this.props.onSelect()}>
                    {this.props.name}
                </button>
            </React.Fragment>
        );
    }
}