import * as React from 'react';
import Popup from 'reactjs-popup';

const contentStyle = {
    maxWidth: "600px",
    width: "90%",
    height: "500px"
};

export default () => (
    <Popup trigger={<button className="button modalButton"></button>} contentStyle={contentStyle} modal>
        {close => (
            <div className="modal">
                <a className="close" onClick={close}>&times;</a>
                <div className="header"> Modal Title </div>
                <div className="content">
                    {' '}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
                    Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
                    delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
                </div>
                <div className="actions">
                    <Popup
                        trigger={<button className="button"> Trigger </button>}
                        position="top center"
                        closeOnDocumentClick
                    >
                        <span>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                            magni omnis delectus nemo, maxime molestiae dolorem numquam
                            mollitia, voluptate ea, accusamus excepturi deleniti ratione
                            sapiente! Laudantium, aperiam doloribus. Odit, aut.
                        </span>
                    </Popup>
                </div>
            </div>
        )}
    </Popup>
)