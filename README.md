# psjs.js

## Описание

Микро библиотека **psjs.js** предназначена для верстки с использованием ограниченного синтаксиса Pug и Sass непосредственно в файле скрипта.

## Вспомогательные средства

Библиотека содержит следующие вспомогательные функции:

1. **sel(target)** – аналогично document.querySelectorAll(target), 
однако возвращает массив (не псевдомассив!) DOM элементов или же просто элемент, если он только один.
2. **lis(eventType, process)** – укороченная форма записи window.addEventListener(eventType, process).
3. **log(info)** – укороченная форма записи console.log(info).
4. **raf(cb)** – укороченная форма записи requestAnimationFrame(cb).
5. **caf(cb)** – укороченная форма записи cancelAnimationFrame(cb).
6. **gs(element)** – укороченная форма записи getComputedStyle(element).
7. **crAr(size, value?)** - создает массив длиной size и заполняет его value или нулями, если параметр не указан.


## Пользовательский интерфейс

1. **crEl(str, ref?, mode?)** 