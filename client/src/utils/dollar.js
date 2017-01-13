export default function dollar(amount) {
    if (!amount) { return amount; }
    return Number.parseFloat(amount).toLocaleString('en', { style: 'currency', currency: 'USD'});
}