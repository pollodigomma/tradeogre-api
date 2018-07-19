var request = require('request')

var TradeOgre = function (key, secret) {

	var self = this

	self.VERSION = '1.1.6'

	self._key = key
	self._secret = secret

	self._endpoint = 'tradeogre.com/api/v1'
	self._publicUrl = 'https://' + self._endpoint
	self._privateUrl = 'https://' + self._key + ":" + self._secret + "@" + self._endpoint

	self._get = function (path, options, callback) {
		var qs = ''
		for (var o in options) {
			qs += '/' + options[o]
		}
		var path = path + qs
		if (!path.match(self._publicUrl) && !path.match(self._privateUrl)) {
			path = self._publicUrl + path
		}
		return request(
			{
				method: "GET",
				url: path,
			},
			callback
		)
	}
	self._post = function (path, options, callback) {
		return request(
			{
				method: "POST",
				url: self._privateUrl + path,
				form: options,
				json: true
			},
			callback
		)
	}

	return self
}

// Public methods
TradeOgre.prototype.getMarkets = function (callback) {
	/**
	 * @param market
	 */
	this._get('/markets', {}, callback)
}
TradeOgre.prototype.getOrderBook = function (market, callback) {
	/**
	 * @param market
	 */
	this._get('/orders', { market : market }, callback)
}
TradeOgre.prototype.getTicker = function (market, callback) {
	/**
	 * @param market
	 */
	this._get('/ticker', { market : market }, callback)
}
TradeOgre.prototype.getTradeHistory = function (market, callback) {
	/**
	 * @param market
	 */
	this._get('/history', { market : market }, callback)
}

// Private methods
TradeOgre.prototype.buy = function (market, quantity, price, callback) {
	/**
	 * @param market
	 * @param quantity
	 * @param price
	 */
	this._post('/order/buy', { market : market, quantity: quantity, price: price }, callback)
}
TradeOgre.prototype.sell = function (market, quantity, price, callback) {
	/**
	 * @param market
	 * @param quantity
	 * @param price
	 */
	this._post('/order/sell', { market : market, quantity: quantity, price: price }, callback)
}
TradeOgre.prototype.cancelOrder = function (uuid, callback) {
	/**
	 * @param uuid
	 */
	this._post('/order/cancel', { uuid: uuid }, callback)
}
TradeOgre.prototype.getOrders = function (market, callback) {
	/**
	 * @param market
	 */
	this._post('/account/orders', { market: market }, callback)
}
TradeOgre.prototype.getBalance = function (currency, callback) {
	/**
	 * @param currency
	 */
	this._post('/account/balance', { currency: currency }, callback)
}
TradeOgre.prototype.getBalances = function (callback) {
	/**
	 * @param currency
	 */
	this._get(this._privateUrl + '/account/balances', {}, callback)
}

module.exports = TradeOgre
