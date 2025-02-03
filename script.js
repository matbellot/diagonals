function calcolaDiagonali(n) {
    return (n * (n - 3)) / 2;
}

function disegnaPoligono() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const numLati = parseInt(document.getElementById('numLati').value);
    
    // Verifica input
    if (numLati < 3) {
        alert('Il numero di lati deve essere almeno 3');
        return;
    }

    // Calcola il numero di diagonali
    const numeroDiagonali = calcolaDiagonali(numLati);
    document.getElementById('risultato').textContent = 
        `Numero di diagonali: ${numeroDiagonali}`;

    // Pulisci il canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Parametri per il disegno
    const centro = { x: canvas.width / 2, y: canvas.height / 2 };
    const raggio = 150;
    const angolo = (2 * Math.PI) / numLati;

    // Calcola i punti del poligono
    const punti = [];
    for (let i = 0; i < numLati; i++) {
        punti.push({
            x: centro.x + raggio * Math.cos(i * angolo - Math.PI / 2),
            y: centro.y + raggio * Math.sin(i * angolo - Math.PI / 2)
        });
    }

    // Disegna il poligono
    ctx.beginPath();
    ctx.moveTo(punti[0].x, punti[0].y);
    for (let i = 1; i < punti.length; i++) {
        ctx.lineTo(punti[i].x, punti[i].y);
    }
    ctx.closePath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#2c3e50';
    ctx.stroke();

    // Disegna le diagonali
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#e74c3c';
    for (let i = 0; i < punti.length; i++) {
        for (let j = i + 2; j < punti.length; j++) {
            if (j !== (i + 1) % numLati) {
                ctx.moveTo(punti[i].x, punti[i].y);
                ctx.lineTo(punti[j].x, punti[j].y);
            }
        }
    }
    ctx.stroke();
}

// Disegna il poligono iniziale
window.onload = disegnaPoligono; 