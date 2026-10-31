// Demo-only prices. Replace the data with the business's approved pricing before launch.
function calculateQuote(product, options) {
  const quantity = Number(options.quantity);
  if (!Number.isInteger(quantity) || quantity < product.moq || quantity > 100000) {
    return { valid: false, error: `Minimum ${product.moq} pcs, maksimum 100.000 pcs.` };
  }
  if (options.size === 'custom') {
    const dimensions = options.dimensions || [];
    const expected = product.kind === 'calendar' ? 2 : 3;
    if (dimensions.length !== expected || dimensions.some(value => !Number.isFinite(Number(value)) || Number(value) < 1 || Number(value) > 200)) {
      return { valid: false, error: 'Isi setiap ukuran custom antara 1–200 cm.' };
    }
    return { valid: true, custom: true, quantity, unit: null, total: null };
  }
  const factor = { small: 0.8, standard: 1, large: 1.3 }[options.size];
  if (factor === undefined) return { valid: false, error: 'Pilih ukuran yang tersedia.' };
  const adjustments = [options.material, options.finish, options.insert].map(Number);
  if (adjustments.some(value => !Number.isFinite(value) || value < 0)) return { valid: false, error: 'Spesifikasi belum lengkap.' };
  const discount = quantity >= 500 ? 0.85 : quantity >= 250 ? 0.92 : 1;
  const unit = Math.round((product.price * factor + adjustments.reduce((a, b) => a + b, 0)) * discount / 500) * 500;
  return { valid: true, custom: false, quantity, unit, total: unit * quantity };
}
if (typeof module !== 'undefined') module.exports = { calculateQuote };
if (typeof document !== 'undefined') {
  const catalogMenu = document.querySelector('.catalog-menu');
  if (catalogMenu) {
    let openedOnHover = false;
    catalogMenu.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') {
        openedOnHover = !catalogMenu.open;
        catalogMenu.open = true;
      }
    });
    catalogMenu.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse') {
        openedOnHover = false;
        catalogMenu.open = false;
      }
    });
    catalogMenu.querySelector('summary').addEventListener('click', event => {
      // A mouse click immediately after hovering should keep the menu open.
      if (event.pointerType === 'mouse' && openedOnHover) event.preventDefault();
      openedOnHover = false;
    });
    catalogMenu.addEventListener('focusout', event => {
      if (!catalogMenu.contains(event.relatedTarget)) catalogMenu.open = false;
    });
    catalogMenu.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        catalogMenu.open = false;
        catalogMenu.querySelector('summary').focus();
      }
    });
    document.addEventListener('click', event => {
      if (!catalogMenu.contains(event.target)) catalogMenu.open = false;
    });
  }

  const formatRupiah = value => 'Rp ' + new Intl.NumberFormat('id-ID').format(value);
  const configuration = document.getElementById('product-configuration');
  if (configuration) {
    const product = JSON.parse(document.getElementById('product-data').textContent);
    const form = document.getElementById('configuration-form');
    const sizeText = () => {
      const size = form.elements.size.value;
      if (size !== 'custom') return form.querySelector('input[name="size"]:checked').dataset.label;
      return 'Custom ' + [...form.querySelectorAll('[data-dimension]')].map(input => input.value).join(' × ') + ' cm';
    };
    const selectedText = name => {
      const element = form.elements[name];
      if (element.tagName === 'SELECT') return element.selectedOptions[0].textContent;
      return form.querySelector(`input[name="${name}"]:checked`).dataset.label;
    };
    function updateConfiguration() {
      const options = {
        quantity: form.elements.quantity.value,
        size: form.elements.size.value,
        dimensions: [...form.querySelectorAll('[data-dimension]')].map(input => input.value),
        material: form.elements.material.value,
        finish: form.elements.finish.value,
        insert: form.elements.insert.value,
      };
      form.querySelector('.custom-dimensions').hidden = options.size !== 'custom';
      form.querySelectorAll('[data-dimension]').forEach(input => input.disabled = options.size !== 'custom');
      const quote = calculateQuote(product, options);
      const error = document.getElementById('configuration-error');
      const action = document.getElementById('request-quote');
      error.textContent = quote.valid ? '' : quote.error;
      error.hidden = quote.valid;
      action.disabled = !quote.valid;
      document.getElementById('summary-size').textContent = sizeText();
      document.getElementById('summary-quantity').textContent = options.quantity + ' pcs';
      document.getElementById('summary-unit').textContent = quote.valid ? (quote.custom ? 'Minta penawaran' : formatRupiah(quote.unit)) : '—';
      document.getElementById('summary-total').textContent = quote.valid ? (quote.custom ? 'Minta penawaran' : formatRupiah(quote.total)) : '—';
      document.getElementById('selected-color').textContent = selectedText('color');
    }
    form.addEventListener('input', updateConfiguration);
    form.addEventListener('change', updateConfiguration);
    form.querySelectorAll('[data-quantity]').forEach(button => button.addEventListener('click', () => {
      form.elements.quantity.value = button.dataset.quantity;
      updateConfiguration();
    }));
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (document.getElementById('request-quote').disabled) return;
      const message = [
        `Halo LINE · Art media, saya ingin konsultasi ${product.name}.`,
        `Ukuran: ${sizeText()}`,
        `Bahan: ${selectedText('material')}`,
        `Finishing: ${selectedText('finish')}`,
        `${product.kind === 'calendar' ? 'Isi kalender' : 'Insert'}: ${selectedText('insert')}`,
        `Warna: ${selectedText('color')}`,
        `Jumlah: ${form.elements.quantity.value} pcs`,
        '',
        'Mohon informasi harga final dan jadwal produksinya.',
      ].join('\n');
      // No business number provided yet: a local preview keeps every selection reviewable.
      location.href = 'kontak-umum-v5.html?pesan=' + encodeURIComponent(message) + '&kembali=' + encodeURIComponent(location.pathname.split('/').pop());
    });
    updateConfiguration();
  }
  const frame = document.querySelector('.zoom-frame');
  if (frame) {
    frame.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;
      const bounds = frame.getBoundingClientRect();
      frame.style.setProperty('--zx', ((event.clientX - bounds.left) / bounds.width * 100) + '%');
      frame.style.setProperty('--zy', ((event.clientY - bounds.top) / bounds.height * 100) + '%');
    });
    frame.addEventListener('pointerleave', () => {
      frame.style.removeProperty('--zx');
      frame.style.removeProperty('--zy');
    });
    const zoomButton = document.getElementById('zoom-toggle');
    zoomButton.addEventListener('click', () => {
      const zoomed = frame.classList.toggle('is-zoomed');
      zoomButton.setAttribute('aria-pressed', String(zoomed));
      zoomButton.textContent = zoomed ? 'Kecilkan foto' : 'Perbesar foto';
    });
    document.querySelectorAll('[data-gallery-image]').forEach(button => button.addEventListener('click', () => {
      document.getElementById('main-photo').src = button.dataset.galleryImage;
      document.querySelectorAll('[data-gallery-image]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      frame.classList.remove('is-zoomed');
      zoomButton.setAttribute('aria-pressed', 'false');
      zoomButton.textContent = 'Perbesar foto';
    }));
  }
  const cards = [...document.querySelectorAll('.searchable')];
  const search = document.getElementById('category-search');
  if (search) {
    function filterProducts() {
      const query = search.value.toLocaleLowerCase('id-ID').trim();
      let count = 0;
      cards.forEach(card => {
        card.hidden = !card.dataset.name.includes(query);
        if (!card.hidden) count++;
      });
      document.getElementById('product-count').textContent = count + ' produk';
      document.getElementById('no-products').hidden = count > 0;
    }
    search.value = new URLSearchParams(location.search).get('q') || '';
    search.addEventListener('input', filterProducts);
    filterProducts();
  }
  const sort = document.getElementById('catalog-sort');
  if (sort) sort.addEventListener('change', () => {
    const grid = document.querySelector('.catalog-grid');
    const sorted = [...cards].sort((a, b) => sort.value === 'price' ? Number(a.dataset.price) - Number(b.dataset.price) : Number(a.dataset.order) - Number(b.dataset.order));
    sorted.forEach(card => grid.append(card));
  });
  const preview = document.getElementById('wa-message');
  if (preview) {
    const parameters = new URLSearchParams(location.search);
    preview.value = parameters.get('pesan') || 'Halo LINE · Art media, saya ingin konsultasi packaging custom.';
    const back = parameters.get('kembali');
    if (back && /^produk-[a-z0-9-]+-v5\.html$/.test(back)) document.getElementById('back-to-product').href = back;
    document.getElementById('copy-message').addEventListener('click', async event => {
      try {
        await navigator.clipboard.writeText(preview.value);
        event.target.textContent = 'Pesan tersalin';
      } catch {
        preview.focus();
        preview.select();
        document.getElementById('copy-status').textContent = 'Pilih dan salin pesan di atas.';
      }
    });
  }
}
