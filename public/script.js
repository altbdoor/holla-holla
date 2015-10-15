(function (d, w) {
	var currencyFrom = d.getElementById('currency-currency-from'),
		currencyTo = d.getElementById('currency-currency-to'),
		valFrom = d.getElementById('currency-value-from'),
		valTo = d.getElementById('currency-value-to'),
		
		http = new XMLHttpRequest(),
		
		yqlUrl = 'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml',
		yqlQuery = 'SELECT * FROM xml WHERE url="' + yqlUrl + '"';
	
	http.open('GET', 'http://query.yahooapis.com/v1/public/yql?format=xml&q=' + encodeURIComponent(yqlQuery), true);
	http.onload = function () {
		if (this.status >= 200 && this.status < 400) {
			var parser = new DOMParser(),
				doc = parser.parseFromString(this.response, 'text/xml'),
				entries = doc.querySelectorAll('Cube[currency][rate]');
			
			Array.prototype.forEach.call(entries, function (item) {
				var currency = item.getAttribute('currency'),
					rate = item.getAttribute('rate'),
					option = d.createElement('option');
				
				option.innerHTML = currency;
				option.value = rate;
				
				currencyFrom.appendChild(option);
				currencyTo.appendChild(option.cloneNode(true));
			});
		}
	};
	http.send();
	
	function onChange () {
		var inputRate = parseFloat(currencyFrom.value),
			outputRate = parseFloat(currencyTo.value),
			
			inputValue = parseFloat(valFrom.value);
		
		if (/^\d+(\.\d+)?$/.test(valFrom.value)) {
			var outputValue = inputValue * (outputRate / inputRate);
			valTo.value = parseFloat(outputValue).toFixed(2);
		}
		else {
			valTo.value = ':^) Oh you!';
		}
	}
	
	currencyFrom.onchange = 
	currencyTo.onchange =
	valFrom.onkeyup = onChange;
})(document, window);
