const formX = document.getElementById("valueX");
const labelX = document.getElementById("labelX");
const formR = document.getElementById("valueR");
const labelR = document.getElementById("labelR");
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

let mash = 100;
let particles = [];

const canvas = document.getElementById("grafic");

// задаем размеры, если клиентские равны нулю
if (canvas.width === 0 || canvas.height === 0 || canvas.width === 500) {
    canvas.width = canvas.clientWidth || 500;
    canvas.height = canvas.clientHeight || 500;
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(50, canvas.width / canvas.height, 1, 2000);
camera.position.set(250, 250, 350);

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(canvas.width, canvas.height);


const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;      
controls.dampingFactor = 0.05;    

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(100, 200, 100);
scene.add(dirLight);
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    updateParticles();
    renderer.render(scene, camera);
}

animate();


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
         updateGraphOnly();
    }
})

let btextForLabelR = "Выберите R <br>Выбрано значение ";
labelR.innerHTML=btextForLabelR;
let textForR = "";
for (let index = 1; index < 6; index++) {
    textForR += `<button type='button'>${index}</button>`;    
}

formR.innerHTML = textForR;

const inputR = document.getElementById("inputR");
formR.addEventListener("click", function(event){
    if (event.target.tagName == 'BUTTON'){
        const buttons = formR.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.style.backgroundColor = ""; 
        });
        event.target.style.backgroundColor = "palevioletred";
        let buttonValueR = event.target.textContent;
        labelR.innerHTML= btextForLabelR + buttonValueR;
        inputR.value = buttonValueR;
         updateGraphOnly();
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
    if (y<-3 || y>3){
        err.innerHTML = "Координата Y должна быть в диапозоне (-3;3)";
        return;
    }
    const zInput = document.getElementById("Ztext");
        const zt = zInput ? zInput.value.replace(',', '.') : "0";
        if (zt === "" || isNaN(zt)) {
            err.innerHTML = "Координата Z должна быть числом";
            return;
        }
        const z = parseFloat(zt);

    const r= inputR.value;
    if (r == ""){
        err.innerHTML = "Введите значение R"
        return;
    }
    
     const requestBody = `x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}&z=${encodeURIComponent(z)}&r=${encodeURIComponent(r)}`;
    fetch(`/fcgi-bin/hello-world.jar?${requestBody}`,{
            method:'GET',
        }
    ).then(response =>{
        console.log("что-то даже получилось");
        if (!response.ok) {
            throw new Error('Ошибочка(((');
        }
        return response.json();
    }).then(data => {
        if (data.error) {
            err.innerHTML = `Ошибка сервера ${data.error}`;
            return;            
        }
        err.innerHTML = "Данные успешно обработаны";
        const today = new Date().toLocaleDateString("ru-RU");
        const result = {
        x: data.x,
        y: data.y,
        z: data.z,
        r: data.r,
        result: data.hit,
        date:`${today} ${data.currentTime}`,
        time_work:data.scriptTime
    }
    const history = JSON.parse(localStorage.getItem("lab1")) || [];
    history.unshift(result);
    localStorage.setItem("lab1", JSON.stringify(history));
    loadBodyTable();
    drawCanvas(r, x, y, z, result);

    }).catch(error => {
        console.error("Критическая ошибка JS:", error); 
        err.innerHTML = "Ошибочка ыыы(((";
    })
    

})


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
        let russianTime = element.date || "—";
        if (element.date && element.date.includes(":")) {
            const today = new Date().toLocaleDateString("ru-RU");
            russianTime = element.date;
        }
        const row = document.createElement("tr");
        row.innerHTML = `<td>${element.x}</td>
                <td>${element.y}</td>
                <td>${element.r}</td>
                <td>${element.z}</td>
                <td>${element.result}</td>
                <td>${russianTime}</td>
                <td>${element.time_work}</td>`;
        bodyTable.appendChild(row);
    });
}

loadBodyTable();
window.addEventListener('timezonechange', loadBodyTable);



//создания взрыва
function createExplosion(x, y, z, isHit) {
    const particleCount = 100; //лоличество осколков
    const geometry = new THREE.SphereGeometry(1, 8, 8); //сфера

    //зеленый при попадании,красный  при промахе
    const color = isHit ? 0x00ff00 : 0xff4500;
    const material = new THREE.MeshBasicMaterial({ color: color });

    for (let i = 0; i < particleCount; i++) {
        const mesh = new THREE.Mesh(geometry, material); //создаем наш объект
        mesh.position.set(x, y, z);
        scene.add(mesh);

        // cлучайное направление и скорость разлета
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const speed = Math.random() * 4 + 2; //  cкорость разлета

        particles.push({
            mesh: mesh,
            velocity: new THREE.Vector3(
                Math.sin(phi) * Math.cos(theta) * speed,
                Math.sin(phi) * Math.sin(theta) * speed,
                Math.cos(phi) * speed
            ),
            life: 1.0, // время жизни частицы
            decay: Math.random() * 0.02 + 0.01 //  угасания
        });
    }
}

//обновления состояния частиц на каждом кадре
function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        //двигаем частицу
        p.mesh.position.add(p.velocity);

        // Сила тяжести
        p.velocity.y -= 0.1;

        // Уменьшаем время жизни и плавно уменьшаем масштаб частицы
        p.life -= p.decay;
        p.mesh.scale.set(p.life, p.life, p.life);

        // удаляем частицу
        if (p.life <= 0) {
            scene.remove(p.mesh);
            p.mesh.geometry.dispose();
            p.mesh.material.dispose();
            particles.splice(i, 1);
        }
    }
}


let currentMeshGroup = null;

function drawCanvas(r, x, y, z, result) {
    if (currentMeshGroup) {
        scene.remove(currentMeshGroup);
    }
    currentMeshGroup = new THREE.Group();

    const R = mash;
    const R2 = R / 2;
    const heightZ = R2; 

    const extrudeSettings = {
        depth: heightZ,
        bevelEnabled: false
    };

    const materialArea = new THREE.MeshLambertMaterial({
        color: 0xffb6c1,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
    });

    const shape = new THREE.Shape();

    // прямоугольник
    shape.moveTo(0, 0);
    shape.lineTo(R, 0);
    shape.lineTo(R, R2);
    shape.lineTo(0, R2);

    // круг
    shape.lineTo(0, 0); 
    shape.lineTo(-R, 0);
    for (let theta = Math.PI; theta <= 1.5 * Math.PI; theta += 0.05) {
        shape.lineTo(R * Math.cos(theta), R * Math.sin(theta));
    }

    //Треугольник
    shape.lineTo(0, 0);
    shape.lineTo(0, -R2);
    shape.lineTo(R2, 0);
    shape.lineTo(0, 0);

    const areaGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const areaMesh = new THREE.Mesh(areaGeometry, materialArea);
    areaMesh.position.z = -heightZ / 2;
    currentMeshGroup.add(areaMesh);

    // Оси
    const axesHelper = new THREE.AxesHelper(R * 3);
    currentMeshGroup.add(axesHelper);

    // сетка
    const gridHelper = new THREE.GridHelper(300, 30, 0x888888, 0xcccccc);
    gridHelper.rotation.x = Math.PI / 2; 
    currentMeshGroup.add(gridHelper);

        if (x !== undefined && y !== undefined && result) {
            const currentR = parseFloat(r) || 1;
            const parsedX = parseFloat(x) * (R / currentR);
            const parsedY = parseFloat(y) * (R / currentR);
            const parsedZ = z !== undefined ? parseFloat(z) : 0;

            const isHit = result.result === "true" || result.result === true || result.hit === true;

            createExplosion(parsedX, parsedY, parsedZ, isHit);

            const dotGeometry = new THREE.SphereGeometry(4, 32, 32);
            const dotMaterial = new THREE.MeshBasicMaterial({
                color: isHit ? 0x00ff00 : 0xff0000
            });

            const dotMesh = new THREE.Mesh(dotGeometry, dotMaterial);
            dotMesh.position.set(parsedX, parsedY, parsedZ);
            currentMeshGroup.add(dotMesh);
        }


    scene.add(currentMeshGroup);
}

function updateGraphOnly() {
    const rVal = parseFloat(inputR.value);
    if (!isNaN(rVal)) {
        drawCanvas(rVal, undefined, undefined, undefined);
    } else {
        drawCanvas(1, undefined, undefined, undefined);
    }
}


canvas.addEventListener("click", function(event) {
    //вычисляем координаты клика
    const rect = canvas.getBoundingClientRect();
    const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1,
        -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1
    );

    // Создаем луч из камеры через точку клика
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Ищем пересечение луча с плоскостью xy
    const planeXY = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const targetPoint = new THREE.Vector3();

    if (raycaster.ray.intersectPlane(planeXY, targetPoint)) {
        const currentR = parseFloat(inputR.value);
        if (isNaN(currentR)) {
            err.innerHTML = "Сначала выберите радиус R для расчета координат клика";
            return;
        }

        const calculatedX = (targetPoint.x / mash) * currentR;
        const calculatedY = (targetPoint.y / mash) * currentR;
        const calculatedZ = 0; // При клике по плоскости Z всегда равен 0

        // Подставляем значения в поля ввода на интерфейсе
        inputX.value = Math.round(calculatedX); // Округляем до целого для кнопок X
        document.getElementById("Ytext").value = calculatedY.toFixed(4);
        if (document.getElementById("Ztext")) {
            document.getElementById("Ztext").value = calculatedZ.toFixed(4);
        }

        // Подсвечиваем соответствующую кнопку X, если попали в диапазон
        const buttons = formX.querySelectorAll('button');
        buttons.forEach(btn => btn.style.backgroundColor = "");
        const matchedButton = Array.from(buttons).find(btn => btn.textContent == Math.round(calculatedX));
        if (matchedButton) {
            matchedButton.style.backgroundColor = "palevioletred";
            labelX.innerHTML = btextForLabelX + Math.round(calculatedX);
        }
        forma.requestSubmit();
    }
});

updateGraphOnly();

renderer.render(scene, camera);

