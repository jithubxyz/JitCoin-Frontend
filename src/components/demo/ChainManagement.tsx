import React, { useState } from 'react';
import { placeBet, mineBlock } from '../../api/endpoints';
import { Error, Wrapper, ActionWrapper, ActionButton } from '../shared';
import styled from 'styled-components'



const Header = styled.h1``;

export const ChainManagement: React.FunctionComponent<any> = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    return (
        <Wrapper className="fade-in">
            <Header>Chain Management</Header>
            <ActionWrapper>
                <ActionButton disabled={loading} onClick={() => {
                    setLoading(true);
                    placeBet(10, 8).then(r => {
                        setSuccessMessage(r);
                        setLoading(false);
                    }).catch(e => {
                        setLoading(false);
                        setErrorMessage(e.message);
                    });
                }}>Add Transaction</ActionButton>
                <ActionButton disabled={loading} onClick={() => {
                    setLoading(true);
                    mineBlock().then(r => {
                        setLoading(false);
                        setSuccessMessage(r);
                    }).catch(e => {
                        setLoading(false);
                        setErrorMessage(e.message);
                    })
                }}>Mine Block</ActionButton>
            </ActionWrapper>
            {errorMessage ? (
                <Error message={errorMessage} />
            ): null}
        </Wrapper>
    )
}