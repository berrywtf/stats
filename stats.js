document.addEventListener('DOMContentLoaded', function() {
    initializeRollingMechanics();
    initializeClassSelection();
});


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

function initializeClassSelection() {
    const dropdown = document.getElementById('classDropdown');
    const classLabelInput = document.getElementById('classLabel'); // Now targeting a text input
    const classDescription = document.getElementById('classDescription');
    const classAbility = document.getElementById('classAbilities');

    // Loading the saved class selection from localStorage
    const savedClass = localStorage.getItem('selectedClass');
    if(savedClass && dropdown.querySelector(`option[value="${savedClass}"]`)) {
        dropdown.value = savedClass;
    }

    dropdown.addEventListener('change', function() {
        const selectedClass = this.options[this.selectedIndex].text; // Using option text for display
        localStorage.setItem('selectedClass', this.value); // Storing the selected class value for persistence
        classLabelInput.value = selectedClass; // Updating the text input to display the selected class name
        updateClassInfo(this.value, classDescription, classAbility);
    });

    // Manually trigger the change event on page load to update UI elements based on the current or saved selection
    dropdown.dispatchEvent(new Event('change'));
}

function updateClassInfo(className, descInput, abilitiesInput) {
    const classInfo = getClassInfo(className);
    if (classInfo) {
        descInput.value = classInfo.description;
        abilitiesInput.value = classInfo.abilities.join('\n');
    } else {
        descInput.value = 'Select a class to see the description.';
        abilitiesInput.value = 'Select a class to see the abilities.';
    }
}

function getClassInfo(className) {
    // Example classesData structure as previously defined
    const classesData = {
        Juicer: {
            description: "Light Armor. Experts in extracting essence, adept at getting information or crafting concoctions.",
            abilities: [
                "Essence Extraction: Bonus on essence extraction rolls",
                "Vitality Surge: Create a healing elixir"
            ]
        },
        Peeler: {
            description: "Medium Armor. Specialize in uncovering hidden layers and secrets, working behind the scenes.",
            abilities: [
                "Stealth Unveil: Bonus on stealth rolls",
                "Quick Peel: Swift attack with bonus to hit"
            ]
        },
        Slicer: {
            description: "Light Armor. Shields. Quick and precise warriors, preferring agility and sharp tactics over brute strength.",
            abilities: [
                "Razor Edge: Bonus on attack rolls with bladed weapons",
                "Swift Strike: Additional attack after downing an opponent"
            ]
        },
        Ripener: {
            description: "Medium Armor. Masters of growth and nurturing, seen as healers and mentors.",
            abilities: [
                "Growth Infusion: Enhance plant growth or healing"
            ]
        },
        Harvester: {
            description: "Heavy Armor. Shield. Strong and skilled in gathering resources and information, adept at acquiring what is needed.",
            abilities: [
                "Resourceful Gathering: Bonus on harvesting/gathering rolls",
                "Hardened Peel: Bonus to armor class"
            ]
        },
        Seedcaster: {
            description: "Light Armor. Visionary and strategic, planting the seeds of future success with deep insight and foresight.",
            abilities: [
                "Seed Manipulation: Control plant growth"
            ]
        }
    };
    

    return classesData[className] || null;
}