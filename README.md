This is the frontend for JitCoin, made with [React](https://reactjs.org/) and [Electron](https://electronjs.org/), written in TypeScript

It currently consists of a blockchain "explorer" with the ability to view, add, and mine the blocks in the JitCoin blockchain.

This also contains currently unused code & designs created in context of the end goal, a casino application based on blockchain verification. This is currently not implemented, resulting in nothing to see in this original frontend and it therefore being inactive on the master branch.

## Installation

### Requires [NodeJS](https://nodejs.org) and [Yarn](https://yarnpkg.com/).

In the project directory, run:

#### `yarn`

This installs the necessary modules to build the app.

---

## Development / Deployment

### In order to function properly, you also have to install & run the [JitCoin Backend](https://github.com/jithubxyz/JitCoin) beforehand, since there currently is no bundled application available.
#### Depending on usage, the [Tracker](https://github.com/jithubxyz/tracker) will also be needed.

#### `yarn run dev` / `yarn dev`

Starts the development server and electron. Default is on http://localhost:3000, but this app does not work correctly without Electron, so viewing in browser gives no proper result.

The app auto-reloads on file edits and __does not have to be closed/restarted__ except on major errors or changes.

#### `yarn run build` / `yarn build`

Builds the app to be run without a development server.
Does not create an executable as of now.

## Usage
- __Create your wallet__
  - Choose a safe passphrase only you know. This initiates your wallet (and in theory grants everyone who knows the passphrase access to it).
- __Add transactions__
  - One block can hold 10 transactions, all need to be full for the block to be mined.
- __Mine block__
  - Once the block is full, it needs to be mined so a new block can be added.
  - Mining can be a lengthy process, so don't worry if it takes a while.
