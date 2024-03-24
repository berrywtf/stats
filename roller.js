
let rollCount = 3;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function rollDice() {
    return Math.max(8, Array.from({ length: 4 }, () => getRandomInt(1, 6))
        .sort((a, b) => a - b)
        .slice(1)
        .reduce((a, b) => a + b, 0));
}

function calculateModifier(stat) {
    return Math.floor((stat - 10) / 2);
}

function animateRoll(statId, modId, buttonId) {
    // Early return if stat already rolled
    if (document.getElementById(statId).value !== '0') {
        return;
    }

    let count = 0;
    const intervalId = setInterval(() => {
        if (count >= 10) { // Stop the animation after 10 cycles
            clearInterval(intervalId);
            const finalValue = rollDice();
            document.getElementById(statId).value = finalValue;
            document.getElementById(modId).value = calculateModifier(finalValue);
            document.getElementById(buttonId).style.display = 'none'; // Hide button after rolling
        } else {
            // Show random numbers during the "rolling"
            document.getElementById(statId).value = getRandomInt(1, 18);
        }
        count++;
    }, 100); // Adjust the speed of "rolling" here
}

function resetStatsAndShowButtons() {
    ['strength', 'dexterity', 'mind', 'charisma'].forEach(stat => {
        document.getElementById(`${stat}-stat`).value = 0;
        document.getElementById(`${stat}-modifier`).value = 0;
        document.getElementById(`${stat}-button`).style.display = ''; // Show button again for reroll
    });
}

document.getElementById('reroll-button').addEventListener('click', () => {
    if (rollCount > 0) {
        rollCount--;
        resetStatsAndShowButtons();
        document.getElementById('stat-message').innerText = `Stats reset. Roll each stat again. ${rollCount} rerolls left.`;
    }
});

function initialize() {
    // Attach event listeners to each stat button for rolling
    ['strength', 'dexterity', 'mind', 'charisma'].forEach(stat => {
        document.getElementById(`${stat}-button`).addEventListener('click', () => {
            animateRoll(`${stat}-stat`, `${stat}-modifier`, `${stat}-button`);
        });

        // Hide the roll button if the stat already has a value
        if (document.getElementById(`${stat}-stat`).value !== '0') {
            document.getElementById(`${stat}-button`).style.display = 'none';
        }
    });

    // Optionally, call resetStatsAndShowButtons() here if you want to reset everything on page load.
    // resetStatsAndShowButtons(); // Uncomment this line if you want to start with a clean slate every time the page loads.
}

// Initial setup to configure buttons based on current stat values
document.addEventListener('DOMContentLoaded', initialize);