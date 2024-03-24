document.addEventListener('DOMContentLoaded', function() {
    initializeRollingMechanics();
    initializeClassSelection();
});

document.addEventListener('DOMContentLoaded', function() {
    initializeRollingMechanics();
    setupResetButton();
});

function initializeRollingMechanics() {
    document.querySelectorAll('[id$="-button"]').forEach(button => {
        button.addEventListener('click', function() {
            const statType = button.id.replace('-button', ''); // Extract stat type from button ID
            animateRoll(`${statType}-stat`, `${statType}-modifier`, button.id);
        });
    });
}

function setupResetButton() {
    // Assuming your reset button has an ID of 'reset-button'
    document.getElementById('reset-button').addEventListener('click', resetStatsAndShowButtons);
}

let rollCount = 3;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function rollDice() {
    return Math.max(8, Array.from({ length: 4 }, () => getRandomInt(1, 6))
        .sort((a, b) => b - a)
        .slice(1)
        .reduce((a, b) => a + b, 0));
}

function calculateModifier(stat) {
    return Math.floor((stat - 10) / 2);
}

function animateRoll(statId, modId, buttonId) {
    if (document.getElementById(statId).value !== '0') return;

    let count = 0;
    const intervalId = setInterval(() => {
        document.getElementById(statId).value = getRandomInt(1, 18); // Simulate rolling
        if (count >= 10) {
            clearInterval(intervalId);
            const finalValue = rollDice();
            document.getElementById(statId).value = finalValue;
            document.getElementById(modId).value = calculateModifier(finalValue);
            document.getElementById(buttonId).style.display = 'none'; // Hide roll button after final value is set
        }
        count++;
    }, 100); // Adjust speed as needed for desired animation effect
}

function resetStatsAndShowButtons() {
    ['strength', 'dexterity', 'mind', 'charisma'].forEach(stat => {
        document.getElementById(`${stat}-stat`).value = '0';
        document.getElementById(`${stat}-modifier`).value = '0';
        document.getElementById(`${stat}-button`).style.display = 'inline-block'; // Show roll button again
    });
}

function initializeClassSelection() {
    const dropdown = document.getElementById('classDropdown');
    const descInput = document.getElementById('classDesc');
    const abilitiesInput = document.getElementById('classAbilities');

    dropdown.addEventListener('change', function() {
        const selectedClass = this.value;
        updateClassInfo(selectedClass, descInput, abilitiesInput);
    });

    // Initial update for default selection, if applicable.
    const initialClass = dropdown.options[dropdown.selectedIndex]?.value;
    if (initialClass) {
        updateClassInfo(initialClass, descInput, abilitiesInput);
    }
}


function updateClassInfo(className, descInput, abilitiesInput) {
    // Clear the current content first to ensure it's empty before adding new content
    descInput.value = '';
    abilitiesInput.value = '';

    const classInfo = getClassInfo(className);

    if (classInfo) {
        // Set the inputs to the new class's description and abilities
        descInput.value = classInfo.description;
        abilitiesInput.value = classInfo.abilities.join('\n'); // Use '\n' for line breaks in textarea
    } else {
        // Handle cases where classInfo is null (e.g., default or invalid selection)
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