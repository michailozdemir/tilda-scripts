let calculator = $('#calc');
let calcButton = $('.t-submit');
let date = [];

let workNumbersWrapper = $('.square-calc__numbers-value');

let charValue = $('.square-calc__table-value--char');
let healthValue = $('.square-calc__table-value--health');
let luckValue = $('.square-calc__table-value--luck');
let energyValue = $('.square-calc__table-value--energy');
let logicValue = $('.square-calc__table-value--logic');
let debtValue = $('.square-calc__table-value--debt');
let interestValue = $('.square-calc__table-value--interest');
let laborValue = $('.square-calc__table-value--labor');
let memoryValue = $('.square-calc__table-value--memory');

let targetValue = $('.square-calc__sidebar-value--target');
let familyValue = $('.square-calc__sidebar-value--family');
let habitsValue = $('.square-calc__sidebar-value--habits');

let esteemValue = $('.square-calc__bottom-value--esteem');
let workValue = $('.square-calc__bottom-value--work');
let talentValue = $('.square-calc__bottom-value--talent')
let spiritValue = $('.square-calc__bottom-value--spirit');
let temperValue = $('.square-calc__bottom-value--temper');


const showTable = function () {
    calculator.show();
}

const hideTable = function () {
    calculator.hide();
}

const getDate = function () {

    // Get input value and re-format it
    let dateInputValue = $('[name="date"]').val();
    dateInputValue = dateInputValue.replace(/\./g, '');
    date = dateInputValue.split('');
    date = date.map(Number);

    // If first item in array is zero - remove it
    if (date[0] == 0) {
        date.shift();
    }
}

const calculation = function () {

    let firstWorkNumber,
        secondWorkNumber,
        thirdWorkNumber,
        fourthWorkNumber;

    // Get work numbers
    getWorkNumbers = function () {

        // Function gets next number from the previous one
        getNextNumber = function (first, second) {
            if (first.toString().length == 1 || first == 10 || first == 11 || first == 12) {
                second = first;
            } else {
                second = ('' + first).split('').map(Number);
                second = second.reduce((a, b) => a + b);
            }
            return second;
        }

        // Format and get needed work numbers
        firstWorkNumber = date.reduce((a, b) => a + b);
        secondWorkNumber = getNextNumber(firstWorkNumber, secondWorkNumber);
        thirdWorkNumber = firstWorkNumber - (Number(date[0]) * 2);
        fourthWorkNumber = getNextNumber(thirdWorkNumber, fourthWorkNumber);

        // Append nubmers to HTML
        workNumbersWrapper.html(`${firstWorkNumber}, ${secondWorkNumber}, ${thirdWorkNumber}, ${fourthWorkNumber}`)

    }();

    // Function which splits few digits to one as array
    splitToDigit = function (...n) {
        return [...n + ''].map(Number);
    }

    // Fill first table with numbers
    fillTable = function () {
        let workNumbers = splitToDigit(firstWorkNumber, secondWorkNumber, thirdWorkNumber, fourthWorkNumber);
        let tableArray = [...date, ...workNumbers];
        tableArray = tableArray.filter(Number);
        tableArray.sort();

        // Gets table numbers by digits
        getMainTableNumbers = function (number) {
            let numbers = [];
            numbers = tableArray.filter(value => value == number);
            return numbers = numbers.join('');
        }

        addNumbersToMainTable = function (wrapper, number) {
            if (getMainTableNumbers(number)) {
                wrapper.html(getMainTableNumbers(number));
            } else {
                wrapper.html('-');
            }
        }

        addNumbersToMainTable(charValue, 1);
        addNumbersToMainTable(healthValue, 4);
        addNumbersToMainTable(luckValue, 7);

        addNumbersToMainTable(energyValue, 2);
        addNumbersToMainTable(logicValue, 5);
        addNumbersToMainTable(debtValue, 8);

        addNumbersToMainTable(interestValue, 3);
        addNumbersToMainTable(laborValue, 6);
        addNumbersToMainTable(memoryValue, 9);


        sideTableNumbers = function (wrapper, first, second, third) {
            first = first.html();
            second = second.html();
            third = third.html();
            wrapper.html(`${first}${second}${third}`);
            wrapper.html(wrapper.html().replace(/-/g, ''));
            wrapper.html(wrapper.html().length);
        }

        sideTableNumbers(targetValue, charValue, healthValue, luckValue);
        sideTableNumbers(familyValue, energyValue, logicValue, debtValue);
        sideTableNumbers(habitsValue, interestValue, laborValue, memoryValue);

        sideTableNumbers(esteemValue, charValue, energyValue, interestValue);
        sideTableNumbers(workValue, healthValue, logicValue, laborValue);
        sideTableNumbers(talentValue, luckValue, debtValue, memoryValue);

        sideTableNumbers(spiritValue, charValue, logicValue, memoryValue);
        sideTableNumbers(temperValue, interestValue, logicValue, luckValue);
    }();
}

hideTable();

calcButton.attr('type', '');
calcButton.click(function (e) {
    e.preventDefault();
    getDate();
    calculation();
    showTable();
});