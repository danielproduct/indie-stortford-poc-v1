import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const app = fs.readFileSync(new URL('../app.js', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../styles.css', import.meta.url), 'utf8');

test('the actual site has no schematic map', () => {
  assert.ok(!html.includes('class="map"'));
  assert.ok(!html.includes('pin positions are schematic'));
  assert.match(html, /No made-up map pins/);
});
test('search, filtering and interactive card labels exist', () => {
  for (const id of ['search', 'category', 'sourceFilter'])
    assert.ok(html.includes('<label for="' + id + '">'), id);
  assert.match(app, /class="place-card"/);
  assert.match(app, /aria-label="Read about/);
  assert.match(html, /role="status" aria-live="polite"/);
});
test('business detail uses a native dialog and safe external links', () => {
  assert.match(html, /<dialog id="detail"/);
  assert.match(app, /dialog\.showModal\(\)/);
  assert.match(app, /escapeHtml/);
  assert.match(app, /noopener noreferrer/);
  assert.match(app, /protocol === 'https:'/);
});
test('frontend assets are static and self-hosted', () => {
  assert.match(html, /src="\.\/data\.js"/);
  assert.match(html, /src="\.\/app\.js"/);
  assert.match(html, /rel="stylesheet" href="\.\/styles\.css"/);
  assert.ok(!html.includes('fonts.googleapis.com'));
  assert.ok(!html.includes('connect.facebook.net'));
});
test('responsive and keyboard-focus treatments exist', () => {
  assert.match(css, /focus-visible/);
  assert.match(css, /@media\(max-width:650px\)/);
  assert.match(css, /prefers-reduced-motion/);
});
