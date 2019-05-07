import * as React from 'react';
import Popup from 'reactjs-popup';

// Start IpcRenderer import
import { IpcRenderer } from 'electron';
declare global {
  interface Window {
    ipcRenderer: IpcRenderer
  }
}

export const { ipcRenderer } = window;
// End IpcRenderer import

function sendRequest() {
    window.ipcRenderer.send('walletRequest')
}

function updateInputValue(evt: any) {
    // TODO send input value from form to userModalState (not implemented yet) 
    //so sendRequest can get it's content from there
}

// State needed for updating/getting the input form content
export type UserModalState = {
    input: string;
}

// Popup Style Overwriting
const contentStyle = {
    maxWidth: "300px",
    width: "90%",
    height: "500px"
};

export default () => (
    <Popup trigger={<button className="button modalButton"></button>} contentStyle={contentStyle} modal>
        {close => (
            <div className="modal">
                <a className="close" onClick={close}>&times;</a>
                <div className="header"> Register / Login </div>
                <div className="content">
                    {' '}
                    <p>
                        You can login into an existing user account with your passphrase or
                        create a new user. Since the users in the Blockchain are anonymous,
                        no username/email is required. The passphrase you choose functions as
                        your private wallet key, so don't share it with anyone.
                    </p>
                    <div className="form">
                        <input placeholder="Passphrase" type="password" id="pw" onChange={evt => updateInputValue(evt)}/>
                        <Popup
                            trigger={<button className="button" onClick={() => sendRequest()}> Register </button>}
                            position="bottom right"
                            on="hover"
                            closeOnDocumentClick
                        >
                            <span>
                                Registers a new user
                        </span>
                        </Popup>
                        <Popup
                            trigger={<button className="button"> Login </button>}
                            position="bottom right"
                            on="hover"
                            closeOnDocumentClick
                        >
                            <span>
                                Login into your account
                            </span>
                        </Popup>
                    </div>
                </div>
            </div>
        )}
    </Popup>
)