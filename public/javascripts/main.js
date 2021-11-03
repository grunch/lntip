const App = {
  endpoint: '/api',
  interval: null,
};

App.init = () => {
  $('#invoice-form').collapse('show');
  $('#send-btn').click(App.sendBtn);
  $('#send-onchain-btn').click(App.sendOnchainBtn);
  App.getBalance();
}

App.sendBtn = async () => {
  const amount = $('#amount').val();
  const description = $('#description').val();
  const response = await App.makeRequest({
    api: "invoice",
    post: { amount, description },
  });
  if (!response) console.error('Error getting data!');
  if (response.success) {
    $('#invoice-form').collapse('hide');
    $('#pay-invoice').collapse('show');
    $('#invoice-text').text(response.request);
    $('#invoice-description').text(description);
    $('#invoice-amount').text(`${amount} `);
    const qrCode = App.qrCode(response.request.toUpperCase(), 400);
    $('.qr-code').html(qrCode);
    App.interval = setInterval(App.waitPayment, 2000, response.hash);
  }
};

App.sendOnchainBtn = async () => {
  const amount = $('#amount').val();
  const description = $('#description').val();
  const response = await App.makeRequest({
    api: "address",
  });
  if (!response) console.error('Error getting data!');
  if (response.success) {
    $('#invoice-form').collapse('hide');
    $('#show-address').collapse('show');
    $('#address-description').text(description);
    $('#address-text').text(response.address);
    $('#address-amount').text(amount);
    const qrCode = App.qrCode(response.address.toUpperCase(), 400);
    $('.qr-code').html(qrCode);
  }
};

App.waitPayment = async (hash) => {
  const response = await App.makeRequest({
    api: `invoice/${hash}`,
  });
  if (response.success && response.paid) {
    clearInterval(App.interval);
    App.interval = null;
    $('#pay-invoice').collapse('hide');
    $('#invoice-description').html(response.description);
    $('#invoice-preimage').html(response.preimage);
    $('#success-box').collapse('show');
    setTimeout(App.getBalance, 2000);
  }
};

App.getBalance = async (hash) => {
  const response = await App.makeRequest({
    api: `balance`,
  });
  if (response.success) {
    $('#user-balance').text(` ${response.balance} SAT`);
  }
};

/** Get qr code
  {
    text: <String>
  }

  @returns
  <QR Code Img Object>
*/
App.qrCode = text => {
  const back = 'rgb(250, 250, 250)';
  const rounded = 100;
  const size = 300;

  const qr = kjua({back, rounded, size, text});

  $(qr).css({height: 'auto', 'max-width': '200px', width: '100%'});

  return qr;
};

App.makeRequest = ({api, post}) => {
  const type = !post ? 'GET' : 'POST';
  const data = !!post ? JSON.stringify(post) : null;
  return $.ajax(`${App.endpoint}/${api}`, {
    type,
    data,
    contentType: 'application/json',
    dataType: 'json',
  });
};

$(() => App.init());
