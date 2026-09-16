(function () {
  var SHOP_DOMAIN = 'sbvt1z-1v.myshopify.com';
  var STOREFRONT_TOKEN = '0bfbb908d5e1305df86a766ad9e2bf1e';
  var SCRIPT_URL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  var FONT = '-apple-system, "Inter", "Segoe UI", Helvetica, Arial, sans-serif';

  var buttonStyle = {
    'font-family': FONT,
    'font-size': '0.92rem',
    'font-weight': '600',
    'padding-top': '13px',
    'padding-bottom': '13px',
    'padding-left': '26px',
    'padding-right': '26px',
    'color': '#ffffff',
    'background-color': '#101012',
    ':hover': { 'background-color': '#d6443c', 'color': '#ffffff' },
    ':focus': { 'background-color': '#d6443c' },
    'border-radius': '999px',
  };

  var options = {
    product: {
      styles: {
        product: { '@media (min-width: 601px)': { 'max-width': '100%', 'margin-left': '0', 'margin-bottom': '0' } },
        button: buttonStyle,
        quantityInput: { 'font-family': FONT, 'font-size': '0.92rem', 'padding-top': '12px', 'padding-bottom': '12px' },
      },
      text: { button: 'In den Warenkorb' },
    },
    modalProduct: {
      contents: { img: false, imgWithCarousel: true, button: false, buttonWithQuantity: true },
      styles: {
        product: { '@media (min-width: 601px)': { 'max-width': '100%', 'margin-left': '0', 'margin-bottom': '0' } },
        button: buttonStyle,
        quantityInput: { 'font-family': FONT, 'font-size': '0.92rem', 'padding-top': '12px', 'padding-bottom': '12px' },
      },
      text: { button: 'In den Warenkorb' },
    },
    option: {},
    cart: {
      styles: { button: buttonStyle },
      text: { total: 'Zwischensumme', button: 'Zur Kasse' },
    },
    toggle: {
      styles: {
        toggle: {
          'font-family': FONT,
          'background-color': '#101012',
          ':hover': { 'background-color': '#d6443c' },
          ':focus': { 'background-color': '#d6443c' },
        },
        count: { 'font-size': '14px', color: '#ffffff', ':hover': { color: '#ffffff' } },
        iconPath: { fill: '#ffffff' },
      },
    },
  };

  var products = [
    { nodeId: 'product-component-1789582864207', productId: '16075762663758' }, // 1 Gel
    { nodeId: 'product-component-1789582965822', productId: '16075763351886' }, // 12er-Pack
    { nodeId: 'product-component-1789582994146', productId: '16075764597070' }, // 3x 12er-Pack
  ];

  function init() {
    var client = ShopifyBuy.buildClient({ domain: SHOP_DOMAIN, storefrontAccessToken: STOREFRONT_TOKEN });
    ShopifyBuy.UI.onReady(client).then(function (ui) {
      products.forEach(function (p) {
        var node = document.getElementById(p.nodeId);
        if (!node) return;
        ui.createComponent('product', {
          id: p.productId,
          node: node,
          moneyFormat: '%E2%82%AC%7B%7Bamount_with_comma_separator%7D%7D',
          options: options,
        });
      });
    });
  }

  if (window.ShopifyBuy && window.ShopifyBuy.UI) {
    init();
  } else {
    var script = document.createElement('script');
    script.async = true;
    script.src = SCRIPT_URL;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    script.onload = init;
  }
})();
