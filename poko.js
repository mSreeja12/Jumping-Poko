let isGameOver = false; 
let score = 0;
let cross = true;

document.onkeydown = function(e) {
    if (isGameOver) return; // Prevent further actions if game is over

    const poko = document.querySelector('.poko');
    if (!poko) return; // Exit if poko element is not found

    console.log("Key code is: ", e.keyCode);

    let pokoX = parseInt(window.getComputedStyle(poko, null).getPropertyValue('left'), 10);
    if (isNaN(pokoX)) {
        pokoX = 0; 
        poko.style.left = pokoX + 'px';
    }

    const moveDistance = 50; // Adjust this value for the desired speed

    if (e.keyCode == 38) { // Up arrow key
        poko.classList.add('animatePoko');
        setTimeout(() => {
            poko.classList.remove('animatePoko');
        }, 600); // Match the duration in the CSS animation
    }

    if (e.keyCode == 39) { // Right arrow key
        pokoX = parseInt(window.getComputedStyle(poko, null).getPropertyValue('left'), 10);
        poko.style.left = (pokoX + moveDistance) + "px";
        console.log(`Move right: new left position is ${poko.style.left}`);
    }

    if (e.keyCode == 37) { // Left arrow key
        pokoX = parseInt(window.getComputedStyle(poko, null).getPropertyValue('left'), 10);
        poko.style.left = (pokoX - moveDistance) + "px";
        console.log(`Move left: new left position is ${poko.style.left}`);
    }
};
 
document.addEventListener("DOMContentLoaded", () => {
    const scoreCon = document.querySelector('.scoreCon');
    const poko = document.querySelector('.poko');
    const gameOver = document.querySelector('.gameOver');
    const obstracle = document.querySelector('.obstracle');

    if (!poko || !gameOver || !obstracle || !scoreCon) {
        console.error('Missing elements:', { poko, gameOver, obstracle, scoreCon });
        return;
    }

    setInterval(() => {
        if (isGameOver) return;

        const pokoRect = poko.getBoundingClientRect();
        const obstracleRect = obstracle.getBoundingClientRect();

        const offsetX = Math.abs(pokoRect.left - obstracleRect.left);
        const offsetY = Math.abs(pokoRect.top - obstracleRect.top);

        console.log(`OffsetX: ${offsetX}, OffsetY: ${offsetY}`);

        // Detect if the rectangles overlap
        const overlapX = !(pokoRect.right < obstracleRect.left || pokoRect.left > obstracleRect.right);
        const overlapY = !(pokoRect.bottom < obstracleRect.top || pokoRect.top > obstracleRect.bottom);

        if (overlapX && overlapY) {
            isGameOver = true;
            gameOver.style.visibility = 'visible';
            obstracle.classList.remove('obstracleAni');
            console.log('Game Over triggered');
        } else if (pokoRect.right > obstracleRect.left && pokoRect.left < obstracleRect.right && pokoRect.bottom < obstracleRect.top && cross) {
            // Ensure score is updated only when poko successfully jumps over the obstacle without collision
            score += 1;
            updateScore(score);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);
        }
    }, 100);

    function updateScore(score) {
        if (scoreCon) {
            scoreCon.innerHTML = "Your score: " + score;
            console.log('Score updated:', score);
        } else {
            console.error('Score container not found');
        }
    }
});
