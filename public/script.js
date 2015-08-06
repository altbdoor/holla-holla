(function (d, w) {
	var currencyFrom = d.getElementById('currency-currency-from'),
		currencyTo = d.getElementById('currency-currency-to'),
		valFrom = d.getElementById('currency-value-from'),
		valTo = d.getElementById('currency-value-to'),
		
		http = new XMLHttpRequest(),
		parser = new DOMParser();
	
	http.open('GET', 'http://crossorigin.me/http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml', true);
	http.onload = function () {
		if (this.status >= 200 && this.status < 400) {
			var doc = parser.parseFromString(this.response, 'text/xml'),
				entries = doc.getElementsByTagName('Cube');
			
			for (var i=0; i<entries.length; i++) {
				var currency = entries[i].getAttribute('currency'),
					rate = entries[i].getAttribute('rate');
				
				if (currency && rate) {
					var option = d.createElement('option');
					
					option.innerHTML = currency;
					option.value = rate;
					
					currencyFrom.appendChild(option);
					currencyTo.appendChild(option.cloneNode(true));
				}
			}
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
	valFrom.onkeyup =
	valTo.onkeyup = onChange;
})(document, window);
