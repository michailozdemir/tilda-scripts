$(document).ready(function () {
    let formInputs = $(".taxi-form :input");
    let airportRadio = $('.taxi-form__airport-radio');
    let carClassRadio = $('.taxi-form__class-radio');
    let carClassBlock = $('.taxi-form__class-single');
    let submitButton = $('.taxi-form__submit');

    let phoneInput = document.querySelector('.taxi-form__input--phone');
    let cityInput = document.querySelector('.taxi-form__input--city');
    let streetInput = document.querySelector('.taxi-form__input--address');
    let priceBlock = $('.taxi-form__submit-price');

    let cityDropdown = $('.taxi-form__dropdown');
    let cityDropdownItem = $('.taxi-form__dropdown-city');

    // Tilda Inputs
    let tildaAirportInput = document.querySelector('.t-form__inputsbox input[name="Аэропорт"]');
    let tildaPhoneInput = document.querySelector('.t-form__inputsbox  input[name="Телефон"]');
    let tildaCityInput = document.querySelector('.t-form__inputsbox  input[name="Город"]');
    let tildaStreetInput = document.querySelector('.t-form__inputsbox  input[name="Адрес"]');
    let tildaCarClassInput = document.querySelector('.t-form__inputsbox  input[name="Класс"]');
    let tildaPriceInput = document.querySelector('.t-form__inputsbox input[name="Цена"]');

    let carClass;
    let prices = {
        'Эконом': {
            'Севастополь': 2200,
            'Ялта': 2100,
            'Ласпи': 2500,
            'Феодосия': 2300,
            'Алушта': 1550,
            'Алупка': 2300,
            'Балаклава': 2000,
            'Бахчисарай': 1300,
            'Гаспра': 2200,
            'Гурзуф': 1800,
            'Евпатория': 1500,
            'Форос': 2200,
            'Судак': 2300,
            'Коктебель': 2200,
            'Кореиз': 2300,
            'Керчь': 3900,
            'Мрия': 2400,
            'Маки': 1400
        },
        'Комфорт': {
            'Севастополь': 2400,
            'Ялта': 2400,
            'Ласпи': 2800,
            'Феодосия': 2600,
            'Алушта': 1700,
            'Алупка': 2600,
            'Балаклава': 2300,
            'Бахчисарай': 1500,
            'Гаспра': 2500,
            'Гурзуф': 2100,
            'Евпатория': 1800,
            'Форос': 2700,
            'Судак': 2600,
            'Коктебель': 2600,
            'Кореиз': 2600,
            'Керчь': 4500,
            'Мрия': 2700,
            'Маки': 1600
        },
        'Минивэн': {
            'Севастополь': 3200,
            'Ялта': 3100,
            'Ласпи': 3500,
            'Феодосия': 3300,
            'Алушта': 2550,
            'Алупка': 3300,
            'Балаклава': 3000,
            'Бахчисарай': 2300,
            'Гаспра': 3200,
            'Гурзуф': 2800,
            'Евпатория': 2500,
            'Форос': 3200,
            'Судак': 3200,
            'Коктебель': 3200,
            'Кореиз': 3300,
            'Керчь': 4900,
            'Мрия': 3400,
            'Маки': 2400
        }
    }

    const classChooseHighlight = function () {
        if ($(this).prop('checked') == true) {
            $(this).closest(carClassBlock).addClass('checked');
        }

        if ($(this).attr('id') == 'Эконом') {
            carClass = 'Эконом';
        } else if ($(this).attr('id') == 'Комфорт') {
            carClass = 'Комфорт';
        } else {
            carClass = 'Минивэн';
        }

        carClassRadio.not(this).closest(carClassBlock).removeClass('checked');
    }

    const locationFinder = function () {

        navigator.geolocation.getCurrentPosition(function (position) {
                getUserAddressBy(position.coords.latitude, position.coords.longitude);
            },
            function (error) {
                console.log("Location was not allowed :(")
            })

        const getUserAddressBy = async (lat, long) => {
            try {
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyBvP9E7l3vLngGzMmnYSdTyP5jmb0S9kGY&language=ru-RU`)
                    .then((response) => {
                        return response.json();
                    })
                    .then((location) => {
                        let street = `${location.results[0].address_components[1].short_name}, ${location.results[0].address_components[0].short_name}`;
                        let city = location.results[0].address_components[3].short_name;

                        cityInput.value = city;
                        streetInput.value = street;
                    });
            } catch (e) {
                console.log(e.message);
            }
        }
    }

    const locationAutocompleter = function () {
        let defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(45.3027711, 33.4393315),
            new google.maps.LatLng(44.952117, 34.102417));
        let optionsCity = {
            bounds: defaultBounds,
            types: ['(cities)']
        };

        let optionsAddress = {
            bounds: defaultBounds,
            types: ['address']
        }
        new google.maps.places.Autocomplete(streetInput, optionsAddress);
    }

    const calculatePrice = function () {
        let price;
        let cityValue = cityInput.value.toUpperCase();

        priceBlock.html('0 руб.');
        cityValue = cityValue.match(/[\wа-я]+/ig);

        if (prices.hasOwnProperty(carClass)) {
            let tariffs = prices[carClass];
            for (let tariff in tariffs) {
                price = tariffs[tariff];
                if (`${cityValue}""`.indexOf(tariff.toUpperCase()) >= 0) {
                    priceBlock.html(`${price} руб.`);
                }
            }
        }
    }

    const createPhoneMask = function () {
        Inputmask({
            "mask": "+7 (999) 999-99-99"
        }).mask(phoneInput);
    }

    const checkFilledInputs = function () {
        if (phoneInput.value && cityInput.value && streetInput.value && carClassRadio.is(':checked') && airportRadio.is(':checked')) {
            submitButton.removeClass('disabled');
        } else {
            submitButton.addClass('disabled');
        }
    }

    const showCityDropdown = function () {
        cityDropdown.show();
    }

    const hideCityDropdown = function () {
        cityDropdown.hide();
    }

    const cityInputCompleter = function () {
        let chosenCity = $(this).data('city');
        cityInput.value = chosenCity;
    }

    const addressInputPrefix = function () {
        if (this.value == '' && !cityInput.value == '') {
            this.value = `${cityInput.value}, `
        }
    }

    const sendTildaData = function () {

        submitButton.click(event, function () {
            event.preventDefault();

            let airportRadioValue;
            let carClassRadioValue;

            airportRadio.each(function () {
                if ($(this).prop('checked') == true) {
                    airportRadioValue = $(this).val();
                }
            });

            carClassRadio.each(function () {
                if ($(this).prop('checked') == true) {
                    carClassRadioValue = $(this).val();
                }
            });

            tildaAirportInput.value = airportRadioValue;
            tildaPhoneInput.value = phoneInput.value;
            tildaCityInput.value = cityInput.value;
            tildaStreetInput.value = streetInput.value;
            tildaCarClassInput.value = carClassRadioValue;
            tildaPriceInput.value = priceBlock.html();

            setTimeout(function () {
                $('.t-submit').click();
            }, 300)
        });
    }


    locationFinder();
    locationAutocompleter();
    createPhoneMask();
    calculatePrice();

    carClassRadio.on('click', classChooseHighlight);
    carClassRadio.on('click', calculatePrice);
    cityInput.addEventListener('blur', function () {
        setTimeout(function () {
            calculatePrice();
        }, 400);
    });
    cityDropdownItem.on('click', cityInputCompleter);
    cityInput.addEventListener('focus', showCityDropdown);
    cityInput.addEventListener('blur', function () {
        setTimeout(function () {
            hideCityDropdown();
        }, 100);
    });
    streetInput.addEventListener('focus', addressInputPrefix);

    formInputs.change(function () {
        checkFilledInputs();
    });

    sendTildaData();

});