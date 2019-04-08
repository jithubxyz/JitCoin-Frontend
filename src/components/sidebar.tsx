import * as React from 'react';
import App, { AppState, SelectionProps } from "../App";
import ReactDOM from 'react-dom';
let styles = require('../App.scss');

export default class Sidebar extends React.Component<AppState> {
    handleSelection = (id: string, name: string) => {
        this.props.handleSelection(id, name)
    }

    handleClick = (id: string,name: string) => {
        console.log("Wowee, id="+ id);
        this.setState({selected: id});
        this.handleSelection(id, name);
    }

    handleDelete = (id: string) => {
        var oldNodes = this.props.nodes;
        // TODO: Change forEach to normal for loop to allow break condition if id is found
        oldNodes.forEach((object,index) => {
            if (object.id == id) {
                oldNodes.splice(index,1);
            }
        });
        var newNodes = oldNodes;
        this.props.changeNodes(newNodes);
    }

    render() {
        return (
            <div className={styles.sidebar}>
                {
                this.props.nodes.map((node) => (
                    <GameComponent
                        key={node.id}
                        uid={node.id} 
                        name={node.name}
                        onSelect={() => this.handleClick(node.id, node.name)}
                        onDelete={() => this.handleDelete(node.id)}
                    >
                    </GameComponent>
                ))
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
                    Select
                </button>
                <button className={styles.TODO} onClick={() => this.props.onDelete()}>
                    Delete
                </button>
            </React.Fragment>
        );
    }
}