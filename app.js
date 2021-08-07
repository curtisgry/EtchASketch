const sketchContainer = document.querySelector('.sketch');
const gridBtn = document.querySelector('#gridBtn')
const clearBtn = document.querySelector('#clearBtn')
const select = document.querySelector('.grid-select');
const colorInput = document.querySelector('#colorInput')
const colorPicker = document.querySelector('#colorPicker')
const radios = document.querySelectorAll('input[type=radio]');
let colorOption = 'select'
let gridItems = [];
let colorInputValue = colorPicker.value;
let currentColor = '#000000'
let fadeCount = 0;
const fadeIndex = [80, 70, 60, 50, 40, 30, 20, 10, 0]
const rainbow = ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']


function setGridSize(gridSize) {
    const gridArea = gridSize * gridSize;
    const dimension = 100 / (Math.sqrt(gridArea))
    for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].style.width = `${dimension}%`
        gridItems[i].style.height = `${dimension}%`
    }
}

function generateGrid(gridSize) {
    const gridArea = gridSize * gridSize;
    for (let i = 0; i < gridArea; i++) {
        const block = document.createElement('DIV');
        block.classList.add('block');
        gridItems.push(block);
        sketchContainer.append(block);
    }
    setGridSize(gridSize);
}

function clearGrid(elClass = '.sketch') {
    gridItems = [];
    console.log(elClass, gridItems)
    document.querySelector(`${elClass}`).innerHTML = "";
}

function radioEvents() {
    for (let i = 0; i < radios.length; i++) {
        radios[i].addEventListener('click', function (e) {
            console.log(e.target.value)
            colorOption = e.target.value
        })
    }
}



function randRainbow(colors) {
    const rand = Math.floor(Math.random() * colors.length)
    return colors[rand]
}



colorPicker.addEventListener('input', function (e) {
    colorInputValue = this.value;
})




function addEvents() {
    for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].addEventListener('mouseover', function (e) {
            if (colorOption === 'select') {
                currentColor = colorInputValue;
                this.style.backgroundColor = currentColor;
            } else if (colorOption === 'rainbow') {
                currentColor = randRainbow(rainbow)
                this.style.backgroundColor = currentColor;
            } else if (colorOption === 'fade') {
                if (fadeCount < 8) {
                    currentColor = `hsl(0, 0%, ${fadeIndex[fadeCount]}%)`
                    fadeCount++
                    this.style.backgroundColor = currentColor;
                } else {
                    currentColor = 'hsl(0, 0%, 90%)'
                    fadeCount = 0
                    this.style.backgroundColor = currentColor;
                }


            }
        })
    }
}


generateGrid(8);
radioEvents()
addEvents();
setGridSize();

clearBtn.addEventListener('click', function (e) {
    e.preventDefault();
    clearGrid();
    generateGrid(select.value);
    addEvents();
})

gridBtn.addEventListener('click', function (e) {
    e.preventDefault();
    clearGrid();
    generateGrid(select.value);
    addEvents();
})


