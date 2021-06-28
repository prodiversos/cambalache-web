export class Formatter {
  constructor() {
    this.locale = 'es-MX';
    this.currency = new Intl.NumberFormat(this.locale, { style: 'currency', currency: 'MXN' });
  }

  formatCurrency(value) {
    return this.currency.format(value);
  }

  formatDate(value) {
    if (!value) {
      return;
    }

    if (!(value instanceof Date)) {
      value = new Date(value);
    }
    return `${value.toLocaleDateString()}, ${value.toLocaleTimeString()}`;
  }
}

export default new Formatter();
