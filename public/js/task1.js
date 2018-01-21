function func(s, a, b) {
    
    if (s.match(/^$/)) {
        return -1;
    }

    var i = s.length -1;
    var aIndex =     -1;
    var bIndex =     -1;
    
    while ((aIndex == -1) && (bIndex == -1) && (i > 0)) {
        if (s.substring(i, i +1) == a) {
            aIndex = i;
        }
        if (s.substring(i, i +1) == b) {
            bIndex = i;
        }
        i = i - 1;
    }
    
    if (aIndex != -1) {
        if (bIndex == -1) {
            return aIndex;
        }
        else {
            return Math.max(aIndex, bIndex);
        }
    }
    
    if (bIndex != -1) {
        return bIndex;
    }
    else {
        return -1;
    }
}

var strSearch = "hello my little friend";

console.log(
    "func('h','m') result: " + 
    func(strSearch,"h","m")
);

/*
Вернет первый с конца индекс из набора индексов вхождений символов a и b.
Минусы:
- не работает с подстроками более одного символа
- нельзя искать из набора больше двух элементов
- вернет -1 если это первый символ (индекс 0)
- лишний код, использование регулярных выражений

Для оптимизации можно использовать встроенный js метод lastIndexOf
и es6 разложение массива в аргументе
В es5 ...sArr нужно просто заменить на sArr и аргументом должен быть массив.
*/
function getLastIndex(sStr,...sArr){
    var indArr = Array();
    for (var i = 0; i < sArr.length; i++) { 
        var indFind = sStr.lastIndexOf(sArr[i]);
        indFind !=-1 ? indArr.push(indFind) : false;
    }
    return sArr.length>0 && indArr.length>0 ? Math.max(...indArr) : -1
}

console.log(
    "getLastIndex('lo','lwe','en','lu') result: " + 
    getLastIndex(strSearch,"lo","lwe","en","lu")
);