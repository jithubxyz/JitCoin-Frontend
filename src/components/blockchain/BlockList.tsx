import React from 'react';
import { LoadingIndicator } from '../shared';
import { getLastBlock, getAllBlocks } from '../../api/endpoints';

export class BlockList extends React.Component<{}, { blocks: Array<any> | null }> {
    constructor(props: any) {
        super(props);

        this.state = { blocks: null };
    }

    async componentDidMount() {
        const last = await getLastBlock();
        
        if (!last) {
            return;
        }

        this.setState({ blocks: [last] });

        const more = await getAllBlocks(last);

        this.setState({ blocks: more });
    }
    render() {
        if (this.state.blocks === null) {
            return <LoadingIndicator />
        }

        if (this.state.blocks.length > 0) {
            return <div>{this.state.blocks[0].header.hash}</div>
        }
    }
}