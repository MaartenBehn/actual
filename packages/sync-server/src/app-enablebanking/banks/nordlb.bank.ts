import { components } from '../models/enablebanking-openapi.js';
import { Transaction } from '../models/enablebanking.js';

import { BankProcessorFor } from './bank-registry.js';
import { FallbackBankProcessor } from './fallback.bank.js';
import { isKeyValueCache } from './utils.js';

@BankProcessorFor(['DE_NORD/LB'])
export class NordLBBankProcessor extends FallbackBankProcessor {
  name = 'NordLBBankProcessor';

  normalizeTransaction(t: components['schemas']['Transaction']): Transaction {
    const transaction = super.normalizeTransaction(t);
    return transaction;
  }

  skipTransaction(t: Transaction): boolean {
    return super.skipTransaction(t);
  }
}
