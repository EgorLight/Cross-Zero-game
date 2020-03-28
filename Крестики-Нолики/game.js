// Инициализация переменных и массива.
const VOID = 0;
const ZEROS = 1;
const CROSSES = 2; 

const WIN_CASES = [
    '100010001',
    '001010100',
    '111000000',
    '000111000',
    '000000111',
    '100100100',
    '010010010',
    '001001001'
]

var cells = new Array(9);
cells = cells.fill(0);
var activePlayer = selectSide();
var i;

addEventsListeners();

// Обнуление игры.
function clearGame() {
    cells = cells.fill(0);
    for (i = 0; i < 9; i++) {
        document.getElementById(i).className = "cell";
    }
}

// Выбор стороны (крестики/нолики).
function selectSide() {
    return ZEROS;
}

// Добавление обработчиков ко всем клеткам.
function addEventsListeners() {
    for (i = 0; i < 9; i++) {
        document.getElementById(i).addEventListener('click', takeCell);
    }
    document.getElementById('clearButton').addEventListener('click', clearGame);
}

// Проверка клетки на занятость.
function checkPlace(cell) {
    var cellId = cell.id;
    if (cells[cellId] == VOID) {
        return true;
    }
    else {
        return false;
    }
}

// Проверка на ничью.
function checkDraw() {
    if (cells.indexOf(0,0) == -1) {
        return true;
    }
    else {
        return false;
    }
}

// Проверка на победу.
function checkWin(side) {
    var cellsStr = cells.join('');

    if (side == ZEROS) {
        cellsStr = cellsStr.replace(/2/g,'0');
    }
    if (side == CROSSES) {
        cellsStr = cellsStr.replace(/1/g,'0');
        cellsStr = cellsStr.replace(/2/g,'1');
    }

    if (WIN_CASES.indexOf(cellsStr, 0) != -1) {
        return true;
    } 
    else {
        return false;
    }
}

// Заниятие ячейки.
function takeCell() {

    // Если ячейка свободна, то занять ее.  
    if (checkPlace(event.target) == true) {
        
        //Визуальная вставка крестика/нолика.
        (activePlayer == ZEROS) ? event.target.className = "cell zero" : event.target.className = "cell cross";
        
        // Добавление значений в массив cells
        var cellId = event.target.id;
        cells[cellId] = activePlayer;

        // Смена хода
        (activePlayer == ZEROS) ? activePlayer = CROSSES : activePlayer = ZEROS;

        // Проверка на победу игроков
        if (checkWin(ZEROS) == true) {
            alert('Нолики победили!');
        }
        if (checkWin(CROSSES) == true) {
            alert('Крестики победили!');
        }

        // Проверка на ничью
        if (checkDraw() == true) {
            alert('Ничья!');
        }
    }
}
