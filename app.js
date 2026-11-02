'use strict';
(function () {
  const data = Array.isArray(globalThis.INDIE_DATA) ? globalThis.INDIE_DATA : [];
  const byId = new Map(data.map(place => [place.id, place]));
  const search = document.getElementById('search');
  const category = document.getElementById('category');
  const sourceFilter = document.getElementById('sourceFilter');
  const count = document.getElementById('count');
  const totalCount = document.getElementById('totalCount');
  const list = document.getElementById('list');
  const empty = document.getElementById('empty');
  const dialog = document.getElementById('detail');
  const detailBody = document.getElementById('detailBody');

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const hasSource = place => typeof place.sourceUrl === 'string' && /^https:\/\//i.test(place.sourceUrl);
  const safeLink = url => { try { const value = new URL(url); return value.protocol === 'https:' ? value.href : ''; } catch { return ''; } };
  const mapsLink = place => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place.address || `${place.name}, Bishop's Stortford, UK`);
  const sourceStatus = place => hasSource(place) ? 'Public business source' : 'Source under review';

  function visiblePlaces() {
    const query = search.value.toLocaleLowerCase('en-GB').trim();
    return data.filter(place => {
      if (query && ![place.name,place.category,place.bucket,place.reason].join(' ').toLocaleLowerCase('en-GB').includes(query)) return false;
      if (category.value && place.bucket !== category.value) return false;
      if (sourceFilter.value === 'sourced' && !hasSource(place)) return false;
      if (sourceFilter.value === 'review' && hasSource(place)) return false;
      return true;
    });
  }

  function render() {
    const items = visiblePlaces();
    count.textContent = `${items.length} of ${data.length} places shown`;
    totalCount.textContent = `${data.length} local businesses to explore`;
    empty.hidden = items.length !== 0;
    list.innerHTML = items.map(place => `
      <button class="place-card" type="button" data-business-id="${Number(place.id)}" aria-label="Read about ${escapeHtml(place.name)}">
        <span class="card-category">${escapeHtml(place.bucket)} &middot; ${escapeHtml(place.category)}</span>
        <span class="card-title">${escapeHtml(place.name)}</span>
        <span class="card-summary">${escapeHtml(place.reason)}</span>
        <span class="card-bottom"><span class="source-label ${hasSource(place) ? 'sourced' : ''}">${sourceStatus(place)}</span><span class="more">View details &rarr;</span></span>
      </button>`).join('');
  }

  function openDetails(id) {
    const place = byId.get(id);
    if (!place) return;
    const source = hasSource(place) ? safeLink(place.sourceUrl) : '';
    detailBody.innerHTML = `
      <h2 id="detailTitle">${escapeHtml(place.name)}</h2>
      <p class="category-line">${escapeHtml(place.category)} &middot; ${escapeHtml(place.bucket)}</p>
      <span class="source-label ${source ? 'sourced' : ''}">${sourceStatus(place)}</span>
      <div class="story"><h3>About this place</h3><p>${escapeHtml(place.reason)}</p></div>
      <dl>
        <div><dt>Independent ownership</dt><dd>Not yet independently verified</dd></div>
        <div><dt>Business information</dt><dd>${source ? `Public source checked ${escapeHtml(place.checkedAt || 'recently')}` : 'Being researched'}</dd></div>
        ${place.address ? `<div><dt>Reported address</dt><dd>${escapeHtml(place.address)}</dd></div>` : ''}
        <div><dt>Research note</dt><dd>${source ? 'A public source confirms the listing details, not necessarily its ownership.' : 'We are still gathering public evidence.'}</dd></div>
      </dl>
      <div class="actions">
        <a class="action" target="_blank" rel="noopener noreferrer" href="${escapeHtml(mapsLink(place))}">Find on Google Maps</a>
        ${source ? `<a class="action secondary" target="_blank" rel="noopener noreferrer" href="${escapeHtml(source)}">View source</a>` : ''}
      </div>
      <p class="note">Please check details with the business before travelling. Found an error? <a href="https://github.com/danielproduct/indie-stortford-poc-v1/issues/new" target="_blank" rel="noopener noreferrer">Suggest a correction</a>.</p>`;
    dialog.showModal();
  }

  function reset() { search.value = ''; category.value = ''; sourceFilter.value = ''; render(); search.focus(); }
  list.addEventListener('click', event => { const card = event.target.closest('[data-business-id]'); if (card) openDetails(Number(card.dataset.businessId)); });
  document.getElementById('closeDetail').addEventListener('click', () => dialog.close());
  document.getElementById('reset').addEventListener('click', reset);
  document.getElementById('emptyReset').addEventListener('click', reset);
  [search, category, sourceFilter].forEach(control => control.addEventListener('input', render));
  render();
})();