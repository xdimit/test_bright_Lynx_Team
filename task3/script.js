"use strict"

const color = {
    1: 'red',
    2: 'purple',
    3: 'green',
    4: 'yellow',
    5: 'blue',
    6: 'lime',
    7: 'fuchsia',
    8: 'aqua'
};

const container = document.getElementById('container');
const button = document.getElementById('button');
const timer = document.getElementById('timer');
const field = document.querySelector('.field');
let check;
let timerId;

container.addEventListener('click', setGameControl); // 1. обработчик вешаем на контейнер для удобства оптримизации на будущее

function setGameControl(e) {
    let target = e.target;

    if (target.tagName == 'INPUT') {  // при клике на кнопку:
        stopTimerGame();    // 4.2 Оставить таймер при каждом новом нажатии.
        delRandomColor();    // 6. удалить рандомную установку значений цвета
        setRandomColor();    // 2. и запустить все заново. Или с начала.
        startTimerGame();
    }

    if (target.tagName == 'TD') {  // 3. при клике по клетке:
        checkPair(target); // 3.1 ищем пару при нажатии.
        checkAllFieldColored()    // 3.3 и проверяем все ли поля закрашены.
    }
};



function setRandomColor() { // 2.1
    let obj = {};  // обьект для удобной фиксации цветов, через пару ключ = значение
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let color = checkRepeatingColor(obj, j); // устанавливаем цвет через проверку на парность
            field.rows[i].cells[j].setAttribute('data-color', color); // название цвета прикрепить к атрибуту
        }
    }
};

function checkRepeatingColor(obj, length) { // 2.2
    while (length !== 4) {
        let rand = Math.round(0.5 + Math.random() * 8); // случайная цифра от 1 до 8
        let name = color[rand]; // взять название цвета по значеню от ключей объекта color

        if (!obj.hasOwnProperty(name)) { // заполняем обект свойствами из названия цветов
            obj[name] = 1;
            return name;
        } else if (obj[name] < 2) { // значения свойства ограницивает создания больше чем пары цветов
            obj[name] = 2;
            return name;
        }
    }
};

function checkPair(elem) {  // 3.2

    if (check == null && elem.style.backgroundColor != '') return; // от повторно нажатия по той же уже нажатой клетке

    if (!check) {
        let colorName = elem.dataset.color;
        elem.style.backgroundColor = colorName;
        check = elem;
    } else if (check.getAttribute('data-color') == elem.getAttribute('data-color')) {
        let colorName = elem.dataset.color;
        elem.style.backgroundColor = colorName;
        if (check === elem) return; // клик по той же клетке пропускаем
        check = null;
    } else {
        check.style.backgroundColor = '';
        check = null
    }
};

function checkAllFieldColored() { // 3.4
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (field.rows[i].cells[j].style.backgroundColor == '') return; // искать не закрашенные клетки
        } // если не нашлось не закрашеных клеток останавливаем игру
    }
    stopTimerGame(); // 4.
    createWinWindow(); // 5.
};

function delRandomColor() { // 6.1
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            field.rows[i].cells[j].style.backgroundColor = '';
            field.rows[i].cells[j].removeAttribute('data-color');
        }
    }
};

function startTimerGame() {  // 2.3
    let ms = 0,
        s = 0,
        m = 0;

    timerId = setInterval(() => {
        ms += 10;
        let milisec = ms;

        if (ms > 990) {
            s++;
            ms = 0;
        }
        let min = m;

        if (s == 60) {
            m++;
            s = 0;
        }
        let sec = s;

        if (min < 10) min = '0' + min;
        if (sec < 10) sec = '0' + sec;
        if (milisec < 100) milisec = '0' + milisec;
        if (milisec < 10) milisec = '00' + milisec;

        timer.innerHTML = min + ':' + sec + ':' + milisec;
    }, 10);
};

function stopTimerGame() { // 4.1
    clearInterval(timerId);
    timerId = null;
};

function createWinWindow() { // 5.1
    let div = document.createElement('div');
    div.innerHTML = 'Вы выиграли!' + '<br>' + 'Затраченное время: ' + timer.innerHTML;
    div.className = 'end-game';
    container.removeChild(timer);
    container.replaceChild(div, button);
};