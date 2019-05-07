import React, { ChangeEvent } from 'react';
import { LoadingIndicator, Error, ActionWrapper, ActionButton, Wrapper } from '../shared';
import { getLastBlock, getAllBlocks, createWallet, unlockWallet } from '../../api/endpoints';
import '../../styles/wallet.css';
import styled from 'styled-components';

const WalletWrapper = styled.div`
    padding: 10px;
    border: 2px solid #6b0000;
    background: rgba(128, 60, 0, 0.29);
    border-radius: 5px;

    .big-num {
        font-size: 36px;

        .currency {
            opacity: 0.3;
        }
    }

    .last-transactions {
        border-top: 1px solid rgba(0, 0, 0, 0.25);
        
        margin-top: 5px;
        padding-top: 5px;
    }

    .last-transactions > p {
        margin-top: 0;
    }
`;

export class Wallet extends React.Component<{ onUnlock: () => void, walletUnlocked: boolean }, { isUnlocked: boolean, hasWallet: boolean, passphrase: string, pending: boolean, failed?: boolean }> {
    constructor(props: any) {
        super(props);

        this.handlePassphraseChange = this.handlePassphraseChange.bind(this);
        this.createWallet = this.createWallet.bind(this);
        this.unlockWallet = this.unlockWallet.bind(this);
        this.createOrUnlock = this.createOrUnlock.bind(this);

        this.state = { isUnlocked: this.props.walletUnlocked, hasWallet: false, passphrase: '', pending: false };
    }

    async createWallet() {
        const result = await createWallet(this.state.passphrase);

        if (!result) {
            this.setState({ isUnlocked: true, hasWallet: true, passphrase: '', pending: false });
            this.props.onUnlock();
        } else {
            this.unlockWallet();
        }
    }

    async unlockWallet() {
        const result = await unlockWallet(this.state.passphrase);

        if (!result) {
            this.setState({ isUnlocked: true, hasWallet: true, passphrase: '', pending: false });
            this.props.onUnlock();
        } else {
            this.setState({ failed: true, isUnlocked: false, hasWallet: this.state.hasWallet, pending: false, passphrase: '' });
        }
    }

    createOrUnlock() {
        this.setState({ ...this.state, pending: true });

        if (!this.state.hasWallet) {
            this.createWallet();
        }
        if (this.state.hasWallet) {
            this.unlockWallet();
        }
    }

    handlePassphraseChange(e: ChangeEvent<HTMLInputElement>) {
        const newValue = e.target.value;

        this.setState({ ...this.state, passphrase: newValue });
    }
    
    render() {
        if (this.state.pending) {
            return <LoadingIndicator />
        }
        if (!this.state.isUnlocked) {
            return (
                <Wrapper className="wallet-form fade-in">
                    <h1>Wallet</h1>
                    { !this.state.hasWallet && 
                        <p>You've freshly started JitCoin or no wallet has been created yet. Enter a passphrase to create a new wallet (or unlock your current wallet).</p>
                    }
                    {
                        this.state.hasWallet && 
                        <p>Enter your passphrase to unlock your wallet</p>
                    }

                    {
                        this.state.failed &&
                        <Error message="Could not unlock wallet. Is the passphrase correct?" />
                    }

                    <div className="wallet-input">
                        <input type="text" value={this.state.passphrase} onChange={this.handlePassphraseChange} />
                        <ActionWrapper>
                            <ActionButton disabled={this.state.passphrase.length === 0} onClick={() => {
                                this.createOrUnlock()
                            }}>Submit</ActionButton>
                        </ActionWrapper>
                    </div>
                </Wrapper>
            );
        }

        return (
            <Wrapper>
                <h1>Wallet</h1>
                <WalletWrapper className="fade-in">
                    <div className="balance">
                        <div className="big-num">
                            0   <span className="currency">JTC</span>
                        </div>
                    </div>
                </WalletWrapper>
            </Wrapper>
        );
    }
}