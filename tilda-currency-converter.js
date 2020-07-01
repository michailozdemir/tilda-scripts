async function convertPrices(wrapper) {
    let url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
    let response = await fetch(url);
    let rateData = await response.json();
    let rateValue;
    let product = $(`${wrapper}`);

    for (let i = 0; i < product.length; i++) {
        let productPrice = $(product[i]).find('.js-product-price');
        rateValue = rateData[1].sale;

        let processedPrice = productPrice.text().replace(/ /g, '');
        processedPrice = processedPrice.replace(/,/g, '.');
        productPrice.text(Math.round(Number(processedPrice) * rateValue * 1.01));
        productPrice.text(productPrice.text().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
    }
}

$(document).ready(function () {
    if (typeof t_store_init_popups == "function") {
        t_store_init_popups_original = t_store_init_popups;
        t_store_init_popups = function () {
            t_store_init_popups_original();

            changePrices('.t-popup .js-product');
            convertPricesOnOptionChange('.t-popup .js-product');
        }
    }

    setTimeout(function () {
        convertPrices('.js-product');
    }, 1500);

    function convertPricesOnOptionChange(wrapper) {
        setTimeout(function () {
            $(`${wrapper} .t-product__option-variants`).on('change', function (event) {
                let target = event.currentTarget;
                setTimeout(function () {
                    let parentProductId = $(target).closest('.js-product').attr('data-product-uid');
                    convertPrices(`${wrapper}[data-product-uid="${parentProductId}"]`);
                }, 200);
            });
        }, 300);
    }

    convertPricesOnOptionChange('.js-product');
});
