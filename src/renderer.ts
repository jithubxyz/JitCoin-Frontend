// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
import * as electron from "electron";
import {remote} from "electron";
import {Toggleable} from "./components/test-component";

const app = remote.app;
const BrowserWindow = remote.BrowserWindow;
const dialog = remote.dialog;


const toggleable = new Toggleable();
toggleable.title = "test";

function hello() {
    const options: Electron.MessageBoxOptions = {
        buttons: ["OK", "Cancel"],
        detail: "Hello",
        message: "Message",
        title: "Dialogue Title",
        type: "info",
    };
    const win = BrowserWindow.getFocusedWindow();
    dialog.showMessageBox(win, options);
}

document.getElementById("btnShowHello").onclick = hello;
