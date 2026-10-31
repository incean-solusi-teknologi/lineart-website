import assert from 'node:assert/strict';
import { products } from '../src/data';
import { calculateQuote, type QuoteOptions } from '../src/features/product/utils/calculateQuote';
const product = products.find((item) => item.slug === 'gift-box-double-door')!;
const options: QuoteOptions = {
  quantity: 100,
  size: 'standard',
  dimensions: [],
  material: 0,
  finish: 0,
  insert: 0,
};
assert.deepEqual(calculateQuote(product, options), {
  valid: true,
  custom: false,
  quantity: 100,
  unit: 45000,
  total: 4500000,
});
for (const quantity of [99, 100.5, 100001, NaN])
  assert.equal(calculateQuote(product, { ...options, quantity }).valid, false);
assert.equal(calculateQuote(product, { ...options, material: 999 }).valid, false);
assert.equal(calculateQuote(product, { ...options, finish: 0.5 }).valid, false);
assert.equal(calculateQuote(product, { ...options, size: 'invalid' }).valid, false);
assert.deepEqual(calculateQuote(product, { ...options, size: 'large', finish: 2 }), {
  valid: true,
  custom: false,
  quantity: 100,
  unit: 63500,
  total: 6350000,
});
assert.deepEqual(calculateQuote(product, { ...options, quantity: 500 }), {
  valid: true,
  custom: false,
  quantity: 500,
  unit: 38500,
  total: 19250000,
});
assert.equal(
  calculateQuote(product, { ...options, size: 'custom', dimensions: [30, 20, 10] }).valid,
  true,
);
for (const dimensions of [
  [30, NaN, 10],
  [30, 201, 10],
  [30, 20],
  [0, 20, 10],
])
  assert.equal(calculateQuote(product, { ...options, size: 'custom', dimensions }).valid, false);
const calendar = products.find((item) => item.slug === 'kalender-meja-mini')!;
assert.equal(
  calculateQuote(calendar, { ...options, quantity: 200, size: 'custom', dimensions: [21, 15] })
    .valid,
  true,
);
console.log(
  'Quote checks passed: pricing, discounts, invalid options, quantity limits, custom dimensions.',
);
