let tetris = document.createElement('div');
tetris.classList.add('tetris');

for (let i=1; i<181; i++) {
    let excel = document.createElement('div');
    excel.classList.add('excel');
    tetris.appendChild(excel);
}

let main = document.getElementsByClassName('main')[0];
main.appendChild(tetris);

let excel = document.getElementsByClassName('excel');
let i = 0;

for (let y=18; y>0; y--) {
    for (let x=1; x<11; x++) {
        excel[i].setAttribute('posX', x);
        excel[i].setAttribute('posY', y);
        i++;
    }
}

let x = 5, y = 15;
let mainArr = [
    //stik
    [
        [0, 1],
        [0, 2],
        [0, 3]
    ],
    //square
    [
        [1, 0],
        [0, 1],
        [1, 1]
    ],
    //L
    [
        [1, 0],
        [0, 1],
        [0, 2]
    ],
    //revers L
    [
        [1, 0],
        [1, 1],
        [1, 2]
    ]
]

let currentFig = 0;
let figBody = 0;

function createFig() {
    function getRandomFig() {
        return Math.round(Math.random() * (mainArr.length - 1))
    }

    currentFig = getRandomFig();
    figBody  = [
         document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
         document.querySelector(`[posX = "${x + mainArr[currentFig][0][0]}"][posY = "${y + mainArr[currentFig][0][1]}"]`),
         document.querySelector(`[posX = "${x + mainArr[currentFig][1][0]}"][posY = "${y + mainArr[currentFig][1][1]}"]`),
         document.querySelector(`[posX = "${x + mainArr[currentFig][2][0]}"][posY = "${y + mainArr[currentFig][2][1]}"]`),
    ]

    for (let i=0; i<figBody.length; i++) {
        figBody[i].classList.add('figure');
    }
}

createFig(); 

function moveFig() {
    let moveFlag = true;
    let coordinates = [
        [figBody[0].getAttribute('posX'), figBody[0].getAttribute('posY')],
        [figBody[1].getAttribute('posX'), figBody[1].getAttribute('posY')],
        [figBody[2].getAttribute('posX'), figBody[2].getAttribute('posY')],
        [figBody[3].getAttribute('posX'), figBody[3].getAttribute('posY')],
    ];

    for (let i=0; i<coordinates.length; i++) {
        if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1] - 1}"]`).classList.contains('set')) {
            moveFlag = false;
            break;
        }
    }

    if (moveFlag) {
        for (let i=0; i<figBody.length; i++) {
            figBody[i].classList.remove('figure');
        }
        figBody = [
            document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] - 1}"]`),
            document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] - 1}"]`),
            document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] - 1}"]`),
            document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] - 1}"]`),
        ];
        for (let i=0; i<figBody.length; i++) {
            figBody[i].classList.add('figure');
        }
    } else {
        for (let i=0; i<figBody.length; i++) {
            figBody[i].classList.remove('figure');
            figBody[i].classList.add('set');
        }
        createFig();
    }
}

let interval = setInterval(() => {
    moveFig(); 
}, 300);

let flag = true;

window.addEventListener('keydown', function(e) {
    let coordinates1 = [figBody[0].getAttribute('posX'), figBody[0].getAttribute('posY')];
    let coordinates2 = [figBody[1].getAttribute('posX'), figBody[1].getAttribute('posY')];
    let coordinates3 = [figBody[2].getAttribute('posX'), figBody[2].getAttribute('posY')];
    let coordinates4 = [figBody[3].getAttribute('posX'), figBody[3].getAttribute('posY')];

    function GetNewState(a) {
        flag = true;

        let figNew = [
            document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${coordinates1[1]}"]`),
            document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${coordinates2[1]}"]`),
            document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${coordinates3[1]}"]`),
            document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${coordinates4[1]}"]`),
        ];

        for (let i=0; i<figNew.length; i++){
            if (!figNew[i] || figNew[i].classList.contains('set')) {
                flag = false;
            }
        }

        if (flag) {
            for (let i=0; i < figBody.length; i++) {
                figBody[i].classList.remove('figure');
            }

            figBody = figNew;

            for (let i=0; i < figBody.length; i++) {
                figBody[i].classList.add('figure');
            }
        }
    }

    if (e.keyCode == 37) {
        GetNewState(-1);
    };
    if (e.keyCode == 39) {
        GetNewState(1);
    }
    if (e.keyCode == 40) {
        moveFig();
    }
})
