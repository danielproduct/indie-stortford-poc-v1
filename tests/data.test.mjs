import test from 'node:test';
import assert from 'node:assert/strict';
import '../data.js';

const entries = globalThis.INDIE_DATA;

test('all 41 research listings have unique numeric ids', () => {
  assert.ok(Array.isArray(entries));
  assert.equal(entries.length, 41);
  assert.equal(new Set(entries.map(p => p.id)).size, entries.length);
  for (const item of entries) assert.ok(Number.isInteger(item.id) && item.id > 0);
});

test('listing fields are usable, and ownership is not falsely described as verified', () => {
  const allowed = new Set(['Food & Drink', 'Shops & Services', 'Health & Beauty', 'Home & Gifts', 'Things to Do']);
  for (const p of entries) {
    assert.ok(typeof p.name === 'string' && p.name.trim(), p.id);
    assert.ok(typeof p.category === 'string' && p.category.trim(), p.name);
    assert.ok(allowed.has(p.bucket), p.name);
    assert.ok(typeof p.reason === 'string' && p.reason.trim(), p.name);
    assert.equal(p.verification, 'Under review', p.name);
  }
});

test('corrected business names appear', () => {
  for (const name of ['Stock Florist', 'Paisà Wine Bar', 'Olyra Greek Bakehouse', "The Gent's Barber Club"]) {
    assert.ok(entries.some(p => p.name === name), name);
  }
  for (const bad of ['Stok Florist', 'Paise Wine Bar', 'Onlyra Greek Bakehouse']) {
    assert.ok(!entries.some(p => p.name === bad), bad);
  }
});

test('confirmed barber identity is separate from independent ownership', () => {
  const barber = entries.find(p => p.id === 41);
  assert.ok(barber);
  assert.equal(barber.name, "The Gent's Barber Club");
  assert.equal(barber.listingIdentityConfirmed, true);
  assert.equal(barber.verification, 'Under review');
  assert.match(barber.address, /Bells Hill/);
  assert.match(barber.category, /Barber/);
});

test('public source links use https and record review dates', () => {
  const sourced = entries.filter(p => p.sourceUrl);
  assert.ok(sourced.length >= 4);
  for (const p of sourced) {
    const u = new URL(p.sourceUrl);
    assert.equal(u.protocol, 'https:');
    assert.ok(typeof p.checkedAt === 'string' && p.checkedAt, p.name);
    assert.ok(typeof p.address === 'string' && p.address, p.name);
  }
});
