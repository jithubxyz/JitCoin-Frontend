import React from 'react';
import { LoadingIndicator, Error, Wrapper } from '../shared';
import { getLastBlock, getAllBlocks } from '../../api/endpoints';
import { Block } from '../../types/Block';
import { BlockItem } from './BlockItem';


export class BlockList extends React.Component<{}, { blocks: Array<any> | null, doneLoading: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = { blocks: null, doneLoading: false };
    }

    async componentDidMount() {
        const last = await getLastBlock();
        
        if (!last) {
            this.setState({ blocks: null, doneLoading: true });
            return;
        }

        this.setState({ blocks: [last], doneLoading: false });

        const more = await getAllBlocks(last);

        this.setState({ blocks: more, doneLoading: true });
    }
    render() {
        if (this.state.blocks === null && !this.state.doneLoading) {
            return <LoadingIndicator />
        }

        if (this.state.blocks === null && this.state.doneLoading) {
            return (
                <Wrapper>
                    <h1>Wallet</h1>
                    <Error message="No block found" />
                </Wrapper>
            );
    
        }

        if (this.state.blocks !== null && this.state.blocks.length > 0) {
            return (
                <Wrapper>
                    <h1>Blocks</h1>
                    {this.state.blocks.map((b, i)=> (
                        <BlockItem block={b} key={i} />
                    ))}
                </Wrapper>
            )
        }
    }
}