import * as React from 'react';
let styles = require('../App.scss');

// The props for the GameComponents
export interface GameProp {
    uid: string;
    onClick: Function;
}

export default class Sidebar extends React.Component {
    // TODO: Sidebar constructor gets API data of current games in an object array
    constructor(props: any) {
        super(props);
    }

    // Click handler for each individual GameComponent
    handleClick(id: string) {
        console.log("Wowee, id="+ id);
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

class GameComponent extends React.Component<GameProp> {
    render() {
        return (
            <button className={styles.GameComponent} onClick={() => this.props.onClick()}>
                ID={this.props.uid}
            </button>
        );
    }
}