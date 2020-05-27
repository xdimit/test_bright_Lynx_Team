"use strict"

const calculator = document.querySelector('#calculator');
const count = document.querySelector('#count');
const result = document.getElementById('res');

count.addEventListener('click', calculateValues);

function calculateValues(e) {
    let calcChild = calculator.children;
    let obj = {};
    let res = 0;

    for (let i = 0; i < calcChild.length; i++) {	// Вибираем у формы детей с классом "value"
        if (calcChild[i].classList.contains('value')) {
            let key = calcChild[i].getAttribute('name');
            let value = calcChild[i].value;
            obj[key] = +value; // и добавляем в объект с ключем по атрибуту name и значем по его value
        }

    }

    for (let key in obj) { 
        if (!isNumeric(obj[key])) continue; // Проверка на число
        res += obj[key] * 100000; // умножим на 100000 для более точного вычисления
    }

    res = res / 100000; // возврат плавающей точки

    if (res == 0) return; // при "0" ничего не возварщать;
    result.value = "Результат: \n\n" + res;
};


function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}