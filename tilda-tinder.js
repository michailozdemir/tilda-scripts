$(document).ready(function () {
    setTimeout(function () {

        let cardLikeButton = $('.js-store-prod-btn2');
        let products = $('.js-product');
        let resetButton = $('.t142__submit');
        let likedItems = [];
        let dislikedItems = [];

        const replaceDislikeButton = function () {
            let buttonToReplace = $('.js-store-prod-btn');
            buttonToReplace.each(function () {
                $(this).replaceWith($('<div class="js-store-prod-btn t-store__card__btn t-btn t-btn_sm" style="color:#000000;border-radius:5px; -moz-border-radius:5px; -webkit-border-radius:5px;">' + this.innerHTML + '<div>'));
            });
        }

        replaceDislikeButton();

        $('.t-store__card__wrap_all > a').each(function () {
            $(this).replaceWith($('<div>' + this.innerHTML + '</div>'))
        });

        let cardDislikeButton = $('.js-store-prod-btn');


        const addLastCustomCard = function () {
            let customCard = `<div class="js-product custom-card">
            <h3 class="custom-card__title">
                Упс
            </h3>
            <p class="custom-card__text">
                Все карточки закончились. Вы можете сбросить все к началу или заполнить форму с уже понравившимися и наш менеджер будет рад связаться с вами для уточнения деталей!
            </p>
            <div class="custom-card__image">
                <img src="https://static.tildacdn.com/tild6366-6565-4233-b138-396633336530/Group_339.svg" />
            </div>
            </div>`;

            $('.js-store-grid-cont').append(customCard)

        }


        const addToStorage = function (name, cardValue) {
            let cardItems = localStorage.getItem(name);
            cardItems = cardItems ? cardItems.split(',') : [];
            cardItems.push(cardValue);
            localStorage.setItem(name, cardItems.toString());
        }

        const readStorage = function () {
            if (localStorage.getItem('liked')) {
                likedItems = localStorage.getItem('liked').split(',');
            }

            if (localStorage.getItem('disliked')) {
                dislikedItems = localStorage.getItem('disliked').split(',');
            }
        }

        const buttonActionLike = function () {
            let currentCard = $(this).closest('.js-product');
            let cardId = currentCard.data('product-uid');
            currentCard.addClass('liked');

            setTimeout(function () {
                currentCard.addClass('hide');
            }, 1000);

            // Add liked card to localStorage
            addToStorage('liked', cardId);
        }

        const buttonActionDislike = function (e) {
            let currentCard = $(this).closest('.js-product');
            let cardId = currentCard.data('product-uid');
            currentCard.addClass('disliked');

            setTimeout(function () {
                currentCard.addClass('hide');
            }, 1000);

            // Add disliked card to localStorage
            addToStorage('disliked', cardId);
        }

        const showLikedCards = function () {
            readStorage();

            let missingProducts = likedItems.filter(e => !window.tcart.products.find(a => e == a.uid));
            for (let k = 0; k < missingProducts.length; k++) {
                products.each(function () {
                    if ($(this).data('product-uid') == missingProducts[k]) {
                        let product = $(this);
                        let removedItems = likedItems.indexOf(missingProducts[k]);
                        if (removedItems > -1) {
                            likedItems.splice(removedItems, 1);
                        }
                        if (likedItems.length) {
                            localStorage.setItem('liked', likedItems);
                        } else {
                            localStorage.removeItem('liked');
                        }


                        setTimeout(function () {
                            product.removeClass('hide');
                            if (product.hasClass('liked')) {
                                product.removeClass('liked');
                            } else {
                                product.removeClass('disliked');
                            }
                        }, 100);

                    }
                })
            }
        }

        window.showDislikedCards = function () {
            localStorage.removeItem('disliked');
        }

        const hideCards = function () {
            products.each(function () {
                let productId = $(this).data('product-uid');
                productId = String(productId);
                if (likedItems.includes(productId) || dislikedItems.includes(productId)) {
                    $(this).addClass('hide');
                }
            });
        }

        if (typeof tcart__closeCart == 'function') {
            tcart__closeCart_original = tcart__closeCart
            tcart__closeCart = function () {
                tcart__closeCart_original();

                setTimeout(function () {
                    showLikedCards();
                }, 200);
            }
        }

        const resetCards = function (e) {
            e.preventDefault();

            // Remove cards from storage
            localStorage.removeItem('liked');
            localStorage.removeItem('disliked');

            // Remove products from cart
            localStorage.removeItem('tcart');
            tcart__init();

            // Show cards back
            products.each(function () {
                $(this).removeClass('hide');

                if ($(this).hasClass('liked')) {
                    $(this).removeClass('liked');
                } else {
                    $(this).removeClass('disliked');
                }
            });
        }

        addLastCustomCard();

        readStorage();
        hideCards();
        showLikedCards();

        cardLikeButton.click(buttonActionLike);
        cardDislikeButton.click(buttonActionDislike);
        resetButton.click(resetCards);
        $('.t706 form').data('formsended-callback', 'window.showDislikedCards');

    }, 400);
});