import React from 'react';
import { distanceInWords } from 'date-fns';

import { Block } from '../../types/Block';
import { TransactionView } from './TransactionView';

import '../../styles/block.css';

export class BlockItem extends React.Component<{ block: Block }, { isExpanded: boolean }> {
    componentDidMount() {
        console.log(this.props.block);
    }

    timestampString(time: number) {
        return distanceInWords(time, new Date());
    }

    isMined(hash: string) {
        return hash.substring(0,5) === '00000';
    }
    
    render() {
        if (!this.isMined(this.props.block.header.hash!)) {
            return (
                <div className="block fade-in unmined">
                    <p className="title">Block <span className="unmined-label">(not mined)</span></p>
                    <div className="meta">
                        <span className="hash" title={this.props.block.header.hash!}>{this.props.block.header.hash!.substring(0, 32)}</span>
                    </div>

                    <TransactionView transactions={this.props.block.body.transactions} />
                </div>
            );
        }

        return (
            <div className="block fade-in">
                <p className="title">Block</p>
                <div className="meta">
                    <span className="hash" title={this.props.block.header.hash!}>{this.props.block.header.hash!.substring(0, 32)}</span>
                    <span className="timestamp">{ this.timestampString(this.props.block.header.time) } ago</span>
                </div>
                <TransactionView transactions={this.props.block.body.transactions} />
            </div>
        );
    }
}