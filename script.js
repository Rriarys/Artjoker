function testBonusCode (array) { //основная функция
    function splittingToPares (origArray) { //ф-я формирующая пары нечетных чисел
        let workArray = []
        for (let i = 0; i < origArray.length; i ++) {
            workArray.push(origArray[i])
        }
        for (let i = 0; i < workArray.length; i ++) {
            if (workArray[i] % 2 === 0) {
                workArray[i] = '#'
            }
        }
        let onlyDis = workArray.join('').split('#').filter(el => el)

        if (onlyDis.length === 1) oneHundredCheck(origArray) //если одна пара

        else if (onlyDis.length === 2 && (onlyDis[0].length === 1 || onlyDis[1].length === 1)) oneHundredCheck(origArray) //если две пары, но по 1му символу

        else {
            let resultArr = []
            for (let i = 0; i < onlyDis.length; i++) {
                if (onlyDis[i].length >= 2) {
                    let point = onlyDis[i]
                    resultArr.push(point[0], point[1])
                }
            }
            if (resultArr.length >= 2) twoThousandCheck(resultArr)
            else oneHundredCheck(origArray)
        }
    }

    function twoThousandCheck (resultPairs) { //ф-я проверки пар на расположение по возрастанию
        let rArray = []
        for (let i = 0; i < resultPairs.length; i++) {
            if (i % 2 === 0) {
                if (resultPairs[i] < resultPairs[i + 1]) {
                    rArray.push(0)
                } else rArray.push(1)
            }
        }
        if (rArray.every(current => current === 0)) {
            scoreAdder(2000, '2000')
            validData()
        } else {
            scoreAdder(1000, '1000')
            validData()
        }
    }

    function oneHundredCheck (array) { //ф-я проверит на наличие только четных или нечетных, отбрасывая такие варианты, если нет хотябы 1го противоположного значения цифры
        let checkingArr = array.filter(elem => elem % 2 === 0 || elem % 2 !==0)
        if (checkingArr.length < 7) {
            let sumOfMultiple = 0
            let sumOfNotMultiple = 0
            for (let i = 0; i < array.length; i++) {
                if (array[i] % 2 === 0) {
                    sumOfMultiple += array[i]
                } else sumOfNotMultiple += array[i]
            }
            (sumOfMultiple > sumOfNotMultiple) ? scoreAdder(100, '100') : invalidData()
            validData()
        } else invalidData()
    }

    splittingToPares(array) //инициализируем ф-ю
}
function takeMainInput () { //проверяет правильность вводимых символов и их кол-во
    let mainInput = document.getElementById('main_input').value
    let array = []
    if (Number(mainInput) && mainInput.length === 8) {
        array = mainInput.split('').map(x => +x)
        testBonusCode(array)
    } else invalidData()

}
var totalScore = 0 //хранит в себе суммарное кол-во денег

function invalidData () { //чтобы красить поле в красный при вводе некоректных значений
    document.querySelector('.input_field').classList.add('input_field_invalid')
}
function validData () { //чтобы вернуть исходный вид
    document.querySelector('.input_field').classList.remove('input_field_invalid')
}

function scoreAdder (number,str) { //выводит текущее и общее значение денег
    let pWin = document.getElementById('win_p')
    let pTotal = document.getElementById('total_p')

    totalScore += number

    pWin.innerText = str
    pTotal.innerText = totalScore.toString()
}


