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

const button = document.getElementById('button');
const cellNumber = document.getElementById('cellNumber');
const result = document.getElementById('result');

button.onclick = function() {

    let soughtFor = cellNumber.value.toUpperCase();
    let x = 0;
    let y = 0;

    for (let i = 0; i < arr.length; i++) { // ищем номера позиций искомого эл-та в массиве 
        for (let j = 0; j < arr[i].length; j++) {
            if (soughtFor !== arr[i][j]) continue;
            x = i;
            y = arr[i].indexOf(soughtFor);
        }
    }
    if (x == 0 && y == 0 && soughtFor !== "A1") return; // x и y могут равняться нулю только при A1
    result.value = 'Возможные варианты хода: \n\n' + checkMoves(x, y);
};

function checkMoves(x, y) {
    let str = '';

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
        let res1 = x + possibleMoves[i].a;
        let res2 = y + possibleMoves[i].b; // чтоб избежать выхода 
        if (res1 < 0 || res2 < 0 || res1 > 7 || res2 > 7) continue; // за приделы доски проверяем условия
        str += arr[res1][res2] + ' ';
    }

    return str;
};