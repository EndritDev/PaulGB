let currentScreen = 1;

let AlterImage;

function nextScreen() {
    document.getElementById(`screen${currentScreen}`).style.display = "none";
    currentScreen++;
    document.getElementById(`screen${currentScreen}`).style.display = "flex";
    console.log(currentScreen);

    if(currentScreen==5){
        startConfettiAnimation();
    }
}


function checkCode() {
    const userCode = document.getElementById("codeInput").value.trim();
    const correctCode = "System.out.println(deinAlter);"; // Hier den erwarteten Code einfügen

    if (userCode === correctCode) {
        document.getElementById("resultMessage").innerHTML = "Richtigggg! Maschineeeee";
        nextScreen();
    } else {
        document.getElementById("resultMessage").innerHTML = "Digga wie kannst du das falsch haben no front";
    }
}

// In the JavaScript file (script.js)
const canvas = document.getElementById("drawingCanvas");
const context = canvas.getContext("2d");
let isDrawing = false;

canvas.width = window.innerWidth;
canvas.height = 300;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("touchend", stopDrawing);

function startDrawing(e) {
    e.preventDefault();
    isDrawing = true;
    draw(e);
}

function draw(e) {
    e.preventDefault();
    if (!isDrawing) return;

    const x = e.clientX || e.touches[0].clientX;
    const y = e.clientY || e.touches[0].clientY;

    context.lineWidth = 5;
    context.lineCap = "round";
    context.strokeStyle = "#000";

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
}

function stopDrawing() {
    isDrawing = false;
    context.beginPath();
}

function saveDrawing() {
    const image = canvas.toDataURL(); // Bild als Daten-URL erhalten
    AlterImage = image;
    nextScreen();
    // Hier könnten Sie die Daten weiterverarbeiten, z.B. in einer Datenbank speichern oder an einen Server senden.
}

// In der JavaScript-Datei (script.js)
document.getElementById("birthdayMessage").style.display = "none"; // Die Nachricht zuerst ausblenden
document.getElementById("AlterImage").style.display = "none";

function startConfettiAnimation() {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");
    
    document.getElementById("animation-container").style.display = "block"; // Animation-Bereich einblenden
    document.getElementById("birthdayMessage").style.display = "block"; // Nachricht einblenden
    document.getElementById("AlterImage").style.display = "block";
    document.getElementById("AlterImage").src = AlterImage;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiColors = ["#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff"];
    const confettiPieces = 100;

    function createConfettiPiece() {
        const size = Math.random() * 10 + 5;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];

        ctx.beginPath();
        ctx.arc(x, y, size, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < confettiPieces; i++) {
            createConfettiPiece();
        }

        requestAnimationFrame(animateConfetti);
    }

    animateConfetti();

    /*
    setTimeout(function () {
        document.getElementById("animation-container").style.display = "none"; // Animation-Bereich ausblenden
    }, 5000); // Stoppen Sie die Konfetti nach 5 Sekunden (kann nach Bedarf angepasst werden)
    */
}

// In der JavaScript-Datei (script.js)
let pressCounter = 0;

function pressButton() {
    const button = document.getElementById("gameButton");

    pressCounter++;

    if (pressCounter <= 5) {
        // Ändere die Position zufällig
        const randomX = Math.random() * (window.innerWidth - button.clientWidth);
        const randomY = Math.random() * (window.innerHeight - button.clientHeight);
        button.style.left = `${randomX}px`;
        button.style.top = `${randomY}px`;

        // Verringere die Durchsichtigkeit
        const opacity = 1 - pressCounter * 0.15;
        button.style.opacity = opacity;

    }

    if (pressCounter == 5) {
        nextScreen();
    }
}
