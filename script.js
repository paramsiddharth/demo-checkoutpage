$(function() {
	let productsTag = $('#products'),
		detailsTag = $('#details');
	
	let discount = 0,
		deliveryCharge = 30;

	productsTag.text('');

	let products = [
		{
			name: 'Cake',
			price: 80.00,
			quantity: 1,
			img: 'cake.jpg'
		},
		{
			name: 'Samosa',
			price: 10.00,
			quantity: 1,
			img: 'samosa.jpg'
		}
	];

	for (let product of products) {
		let newTag = $('<div></div>');
		newTag.addClass('row product align-items-center');
		let productLeft = $('<div></div>').addClass('col-4 text-center');
		let productImage = $('<img/>');
		productImage.addClass('product-image img-fluid')
		productImage.attr({
			src: 'img/' + product.img
		});
		productLeft.append(productImage);
		productLeft.append($('<h5></h5>').text(product.name).addClass('mt-1'));
		newTag.append(productLeft);
		let productMid = $('<div></div>').addClass('col-3 text-center');
		productMid.append($('<h6></h6>').text('Price').addClass('text-muted'));
		let priceTag = $('<h3></h3>').text(formatPrice(product.price * product.quantity)).addClass('pricetag prod-price');
		productMid.append(priceTag);
		newTag.append(productMid);
		let productRig = $('<div></div>').addClass('col-3 text-center');
		let removeButton = $('<button></button>').text('Remove').addClass('col-2 btn btn-danger');
		removeButton.click(function() { newTag.remove(); });
		productRig.append($('<h6></h6>').text('Quantity').addClass('text-muted'));
		let quanButtons = $('<div></div>');
		let plusButton = $('<button></button>').text('+').addClass('btn btn-light border');
		let quantityField = $('<input>').attr({type: 'text'}).css({ width: '40px' }).addClass('quantity-field ml-1 mr-1').val(product.quantity);
		let minusButton = $('<button></button>').text('-').addClass('btn btn-light border');
		plusButton.click(function() {
			quantityField.val(Number(quantityField.val()) + 1);
			priceTag.text(formatPrice(quantityField.val() * product.price));
		});
		minusButton.click(function() {
			let newVal = quantityField.val() - 1;
			quantityField.val(newVal < 1 ? 1 : newVal);
			priceTag.text(formatPrice(quantityField.val() * product.price));
		});
		quantityField.on('change', function() {
			if (quantityField.val() <= 0 || isNaN(quantityField.val() * product.price)) quantityField.val(1);
			priceTag.text(formatPrice(quantityField.val() * product.price));
				
		});
		quanButtons.append([minusButton, quantityField, plusButton]);
		productRig.append(quanButtons);
		newTag.append(productRig);
		newTag.append(removeButton);
		productsTag.append(newTag);
	}

	setInterval(function() {
		$('.totalCount').text($('.quantity-field').length);
		$('.final-value').text(formatPrice(updatedNet()));
		if ($('#delOpts2').prop('checked'))
			$('.delivery-charge').text(formatPrice(deliveryCharge))
		else
		$('.delivery-charge').text(0);
		$('.final-sum').text(formatPrice(
			Number(updatedNet())
			+ Number(discount)
			+ ($('#delOpts2').prop('checked') ? Number(deliveryCharge) : 0)
		));
	}, 50);
});

function formatPrice(price = 0) {
	return Number(price).toFixed(2);
}

function updatedNet() {
	let netPrice = 0;
	$('.prod-price').each(function(index) {
		netPrice += Number($(this).text());
	});
	return netPrice;
}