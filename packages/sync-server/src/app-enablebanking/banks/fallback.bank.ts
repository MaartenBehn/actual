import { BankProcessor } from '../models/bank-processor.js';
import { components } from '../models/enablebanking-openapi.js';
import { Transaction } from '../models/enablebanking.js';

export class FallbackBankProcessor implements BankProcessor {
  debug = true;
  name = 'FallbackBankProcessor';

  normalizeTransaction(t: components['schemas']['Transaction']): Transaction {
    const isDebtor = t.credit_debit_indicator === 'DBIT';

    const payeeObject = isDebtor ? t.creditor : t.debtor;

    const payeeName = payeeObject && payeeObject.name ? payeeObject.name : '';

    const booked = t.status == "BOOK";

    return {
      ...t,
      payeeObject,
      amount: parseFloat(t.transaction_amount.amount) * (isDebtor ? -1 : 1),
      payeeName,
      notes: t.remittance_information ? t.remittance_information.join('') : '',
      date: t.transaction_date ?? t.booking_date ?? t.value_date ?? '',
      booked,
    };
  }

  skipTransaction(t: Transaction): boolean {

    // Sometimes a Bank return transactions with a value of zero.
    // Usually these are payroll accounting transactions
    // where the return is less then one cent.
    // The client cant handle transactions with a value of zero so we have to filter them out.
    return t.amount == 0;
  }
}
