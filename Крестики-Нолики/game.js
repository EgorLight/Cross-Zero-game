// Инициализация переменных и массива.
const VOID = 0;
const ZEROS = 1;
const CROSSES = 2; 

const WIN_CASES = [
    /1...1...1/,
    /..1.1.1../,
    /111....../,
    /...111.../,
    /......111/,
    /1..1..1../,
    /.1..1..1./,
    /..1..1..1/
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
    return cells[cellId] == VOID;
}

// Проверка на ничью.
function checkDraw() {
    return cells.indexOf(0,0) == -1;
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

    console.log(cellsStr);
    for (i = 0; i < 8; i++) {
        if (cellsStr.match(WIN_CASES[i]) != null) {
            return true;
        }
    }
    return false;
}

// Заниятие ячейки.
function takeCell() {

    // Если ячейка свободна, то занять ее.  
    if (checkPlace(event.target)) {
        
        //Визуальная вставка крестика/нолика.
        event.target.className = (activePlayer == ZEROS) ? "cell zero" : "cell cross";
        
        // Добавление значений в массив cells
        var cellId = event.target.id;
        cells[cellId] = activePlayer;

        // Смена хода
        (activePlayer == ZEROS) ? activePlayer = CROSSES : activePlayer = ZEROS;

        // Проверка на победу игроков
        if (checkWin(ZEROS)) {
            alert('Нолики победили!');
            return;
        }
        if (checkWin(CROSSES)) {
            alert('Крестики победили!');
            return;
        }
 
        // Проверка на ничью
        if (checkDraw()) {
            alert('Ничья!');
            return;
        }
    }
}
