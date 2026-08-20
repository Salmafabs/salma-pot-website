// ---------- Config ----------
const WHATSAPP_NUMBER = "REPLACEPHONENUMBER"; // e.g. 447123456789 — international format, no + or spaces

// ---------- Cart state (persisted in the browser) ----------
let cart = [];
try {
  const saved = localStorage.getItem("salmapot_cart");
  if (saved) cart = JSON.parse(saved);
} catch (e) { cart = []; }

function saveCart() {
  try { localStorage.setItem("salmapot_cart", JSON.stringify(cart)); } catch (e) {}
}

function money(n) {
  return "£" + n.toFixed(n % 1 === 0 ? 0 : 2);
}

function findItem(id) {
  for (const group of MENU) {
    const found = group.items.find((i) => i.id === id);
    if (found) return found;
  }
  return null;
}

function itemMinPrice(item) {
  if (item.proteins) {
    return Math.min(...item.proteins.flatMap((p) => p.sizes.map((s) => s.price)));
  }
  return Math.min(...item.sizes.map((s) => s.price));
}

// ---------- Render product grid ----------
function renderMenu() {
  const root = document.getElementById("menuRoot");
  root.innerHTML = "";

  MENU.forEach((group) => {
    const block = document.createElement("div");
    block.className = "menu-block";

    const title = document.createElement("h3");
    title.className = "menu-block-title";
    title.textContent = group.category;
    block.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "product-grid";

    group.items.forEach((item) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "View " + item.name);

      const media = document.createElement("div");
      media.className = "product-media";
      if (item.image) {
        media.style.backgroundImage = `url('${item.image}')`;
      } else {
        media.classList.add("product-media-placeholder");
      }
      card.appendChild(media);

      const body = document.createElement("div");
      body.className = "product-body";
      const minPrice = itemMinPrice(item);
      body.innerHTML = `
        <h4 class="product-name">${item.name}</h4>
        <p class="product-from">From ${money(minPrice)}</p>
      `;
      card.appendChild(body);

      card.addEventListener("click", () => openProduct(item.id));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openProduct(item.id); }
      });

      grid.appendChild(card);
    });

    block.appendChild(grid);
    root.appendChild(block);
  });
}

// ---------- Product detail modal ----------
let activeItem = null;
let activeProteinIndex = 0;
let activeSizeIndex = 0;

function currentSizes() {
  if (activeItem.proteins) return activeItem.proteins[activeProteinIndex].sizes;
  return activeItem.sizes;
}

function openProduct(id) {
  activeItem = findItem(id);
  activeProteinIndex = 0;
  activeSizeIndex = 0;
  if (!activeItem) return;

  const modal = document.getElementById("productModal");
  const media = document.getElementById("modalMedia");
  if (activeItem.image) {
    media.style.backgroundImage = `url('${activeItem.image}')`;
    media.classList.remove("product-media-placeholder");
  } else {
    media.style.backgroundImage = "";
    media.classList.add("product-media-placeholder");
  }

  document.getElementById("modalCategory").textContent = MENU.find(g => g.items.includes(activeItem)).category;
  document.getElementById("modalName").textContent = activeItem.name;
  document.getElementById("modalDesc").textContent = activeItem.desc;

  renderProteinOptions();
  renderSizeOptions();
  updateModalPrice();

  modal.classList.add("open");
  document.body.classList.add("modal-open");
}

function renderProteinOptions() {
  const wrap = document.getElementById("modalProteins");
  const heading = document.getElementById("proteinHeading");
  wrap.innerHTML = "";

  if (!activeItem.proteins) {
    wrap.style.display = "none";
    heading.style.display = "none";
    return;
  }
  wrap.style.display = "flex";
  heading.style.display = "block";

  activeItem.proteins.forEach((protein, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "protein-btn" + (i === activeProteinIndex ? " active" : "");
    btn.innerHTML = `<span class="protein-dot"></span><span>${protein.label}</span>`;
    btn.addEventListener("click", () => {
      activeProteinIndex = i;
      activeSizeIndex = 0;
      renderProteinOptions();
      renderSizeOptions();
      updateModalPrice();
    });
    wrap.appendChild(btn);
  });
}

function renderSizeOptions() {
  const wrap = document.getElementById("modalSizes");
  wrap.innerHTML = "";
  currentSizes().forEach((size, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "size-btn" + (i === activeSizeIndex ? " active" : "");
    btn.innerHTML = `<span class="size-label">${size.label}</span><span class="size-price">${money(size.price)}</span>`;
    btn.addEventListener("click", () => {
      activeSizeIndex = i;
      renderSizeOptions();
      updateModalPrice();
    });
    wrap.appendChild(btn);
  });
}

function updateModalPrice() {
  const size = currentSizes()[activeSizeIndex];
  document.getElementById("modalOrderBtn").dataset.price = size.price;
}

function closeProduct() {
  document.getElementById("productModal").classList.remove("open");
  document.body.classList.remove("modal-open");
}

// ---------- Cart operations ----------
function addActiveToCart() {
  if (!activeItem) return;
  const size = currentSizes()[activeSizeIndex];
  const proteinLabel = activeItem.proteins ? activeItem.proteins[activeProteinIndex].label : null;
  const displayName = proteinLabel ? `${activeItem.name} — ${proteinLabel}` : activeItem.name;
  const cartKey = activeItem.id + "|" + (proteinLabel || "") + "|" + size.label;

  const existing = cart.find((c) => c.key === cartKey);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      key: cartKey,
      id: activeItem.id,
      name: displayName,
      sizeLabel: size.label,
      price: size.price,
      stripeLink: size.stripeLink,
      qty: 1
    });
  }
  saveCart();
  renderCart();
  closeProduct();
  openCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
  renderCart();
}

function cartTotal() {
  return cart.reduce((sum, c) => sum + c.price * c.qty, 0);
}

function cartCount() {
  return cart.reduce((sum, c) => sum + c.qty, 0);
}

// ---------- Cart drawer ----------
function renderCart() {
  const badge = document.getElementById("cartBadge");
  const count = cartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";

  const list = document.getElementById("cartItems");
  const emptyMsg = document.getElementById("cartEmpty");
  const footer = document.getElementById("cartFooter");
  list.innerHTML = "";

  if (cart.length === 0) {
    emptyMsg.style.display = "block";
    footer.style.display = "none";
    return;
  }
  emptyMsg.style.display = "none";
  footer.style.display = "block";

  cart.forEach((c, i) => {
    const row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML = `
      <div class="cart-row-info">
        <span class="cart-row-name">${c.name}</span>
        <span class="cart-row-size">${c.sizeLabel} · ${money(c.price)}</span>
      </div>
      <div class="cart-row-qty">
        <button type="button" aria-label="Decrease quantity">−</button>
        <span>${c.qty}</span>
        <button type="button" aria-label="Increase quantity">+</button>
      </div>
      <button type="button" class="cart-row-remove" aria-label="Remove ${c.name}">✕</button>
    `;
    const [minusBtn, plusBtn] = row.querySelectorAll(".cart-row-qty button");
    minusBtn.addEventListener("click", () => changeQty(i, -1));
    plusBtn.addEventListener("click", () => changeQty(i, 1));
    row.querySelector(".cart-row-remove").addEventListener("click", () => removeFromCart(i));
    list.appendChild(row);
  });

  document.getElementById("cartTotal").textContent = money(cartTotal());
}

function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
  document.body.classList.add("modal-open");
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
  document.body.classList.remove("modal-open");
}

// ---------- Checkout ----------
// If every line in the cart has a Stripe Payment Link set in menu-data.js, checkout
// opens the first one (multi-item Stripe checkout needs a backend — see README).
// Until then, checkout compiles the order into a pre-filled WhatsApp message.
function checkout() {
  if (cart.length === 0) return;

  const allHaveStripe = cart.every((c) => c.stripeLink);
  if (allHaveStripe && cart.length === 1) {
    window.open(cart[0].stripeLink, "_blank");
    return;
  }

  const lines = cart.map((c) => `• ${c.name} (${c.sizeLabel}) x${c.qty} — ${money(c.price * c.qty)}`);
  const message =
    "Hi Salma Pot! I'd like to order:\n\n" +
    lines.join("\n") +
    `\n\nTotal: ${money(cartTotal())}` +
    "\n\nDelivery address:\nPreferred date/time:";

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// ---------- Wire up static controls ----------
document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  renderCart();

  document.getElementById("modalClose").addEventListener("click", closeProduct);
  document.getElementById("productModal").addEventListener("click", (e) => {
    if (e.target.id === "productModal") closeProduct();
  });
  document.getElementById("modalOrderBtn").addEventListener("click", addActiveToCart);

  document.getElementById("cartToggle").addEventListener("click", openCart);
  document.getElementById("cartClose").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);
  document.getElementById("cartCheckoutBtn").addEventListener("click", checkout);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeProduct(); closeCart(); }
  });
});
