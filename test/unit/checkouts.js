var init = require('./testInit');
var should = require('should');

var dwolla = require('../../lib/dwolla')(init.fakeKeys.appKey, init.fakeKeys.appSecret);


describe('Offsite Gateway', function() {

  describe('signature validation', function() {
    it('should validate a valid signature', function(done) {
      // real signature, generated by Dwolla
      var signature = '7717e8aae6ae692d515541ab5792f9a1279b0246';
      var checkoutId = 'd0429a55-c338-4139-b273-48d2f8c45693';
      var amount = 5.00;
      dwolla.vars._client_secret = 'g7QLwvO37aN2HoKx1amekWi8a2g7AIuPbD5C/JSLqXIcDOxfTr';

      dwolla.verifyGatewaySignature(signature, checkoutId, amount).should.be.true;

      done();
    });

    it('should fail an invalid signature', function(done) {
      // same signature as in the good case, but with a different leading character
      var signature = 'a717e8aae6ae692d515541ab5792f9a1279b0246';
      var checkoutId = 'd0429a55-c338-4139-b273-48d2f8c45693';
      var amount = 5.00;

      dwolla.vars._client_secret = 'g7QLwvO37aN2HoKx1amekWi8a2g7AIuPbD5C/JSLqXIcDOxfTr';

      dwolla.verifyGatewaySignature(signature, checkoutId, amount).should.be.false;

      done();
    });

    after(function() {
      // teardown, reset the app secret:
      dwolla.vars._client_secret = init.fakeKeys.appSecret;
    });
  });

  describe('get existing checkout', function() {
    it('should make the right request', function(done) {
      dwolla.getCheckout('d0429a55-c338-4139-b273-48d2f8c45693', function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/offsitegateway/checkouts/d0429a55-c338-4139-b273-48d2f8c45693');
      init.restlerMock.lastRequest.options.should.eql({
        client_id: init.fakeKeys.appKey,
        client_secret: init.fakeKeys.appSecret
      });

      done();
    });
  });

  describe('complete checkout', function() {
    it('should make the right request', function(done) {
      dwolla.completeCheckout('d0429a55-c338-4139-b273-48d2f8c45693', function() {});

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/offsitegateway/checkouts/d0429a55-c338-4139-b273-48d2f8c45693/complete');
      init.restlerMock.lastRequest.options.should.eql({
        client_id: init.fakeKeys.appKey,
        client_secret: init.fakeKeys.appSecret
      });

      done();
    });
  });

  describe('create checkout session', function() {
    it('Should make the correct request and parse the API response correctly', function(done) {
      var purchaseOrder = {
        destinationId: '812-740-4294',
        total: '5.00',
        orderItems: [
          {
            "name": "Prime Rib Sandwich", 
            "description": "A somewhat tasty non-vegetarian sandwich", 
            "quantity": "1", 
            "price": "2.0"
          },
          {
            "name": "Ham Sandwich", 
            "description": "Yum!", 
            "quantity": "3", 
            "price": "1.00"
          }
        ]
      };

      var params = {
        allowFundingSources: true,
        orderId: 'blah'
      };

      dwolla.createCheckout('https://google.com', purchaseOrder, params, function(err, checkout) {
        should(err).should.be.undefined;
        checkout.checkoutId.should.equal('39940885-aa56-4c7b-a61f-0c271a7dd671');
        checkout.checkoutURL.should.equal('https://www.dwolla.com/payment/checkout/39940885-aa56-4c7b-a61f-0c271a7dd671');
        done();
      });

      init.restlerMock.lastRequest.url.should.equal('https://www.dwolla.com/oauth/rest/offsitegateway/checkouts');
      init.restlerMock.lastRequest.options.should.eql( 
        {
          'client_id': init.fakeKeys.appKey,
          'client_secret': init.fakeKeys.appSecret, 
          'redirect': 'https://google.com',
          'purchaseOrder': purchaseOrder,
          'allowFundingSources': true,
          'orderId': 'blah'
        });

      init.restlerMock.mockEmitter.emit('complete', JSON.parse('{"Success":true,"Message":"Success","Response":{"CheckoutId":"39940885-aa56-4c7b-a61f-0c271a7dd671"}}'));
    });
  });
});