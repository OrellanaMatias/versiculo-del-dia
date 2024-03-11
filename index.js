////////////////////////////////////////////////////////////////////////////////////////////
"use strict"; //aja
// Variables //////////////////////////////////////////////////////////////////////////////
const bible = document.querySelector('.bible');
const titleBible = document.querySelector('.bible__title');
const verseBible = document.querySelector('.bible__verse');
const subtitleBible = document.querySelector('.subtitle-bible ');
const bibleSaveData = document.querySelector('.bible-save__data');
const bibleSaveTitle = document.querySelector('.bible-save__title');
const bibleSaveVerse = document.querySelector('.bible-save__verse');
const bibleSaveC = document.querySelectorAll('.bible-save__card');
const btnFear = document.querySelector('.btn__fear');
const btnCure = document.querySelector('.btn__cure');
const btnLove = document.querySelector('.btn__love');
const btnHelp = document.querySelector('.btn__help');
const btnFortify = document.querySelector('.btn__fortify');
const btnEncouragement = document.querySelector('.btn__encouragement');
const btnWordDay = document.querySelector('.btn__wordOfTheDay');
const btnToSaveVes = document.querySelector('.bible__btn');
const btnDeleteVerses = document.querySelector('.btn__deleteVerses');
const bibleHidden = document.querySelector('.hidden');
const bibleSave = document.querySelector('.bible-save');
const btnsContainer = document.querySelectorAll('.btns-container a');
const setArrayInfo = [];

///////////////////////////////////

let nSaveVerse = 0;
let saveArrayStorageClone = [];
let arrSaveVersicleCreateEl = [];
let arrRegulizeHeigth = [];
const bibleMain = document.querySelector('.bible-main');
if (localStorage.getItem(`livro_${nSaveVerse}`)) {
    bibleHidden?.classList.remove('hidden');
    bibleSave?.classList.remove('hidden');
    for (let i = 0; i < 20; i++) {
        if (localStorage[`livro_${i}`] && localStorage[`versiculo_${i}`] !== undefined) {
            setTimeout(() => {
                titleBible.textContent = localStorage[`livro_${nSaveVerse}`];
                verseBible.textContent = localStorage[`versiculo_${nSaveVerse}`];
                createElements(localStorage[`livro_${nSaveVerse}`], localStorage[`versiculo_${nSaveVerse}`], bibleSaveData.textContent = localStorage[`data_${nSaveVerse}`]);
                nSaveVerse++;
                setTimeout(() => {
                    const bibleSaveSpan = document.querySelector('.bible-save span');
                    bibleSaveSpan.textContent = '';
                }, 1);
            }, 1000);
        }
        btnDeleteVerses.getAttribute('class')?.includes('hidden') ? btnDeleteVerses.classList.remove('hidden') : false;
    }
}
if (bible?.getAttribute('class') === 'bible') {
    btnsContainer.forEach(btn => btn.classList.remove('hidden'));
}
function bibleVerses(info) {
    let nameBook = info[0];
    let numberBook = info[1];
    let verseBook = info[2];
    fetch(`https://www.abibliadigital.com.br/api/verses/nvi/${nameBook}/${numberBook}/${verseBook}`)
        .then(data => data.json()).then(word => {
        titleBible.textContent = `${word.book.name} ${word.number}:${word.chapter}`;
        verseBible.textContent = `${word.text}`;
        if (setArrayInfo.length >= 2) {
            setArrayInfo.pop();
            setArrayInfo.pop();
            setArrayInfo.push(titleBible.textContent, verseBible.textContent);
        }
        else if (setArrayInfo.length === 0) {
            setArrayInfo.push(titleBible.textContent, verseBible.textContent);
        }
        saveVersicle();
    });
}
//444444444444444444444444444444444444444444444444444444444444444444
function wordDay(word) {
    let wordsArr = Object.values(word);
    let allWordsTogether = wordsArr.flatMap(w => w);
    let generateRndNumb = nRnd(+allWordsTogether.length);
    let infoSave = allWordsTogether[generateRndNumb];
    bibleVerses(infoSave);
    setTimeout(() => {
        bible?.classList.remove('hidden');
        btnsContainer.forEach(btn => {
            btn.classList.remove('hidden');
        });
    }, 350);
    return infoSave;
}
//333333333333333333333333333333333333333333333333333333333333333333333
function addBtns(nameBtn, cbVerses) {
    nameBtn.addEventListener('click', (e) => {
        e.preventDefault();
        generateVerses(cbVerses);
    });
}
//2222222222222222222222222222222222222222222222222222222222222222222222
function generateVerses(typeKeyWord) {
    let generateRndNumb = nRnd(typeKeyWord.length);
    bibleVerses(typeKeyWord[generateRndNumb]);
    setTimeout(() => {
        bibleHidden?.classList.remove('hidden');
    }, 350);
}
//1111111111111111111111111111111111111111111111111111111111111111111111
function nRnd(higherNum) {
    return +((Math.random() * (higherNum - 1)).toFixed());
}
// Calcular la fecha de hoy (es-AR)
function calculateData() {
    let dateToday = new Date();
    return `${new Intl.DateTimeFormat('es-AR').format(dateToday)}`;
}
// Creo un elemento para guardar el libro, versiculo y fecha
function createElements(bookBible, versiculo, dataBible) {
    const h2 = document.createElement('h2');
    const p = document.createElement('p');
    const span = document.createElement('span');
    const div = document.createElement('div');
    // Le añado clases a los elementos HTML
    h2.classList.add('bible__title');
    p.classList.add('bible__verse');
    span.classList.add('.bible-save__data');
    div.classList.add('bible-save__card');
    // Le añado estilos a los elementos HTML
    span.style.float = 'right';
    span.style.fontSize = '1.35rem';
    span.style.color = '#35691d';
    span.style.fontWeight = '600';
    span.style.animation = 'moveInLeft .2s';
    // Pusheo/indico contenido a los elementos HTML, onda, la variable que muestra
    h2.textContent = bookBible;
    p.textContent = versiculo;
    span.textContent = dataBible;
    setTimeout(() => {
        div.append(h2, p, span);
        bibleSave?.classList.remove('hidden');
        bibleSave?.appendChild(div);
    }, 500);
}
// Guardar un versiculo
let arrSaveVersicle = [];
let arrEscolhid = [];
function saveVersicle() {
    btnToSaveVes.addEventListener('click', (e) => {
        subtitleBible?.classList.remove('hidden');
        if (btnDeleteVerses?.getAttribute('class')?.includes('hidden')) {
            btnDeleteVerses.classList.remove('hidden');
        }
        // Creo un elemento para guardar el versiculo
        const h2 = document.createElement('h2');
        const p = document.createElement('p');
        const span = document.createElement('span');
        const div = document.createElement('div');
        // Añado clases al elemento HTML
        h2.classList.add('bible__title');
        p.classList.add('bible__verse');
        span.classList.add('.bible-save__data');
        div.classList.add('bible-save__card');
        // Añado estilos al elemento HTML
        span.style.float = 'right';
        span.style.fontSize = '1.35rem';
        span.style.color = '#35691d';
        span.style.fontWeight = '600';
        // Pusheo/indico lo que muestra el elemento HTML
        h2.textContent = setArrayInfo[0];
        p.textContent = setArrayInfo[1];
        span.textContent = calculateData();
        arrSaveVersicle.push(h2.textContent, p.textContent, span.textContent);
        arrEscolhid.push(h2.textContent, p.textContent, span.textContent);
        e.preventDefault();
        if (arrSaveVersicle.length <= 3) {
            setTimeout(() => {
                div.append(h2, p, span);
                bibleSave?.classList.remove('hidden');
                bibleSave?.appendChild(div);
                arrSaveVersicle.length = 0;
            }, 200);
        }
        setTimeout(() => {
            localStorageFn();
        }, 200);
    });
    function localStorageFn() {
        let arrTesting = [];
        const bibleSaveC = document.querySelectorAll('.bible-save__card');
        let numberTest = 0;
        saveArrayStorageClone = arrTesting;
        bibleSaveC.forEach(b => {
            arrTesting.push(b);
            if (arrTesting.length >= 0) {
                let bookBible = arrTesting[numberTest].childNodes[0].textContent;
                let verseBible = arrTesting[numberTest].childNodes[1].textContent;
                let dataBible = arrTesting[numberTest].childNodes[2].textContent;
                localStorage.setItem(`livro_${numberTest}`, bookBible);
                localStorage.setItem(`versiculo_${numberTest}`, verseBible);
                localStorage.setItem(`data_${numberTest}`, dataBible);
                numberTest++;
            }
        });
    }
}
// Aca pongo los versiculos, con la abreviatura que dice la API
let versicles = {
    fear: [
        ['sl', 34, 4],
        ['is', 41, 10],
        ['rm', 8, 28],
        ['sl', 86, 11],
        ['2co', 1, 5],
        ['sl', 10, 14],
        ['1pe', 2, 24],
        ['rm', 8, 18],
        ['sl', 119, 50],
        ['1pe', 3, 18],
        ['2co', 4, 17]
    ],
    cure: [
        ['mt', 8, 17],
        ['sl', 41, 3],
        ['job', 5, 2],
        ['2co', 5, 17],
        ['jr', 17, 14],
        ['jo', 10, 27],
        ['2co', 1, 3],
        ['1pe', 5, 7],
        ['jo', 16, 33],
        ['mt', 5, 4],
        ['mt', 11, 28],
        ['ex', 15, 26]
    ],
    love: [
        ['cl', 3, 14],
        ['jo', 8, 4],
        ['1pe', 4, 8],
        ['prv', 10, 12],
        ['jo', 5, 3],
        ['jo', 3, 11],
        ['sl', 136, 1],
        ['sl', 31, 23],
        ['mt', 7, 8],
        ['sl', 94, 18],
        ['jo', 2, 15],
        ['jo', 4, 7],
        ['1co', 16, 14]
    ],
    help: [
        ['mt', 6, 13],
        ['fp', 4, 13],
        ['2tm', 2, 22],
        ['sl', 77, 14],
        ['ec', 4, 10],
        ['js', 1, 9],
        ['2co', 4, 16],
        ['jo', 16, 24],
        ['is', 38, 5],
        ['nm', 13, 33],
        ['gl', 5, 17],
        ['sl', 34, 18]
    ],
    fortify: [
        ['mt', 7, 8],
        ['prv', 16, 3],
        ['ec', 8, 3],
        ['mt', 6, 33],
        ['jo', 15, 15],
        ['lc', 2, 11],
        ['jo', 14, 21],
        ['jo', 3, 16],
        ['sl', 5, 3],
        ['tg', 1, 22],
        ['1co', 10, 23],
        ['sl', 119, 105]
    ],
    encouragement: [
        ['jo', 5, 14],
        ['lc', 18, 27],
        ['mc', 9, 23],
        ['fp', 4, 13],
        ['nm', 23, 19],
        ['tg', 1, 4],
        ['2tm', 2, 1],
        ['jo', 8, 51],
        ['rm', 8, 28],
        ['sl', 29, 1],
        ['fp', 1, 6],
        ['fp', 4, 11]
    ],
    someVerses: [
        ['1co', 15, 54],
        ['jr', 29, 11],
        ['is', 52, 7],
        ['jo', 15, 7],
        ['fp', 4, 8],
        ['job', 5, 17],
        ['2co', 5, 21],
        ['cl', 3, 17],
        ['gn', 6, 18],
        ['sl', 51, 17],
        ['fp', 3, 13],
        ['2co', 4, 16],
        ['mt', 7, 14],
        ['1co', 10, 13],
        ['sl', 37, 5],
        ['cl', 3, 2],
        ['jo', 16, 33],
        ['rm', 8, 39],
        ['fp', 1, 6],
        ['sl', 84, 5],
        ['jr', 29, 13],
        ['1co', 13, 1]
    ]
};
// Los botonesssss
addBtns(btnFear, versicles.fear);
addBtns(btnCure, versicles.cure);
addBtns(btnLove, versicles.love);
addBtns(btnHelp, versicles.help);
addBtns(btnFortify, versicles.fortify);
addBtns(btnEncouragement, versicles.encouragement);
btnWordDay.addEventListener('click', (e) => {
    e.preventDefault();
    wordDay(versicles);
});
btnDeleteVerses.addEventListener('click', (e) => {
    const bibleSaveCardToDelete = document.querySelectorAll('.bible-save__card');
    e.preventDefault();
    bibleSaveCardToDelete.forEach(bibleSave => {
        bibleSave.remove();
    });
    localStorage.clear();
    window.location.reload();
});
