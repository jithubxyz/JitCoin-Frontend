import React from 'react';
import { LoadingIndicator, Error } from '../shared';
import { getLastBlock, getAllBlocks } from '../../api/endpoints';
import { BlockList } from './BlockList';
import '../../styles/switcher.css';
import { Wallet } from './Wallet';
import {ChainManagement} from './ChainManagement';
import {Connections} from './Connections';
import styled from 'styled-components';

const SwitcherLink = styled.a`
color: black;
    &.active {
        color: blue;
    }
`;

export class Switcher extends React.Component<{}, { selectedSection: string, walletUnlocked: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = { selectedSection: 'blockList', walletUnlocked: false };
        this.switchSection.bind(this);
    }

    switchSection(sectionName: string) {
        this.setState({ selectedSection: sectionName });
    }

    render() {
        const { selectedSection, walletUnlocked } = this.state;
        return (
            <div className="demo-switcher">
                <div className="switcher-items">
                    <SwitcherLink className={selectedSection === 'blockList' ? 'active' : ''} onClick={(e) => this.switchSection('blockList')}>Block List</SwitcherLink>
                    <SwitcherLink className={selectedSection === 'wallet' ? 'active' : ''} onClick={(e) => this.switchSection('wallet')}>Wallet</SwitcherLink>
                    {walletUnlocked ? <SwitcherLink className={selectedSection === 'management' ? 'active' : ''} onClick={(e) => this.switchSection('management')}>Chain Management</SwitcherLink> : null}
                    {walletUnlocked ? <SwitcherLink className={selectedSection === 'connections' ? 'active' : ''} onClick={(e) => this.switchSection('connections')}>Connections (P2P)</SwitcherLink> : null}
                </div>
                <div className="switcher-container">
                    {
                        selectedSection === 'blockList' &&
                        <BlockList />
                    }

                    {
                        selectedSection === 'wallet' &&
                        <Wallet walletUnlocked={walletUnlocked} onUnlock={() => this.setState({ walletUnlocked: true })} />
                    }

                    {
                        selectedSection === 'management' && walletUnlocked ? <ChainManagement/> : null
                    }

                    {
                        selectedSection === 'connections' && walletUnlocked ? <Connections/> : null
                    }
                </div>
            </div>
        );
    }
}