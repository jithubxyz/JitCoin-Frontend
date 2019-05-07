import React from 'react';
import { Wrapper } from '../shared';
import { v4 } from 'uuid';

import '../../styles/tracker.css';

export class Connections extends React.Component<{}, { currentId: string | null; currentInterval: number | null, clients: any[] }> {
    constructor(props: any) {
        super(props);

        this.state = { currentId: v4(), currentInterval: null, clients: [] };
    }

    sendHeartbeat = async () => {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        const response = await fetch(`http://jitcoindemo.tsuru.xyz/clients`, { method: 'PUT', mode: 'cors', body: JSON.stringify({ id: this.state.currentId }), headers });
    }

    componentDidMount = async () => {
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        const response = await fetch(`http://jitcoindemo.tsuru.xyz/clients`, { method: 'POST', mode: 'cors', body: JSON.stringify({ walletId: this.state.currentId }), headers })
    
        this.setState({ currentInterval: setInterval(this.sendHeartbeat, 5000)})

        const { clients } = await fetch(`http://jitcoindemo.tsuru.xyz/clients`, { method: 'GET', mode: 'cors' }).then(r => r.json())
        this.setState({ clients: clients.reverse() });
    }

    componentWillUnmount = async () => {
        if (this.state.currentInterval) {
            clearInterval(this.state.currentInterval);
        }
    }

    public render() {
        return (
            <Wrapper className="fade-in">
                <h1>Connections</h1>
                <p>Your current ID: {this.state.currentId}</p>

                <ul>
                    {this.state.clients.map((c, i) => (
                        <div className="tracker-client fade-in" key={i}>
                            <span className={`status ${this.state.currentId === c.walletId ? 'status-blue' : 'status-green'}`} title={`${this.state.currentId === c.walletId ? 'you' : 'other user'}`}>&nbsp;</span>
                            <span className="client-id">{c.walletId}</span>
                        </div>
                    ))}
                </ul>
            </Wrapper>
        );
    }
}