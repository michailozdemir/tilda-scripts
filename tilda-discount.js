$(document).ready(function () {

    const addFakeDiscount = function (discountAmount, discountedPrice) {
        window.tcart.promocode = {
            message: "OK",
            promocode: "СКИДКА",
            discountpercent: "10.00",
        };
        window.tcart.prodamount_discountsum = discountAmount;
        window.tcart.prodamount_withdiscount = discountedPrice;
    };

    const removeFakeDiscount = function () {
        delete window.tcart.prodamount_discountsum;
        delete window.tcart.prodamount_withdiscount;
        delete window.tcart.promocode;
    };

    $(".t706__cartwin-prodamount").bind("DOMSubtreeModified", function () {
        let totalAmount = window.tcart.prodamount;
        let quantity = [];
        let products = window.tcart.products;
        for (let i = 0; i < products.length; i++) {
            for (let y = 0; y < products[i].quantity; y++) {
                quantity.push(products[i].quantity);
            }
        }

        let quantityMatch = quantity.every((element) => element > 4);

        if (quantityMatch && totalAmount > 15000) {
            if (window.tcart.delivery) {
                addFakeDiscount((window.tcart.prodamount / 100) * 10, window.tcart.amount);
            } else {
                addFakeDiscount((window.tcart.prodamount / 100) * 10, window.tcart.amount);
            }
            if (window.tcart.amount == window.tcart.prodamount) {
                window.tcart.amount = window.tcart.prodamount - (window.tcart.prodamount / 100) * 10;
            }
        } else {
            removeFakeDiscount();
            if (window.tcart.delivery) {
                window.tcart.amount = window.tcart.prodamount + window.tcart.delivery.price;
            } else {
                window.tcart.amount = window.tcart.prodamount;
            }
        }
    });
});