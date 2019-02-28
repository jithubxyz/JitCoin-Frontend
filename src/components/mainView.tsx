import * as React from 'react';
let styles = require('../App.scss');

export interface MainViewProps {
    selected?: string;
}

export default class MainView extends React.Component<MainViewProps> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return(
            <div className={styles.main}>
                Selected game: {this.props.selected}
            </div>
        );
    }
}