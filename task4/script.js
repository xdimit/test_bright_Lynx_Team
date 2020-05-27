"use strict"

const arr = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'],
    ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'],
    ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8'],
    ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8'],
    ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8'],
];

const container = document.getElementById('container');
let cache = null;

function createChessField() {
    let table = document.createElement('table');
    table.classList.add('field');
    for (let i = 0; i < 8; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 8; j++) {
            let cell = document.createElement('td');
            cell.setAttribute('data-cell', arr[i][j]);
            if (i % 2 == j % 2) {
                cell.className = "white";
            } else {
                cell.className = "black";
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    container.appendChild(table);
};

createChessField();

container.onclick = function(e) {

    let target = e.target;

    if (cache != null) {
        rebootChessField();
        cache = null;
        return;
    }

    if (target.tagName == 'TD') {
        checkMoves(target);
    }
};

function rebootChessField() {
    container.innerHTML = '';
    createChessField();
};

function checkMoves(elem) {

    cache = elem;
    cache.style.backgroundColor = 'blue';

    let coord = getCoords(elem);

    let el = null;


    let possibleMoves = [ // для удобства возможные хода 
        { a: -2, b: -1 }, // оформляю ввиде массива обектов со слогаемыми числами к ходу позиции
        { a: -2, b: +1 },
        { a: -1, b: -2 },
        { a: -1, b: +2 },
        { a: +1, b: -2 },
        { a: +1, b: +2 },
        { a: +2, b: -1 },
        { a: +2, b: +1 }
    ];

    for (let i = 0; i < possibleMoves.length; i++) { // получаем искомые координаты
        let res1 = coord.x + possibleMoves[i].a;
        let res2 = coord.y + possibleMoves[i].b; // чтоб избежать выхода 
        if (res1 < 0 || res2 < 0 || res1 > 7 || res2 > 7) continue; // за приделы доски проверяем условия
        el = arr[res1][res2];

        findCell(el);

    }

    // return str;
};

function findCell(el) {

    let field = document.querySelector('.field');

    for (let i = 0; i < field.rows.length; i++) {

        for (let j = 0; j < field.rows[i].cells.length; j++) {
            let nameAttr = field.rows[i].cells[j];
            if (nameAttr.dataset.cell == el) {

                nameAttr.style.backgroundColor = 'green';
            }
        }
    }
};

function getCoords(elem) {
    let attrName = elem.dataset.cell;
    for (let i = 0; i < arr.length; i++) {
        let j = arr[i].indexOf(attrName);
        if (arr[i][j] == attrName) {
            return { x: i, y: j };
        }
    }
};