import React from 'react';
import { distanceInWords } from 'date-fns';

import { Block } from '../../types/Block';

import '../../styles/transaction.css';

export class TransactionView extends React.Component<{ transactions: any[] }, { isExpanded: boolean }> {
    constructor(props: any) {
        super(props);

        this.expandTransactions = this.expandTransactions.bind(this);
        this.collapseTransactions = this.collapseTransactions.bind(this);

        this.state = { isExpanded: false };
    }

    timestampString(time: number) {
        return distanceInWords(time, new Date());
    }

    expandTransactions() {
        this.setState({ isExpanded: true });
    }

    collapseTransactions() {
        this.setState({ isExpanded: false });
    }
    
    render() {
        if (!this.state.isExpanded) {
            return (
                <div className="transactions">
                    <a className="show" onClick={(e) => this.expandTransactions()}>Show Transactions</a>
                </div>
            );
        }
        
        return (
            <div className="transactions">
                <p className="title">Transactions <span className="collapse" onClick={(e) => this.collapseTransactions()}>(collapse)</span></p>
                {this.props.transactions.map((t, i) => (
                    <div key={i} className="transaction fade-in meta">
                        <span className="item">{i}</span>
                        <span className="hash" title={t.randomHash}>{t.randomHash.substring(0,64)}</span>
                    </div>
                ))}
            </div>
        );
    }
}