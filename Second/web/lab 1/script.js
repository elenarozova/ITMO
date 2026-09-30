const formX = document.getElementById("valueX");
const labelX = document.getElementById("labelX");
const forma = document.getElementById("forma");
const err = document.getElementById("error");
const bodyTable = document.getElementById("bodyTable");
const clear = document.getElementById("clearLocalStorage");
const butPag = document.getElementById("buttonPagin");
const textPag = document.getElementById("textPagin");
const pagForm = document.getElementById("pagForm");
const labPag = document.getElementById("labPag");
const butLast = document.getElementById("last");
const butNext = document.getElementById("next");
let currentPage = 1;
let chocenRow = null;

const canvas = document.getElementById("grafic");
const ctx = canvas.getContext('2d');
ctx.setTransform(1, 0, 0, 1, 0, 0); 
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.scale(1, -1);




let btextForLabelX = "Выберите X <br>Выбрано значение ";
labelX.innerHTML=btextForLabelX;
let textForX = "";
for (let index = -4; index < 5; index++) {
    textForX += `<button type='button'>${index}</button>`;    
}

formX.innerHTML = textForX;

const inputX = document.getElementById("inputX");
formX.addEventListener("click", function(event){
    if (event.target.tagName == 'BUTTON'){
        const buttons = formX.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.style.backgroundColor = ""; 
        });
        event.target.style.backgroundColor = "palevioletred";
        let buttonValueX = event.target.textContent;
        labelX.innerHTML= btextForLabelX + buttonValueX;
        inputX.value = buttonValueX;
    }
})

clear.addEventListener("click", function(event){
    localStorage.clear();
    bodyTable.innerHTML = "";
})

pagForm.addEventListener("submit",function(event){
    event.preventDefault();
    currentPage = 1;
    const pagTest = textPag.value.replace(",",".");
    if(pagTest == ""){
        labPag.innerHTML = "";
        chocenRow = null;
        loadBodyTable();
        return;
    }
    if(isNaN(pagTest)){
        labPag.innerHTML = "Значение для пагинации должно быть числом"
        return;
    }
    const pag = Number(pagTest);
    if(!Number.isInteger(pag)){
        labPag.innerHTML = "Значение должно быть натуральным числом";
        return;
    }
    chocenRow = pag;
    loadBodyTable();

})
butLast.addEventListener("click",function(event){
    if (chocenRow!=null) {
        if (currentPage>1){
            currentPage-=1;
            loadBodyTable();
        }
    }
})
butNext.addEventListener("click", function(event){
    if(chocenRow!=null){
        const history = JSON.parse(localStorage.getItem("lab1")) || [];
        const countPage = Math.ceil(history.length/chocenRow);
        if (currentPage<countPage){
            currentPage+=1;
            loadBodyTable();
        }
    }
})

forma.addEventListener("submit", function(event){
    event.preventDefault();
    err.innerHTML = "";
    const x = inputX.value;
    if (!x) {
        err.innerHTML = "Введите значение X";
        return;
    }
    const yt = document.getElementById("Ytext").value.replace(',','.');
    if (yt == ""){
        err.innerHTML = "Введите значение Y"
        return;
    }
    if (isNaN(yt)) {
        err.innerHTML = "Координата Y должна быть числом";
        return;
    }
    const y = parseFloat(yt);
    if (y<=-5 || y>=5){
        err.innerHTML = "Координата Y должна быть в диапозоне (-5;5)";
        return;
    }

    const rt = document.getElementById("Rtext").value.replace(',','.');
    if (rt == ""){
        err.innerHTML = "Введите значение R"
        return;
    }
    if (isNaN(rt)) {
        err.innerHTML = "Координата R должна быть числом";
        return;
    }
    const r = parseFloat(rt);
    if (r<=2|| r>=5){
        err.innerHTML = "Координата R должна быть в диапозоне (2;5)";
        return;
    }

    const result = math(x,y,r);
    const response = {
        x: x,
        y: y,
        r: r,
        result: result,
        date: new Date().toISOString()
    }
    const history = JSON.parse(localStorage.getItem("lab1")) || [];
    history.unshift(response);
    localStorage.setItem("lab1", JSON.stringify(history));
    loadBodyTable();
    drawCanvas(r,x,y,result);


})

function math(x,y,r){
    if (x<0 && y>0){
        return false;
    }
    if ((-x + r/2 <y) && x>=0 && y>=0){
        return false;
    }
    if (x<=0 && y<=0 && (y<-r || x<-r/2)){
        return false;
    }
    if (Math.pow(x,2)+Math.pow(y,2)>Math.pow(r,2) && x>=0 && y<=0) {
        return false;
    }
    return true;
}
function loadBodyTable(){
    
    bodyTable.innerHTML='';
    const history = JSON.parse(localStorage.getItem("lab1")) || [];

    let someHistory = history; 
    if (chocenRow){
        const start = (currentPage-1)*chocenRow;
        const end = start + chocenRow;
        someHistory = history.slice(start, end);
    }
    someHistory.forEach(element => {
        const dateTime = new Date(element.date);
        const russianTime = dateTime.toLocaleString("ru-RU");
    
        const row = document.createElement("tr");
        row.innerHTML = `<td>${element.x}</td>
                <td>${element.y}</td>
                <td>${element.r}</td>
                <td>${element.result}</td>
                <td>${russianTime}</td>`;
        bodyTable.appendChild(row);
    });
}

loadBodyTable();
window.addEventListener('timezonechange', loadBodyTable);

let mash = 100;

function drawCanvas(r,x,y,result){

    const R = mash;
    const R2 = R / 2;
    ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.moveTo(0,R2);
    ctx.lineTo(R2,0);
    ctx.arc(0,0,R,0,-Math.PI/2,true);
    ctx.lineTo(-R2,-R);
    ctx.lineTo(-R2,0);
    ctx.lineTo(0,0);
    ctx.closePath();
    ctx.fillStyle = "rgba(255, 182, 193,0.5)";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-canvas.width/2,0);
    ctx.lineTo(canvas.width/2,0);
    ctx.moveTo(0, -canvas.height / 2);
    ctx.lineTo(0, canvas.height / 2);
    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = "12px Arial";
    ctx.fillStyle = "black";

    function drawText(text,x,y){
        ctx.save();
        ctx.scale(1,-1);
        ctx.fillText(text,x,y);
        ctx.restore();
    }

    let parsedR = parseFloat(r);
    let isNum = (typeof parsedR === 'number' && !isNaN(parsedR));
    
    let textR = isNum ? parsedR.toString() : "R";
    let textMinusR = isNum ? (-parsedR).toString() : "-R";
    let textR2 = isNum ? (parsedR / 2).toString() : "R/2";
    let textMinusR2 = isNum ? (-parsedR / 2).toString() : "-R/2";

    drawText("X", canvas.width/2-15, -5);
    drawText("Y" , 5, -canvas.height/2+15);

    drawText(textR, R, 0);
    drawText(textMinusR, -R, 0);
    drawText(textR, 0, -R);
    drawText(textMinusR, 0, R);

    drawText(textR2, R2, 0);
    drawText(textR2, 0, -R2);
    drawText(textMinusR2, -R2, 0);
    drawText(textMinusR2, 0, R2);

    if (x!=undefined && y!=undefined && isNum) {
        const newX = (parseFloat(x) / parsedR) * mash;
        const newY = (parseFloat(y) / parsedR) * mash;
        ctx.beginPath();
        ctx.arc(newX,newY, 3, 0, Math.PI*2);
        if (result== true){
            ctx.fillStyle="purple";
        } else {
            ctx.fillStyle = "red";
        }
        ctx.fill();
    }

}
canvas.addEventListener("wheel", function(event){
       event.preventDefault();
       if (event.deltaY<0){
            mash+=10;
       } else {
        mash -=10;
       }
       if (mash<20){
        mash=20;
       }
       if (mash>400) {
        mash=400;        
       }
       const rVal = parseFloat(document.getElementById("Rtext").value);
       const xVal = parseFloat(inputX.value);
       const yVal = parseFloat(document.getElementById("Ytext").value);

       let resVal = undefined;
       if (!isNaN(xVal) && !isNaN(yVal) && !isNaN(rVal)) {
           resVal = math(xVal, yVal, rVal);
       }
       drawCanvas(rVal, xVal, yVal, resVal);
}, {passive:false})



drawCanvas(undefined,undefined,undefined,undefined);