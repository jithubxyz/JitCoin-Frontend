import * as React from 'react';
import Sidebar from './components/sidebar';
import MainView from './components/mainView';

let styles = require('./App.scss');

export type AppState = {
    selectedId: string;
    selectedName: string;
    handleSelection: Function;

    nodes: { id: string, name: string }[];
}

export interface SelectionProps {
    uid: string;
    name: string;
    onSelect: Function;
}


export default class App extends React.Component {
    constructor(props: any) {
        super(props);
        this.handleSelectionChange = this.handleSelectionChange.bind(this)
    }

    public readonly state: AppState = {
        selectedId: "",
        selectedName: "",
        handleSelection: this.handleSelectionChange,
        nodes: [{id: "1", name: "Eins"}, {id: "2", name: "Zwei"}] // TODO: Get from API
    }

    handleSelectionChange(id: string, name: string) {
        this.setState({selectedId: id});
        this.setState({selectedName: name})
    }

    render() {
        return (
            <div className={styles.gridContainer}>
                <div className={styles.headbarLeft}>

                </div>
                <div className={styles.headbarRight}>

                </div>

                <Sidebar handleSelection={this.handleSelectionChange} selectedId={this.state.selectedId} selectedName={this.state.selectedName} nodes={this.state.nodes}/>
                <MainView handleSelection={this.handleSelectionChange} selectedId={this.state.selectedId} selectedName={this.state.selectedName} nodes={this.state.nodes}/>

                <div className={styles.footerRight}>

                </div>
                <div className={styles.footerLeft}>

                </div>
            </div>
        );
    }
}