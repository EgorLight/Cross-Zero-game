// Инициализация
var cells = [];
var move = 1;

// Создание массива со значениями ячеек (занятая/свободная)

function initialization() {
    // Обнуление ячеек

    for (var i = 0; i < 9; i++) {
        cells[i] = 0;
    }
}

initialization();

function checkDraw() {
    for (var i = 0; i < 9; i++) {
        if (cells[i] == 0) {
            return 0;
        }
    }
    return 1;
}

function checkWin() {
    if (
        ((cells[0] == 1) && (cells[1] == 1) && (cells[2] == 1)) ||
        ((cells[3] == 1) && (cells[4] == 1) && (cells[5] == 1)) ||
        ((cells[6] == 1) && (cells[7] == 1) && (cells[8] == 1)) ||
        ((cells[0] == 1) && (cells[3] == 1) && (cells[6] == 1)) ||
        ((cells[1] == 1) && (cells[4] == 1) && (cells[7] == 1)) ||
        ((cells[2] == 1) && (cells[5] == 1) && (cells[8] == 1)) ||
        ((cells[0] == 1) && (cells[4] == 1) && (cells[8] == 1)) ||
        ((cells[2] == 1) && (cells[4] == 1) && (cells[6] == 1)) 
        ) {
            return 1;
        }
    if (
        ((cells[0] == 2) && (cells[1] == 2) && (cells[2] == 2)) ||
        ((cells[3] == 2) && (cells[4] == 2) && (cells[5] == 2)) ||
        ((cells[6] == 2) && (cells[7] == 2) && (cells[8] == 2)) ||
        ((cells[0] == 2) && (cells[3] == 2) && (cells[6] == 2)) ||
        ((cells[1] == 2) && (cells[4] == 2) && (cells[7] == 2)) ||
        ((cells[2] == 2) && (cells[5] == 2) && (cells[8] == 2)) ||
        ((cells[0] == 2) && (cells[4] == 2) && (cells[8] == 2)) ||
        ((cells[2] == 2) && (cells[4] == 2) && (cells[6] == 2)) 
        ) {
            return 2;
        }
}
// Заниятие ячейки

function takePlace(cell) {

    // Если ячейка свободна, то занять ее  

    if (checkPlace(cell) == true) {
        
        //Визуальная вставка крестика/нолика

        if (move == 1) {
            cell.style.backgroundImage = 'url(circle.svg)';
        }
        else {
            cell.style.backgroundImage = 'url(cross.svg)';
        }
        
        // Добавление значений в массив cells
        var cellId = cell.id;
        cells[Number(cellId)] = move;

        

        // Смена хода

        if (move == 1) {
            move = 2;
        }
        else {
            move = 1;
        }

        // Проверка на победу игроков

        if (checkWin() == 1) {
            alert('Победили нолики!');
            playAgain();
        }
        if (checkWin() == 2) {
            alert('Победили Крестики!');
            playAgain();
        }
        // Проверка на ничью

        if (checkDraw() == 1) {
            alert('Ничья!');
            playAgain();
        };
    }
}

// Проверка ячейки на свободность

function checkPlace(cell) {
    var cellId = cell.id;
    if (cells[cellId] == 0) {
        return true;
    }
    else {
        return false;
    }
}

// Обнуление по кнопке "Начать заново"

function playAgain() {
    
    // Обнуление массива (см. строку 5)

    initialization();

    // Визуальное обнуление ячеек

    for (var i = 0; i < 9; i++) {
        document.getElementById(String(i)).style.backgroundImage = 'none';
    }
}