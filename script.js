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
    //stick
    [
        [0, 1],
        [0, 2],
        [0, 3],
        //90
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2],
        ],
        //180
        [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2],
        ],
        //270
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2],
        ],
        //360
        [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2],
        ],
    ],
    //square
    [
        [1, 0],
        [0, 1],
        [1, 1],
        //90
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        //180
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        //270
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        //360
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
    ],
    //L
    [
        [1, 0],
        [0, 1],
        [0, 2],
        //90
        [
            [0, 0],
            [-1, 1],
            [1, 0],
            [2, -1],
        ],
        //180
        [
            [1, -1],
            [1, -1],
            [-1, 0],
            [-1, 0],
        ],
        //270
        [
            [-1, 0],
            [0, -1],
            [2, -2],
            [1, -1],
        ],
        //360
        [
            [0, -1],
            [0, -1],
            [-2, 0],
            [-2, 0],
        ],
    ],
    //revers L
    [
        [1, 0],
        [1, 1],
        [1, 2],
        //90
        [
            [0, 0],
            [0, 0],
            [1, -1],
            [-1, -1],
        ],
        //180
        [
            [0, -1],
            [-1, 0],
            [-2, 1],
            [1, 0],
        ],
        //270
        [
            [2, 0],
            [0, 0],
            [1, -1],
            [1, -1],
        ],
        //360
        [
            [-2, 0],
            [1, -1],
            [0, 0],
            [-1, 1],
        ],
    ],
    //flash right
    [
        [1, 0],
        [-1, 1],
        [0, 1],
        //90
        [
            [0, -1],
            [-1, 0],
            [2, -1],
            [1, 0],
        ],
        //180
        [
            [0, 0],
            [1, -1],
            [-2, 0],
            [-1, -1],
        ],
        //270
        [
            [0, -1],
            [-1, 0],
            [2, -1],
            [1, 0],
        ],
        //360
        [
            [0, 0],
            [1, -1],
            [-2, 0],
            [-1, -1],
        ],
    ],
    //flash left
    [
        [1, 0],
        [1, 1],
        [2, 1],
        //90
        [
            [2, -1],
            [0, 0],
            [1, -1],
            [-1, 0],
        ],
        //180
        [
            [-2, 0],
            [0, -1],
            [-1, 0],
            [1, -1],
        ],
        //270
        [
            [2, -1],
            [0, 0],
            [1, -1],
            [-1, 0],
        ],
        //360
        [
            [-2, 0],
            [0, -1],
            [-1, 0],
            [1, -1],
        ],
    ],
    //lego
    [
        [1, 0],
        [2, 0],
        [1, 1],
        //90
        [
            [1, -1],
            [0, 0],
            [0, 0],
            [0, 0],
        ],
        //180
        [
            [0, 0],
            [-1, 0],
            [-1, 0],
            [1, -1],
        ],
        //270
        [
            [1, -1],
            [1, -1],
            [1, -1],
            [0, 0],
        ],
        //360
        [
            [-2, 0],
            [0, -1],
            [0, -1],
            [-1, -1],
        ],
    ],
]

let currentFig = 0;
let figBody = 0;
let rotate = 1;

function createFig() {
    function getRandomFig() {
        return Math.round(Math.random() * (mainArr.length - 1))
    }

    rotate = 1;
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
        for(let i=1; i<15; i++) {
            let count = 0;
            for(let k=1; k<11; k++) {
                if(document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')) {
                    count++;
                    if(count == 10) {
                        for(let m=1; m<11; m++) {
                            document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set')
                        }
                        let set = document.querySelectorAll('.set');
                        let newSet = [];
                        for(let s=0; s<set.length; s++) {
                            let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
                            if(setCoordinates[1] > i) {
                                set[s].classList.remove('set');
                                newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1]-1}"]`));
                            }
                        }
                        for(let a=0; a<newSet.length; a++) {
                            newSet[a].classList.add('set');
                        }
                        i--;
                    }
                }
            }
        }
        for(let n=1; n<11; n++) {
            if(document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set')) {
                clearInterval(interval);
                alert('Game over!');
                break;
            }
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

    if (e.code == "ArrowLeft") {
        GetNewState(-1);
    };
    if (e.code == "ArrowRight") {
        GetNewState(1);
    };
    if (e.code == "ArrowDown") {
        moveFig();
    };
    if (e.code == "ArrowUp") {
        flag = true;

        let figNew = [
            document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFig][rotate+2][0][0]}"][posY = "${+coordinates1[1] + mainArr[currentFig][rotate+2][0][1]}"]`),
            document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFig][rotate+2][1][0]}"][posY = "${+coordinates2[1] + mainArr[currentFig][rotate+2][1][1]}"]`),
            document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFig][rotate+2][2][0]}"][posY = "${+coordinates3[1] + mainArr[currentFig][rotate+2][2][1]}"]`),
            document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFig][rotate+2][3][0]}"][posY = "${+coordinates4[1] + mainArr[currentFig][rotate+2][3][1]}"]`),
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

            if(rotate < 4){
                rotate++;
            } else {
                rotate = 1;
            }
        }
    };
})
