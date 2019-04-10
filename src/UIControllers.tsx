let styles = require('./App.scss');

export function getBalance() {
    var value = 40; // TODO: Get from API
    return value;
}

export function getBalanceC() {
    var value = getBalance();
    if (value >= 50) {
        return(styles.balanceG);
    } else {
        return(styles.balanceR);
    }
}