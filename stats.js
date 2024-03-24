document.addEventListener('DOMContentLoaded', function() {
    initializeRollingMechanics();
    initializeClassSelection();
});

const classesData = {
    "Juicer": {
        "description": "Light Armor. Experts in extracting essence, adept at getting information or crafting concoctions.",
        "abilities": [
            {"name": "Essence Extraction", "ability_description": "Bonus on essence extraction rolls"},
            {"name": "Vitality Surge", "ability_description": "Create a healing elixir"}
        ]
    },
    "Peeler": {
        "description": "Medium Armor. Specialize in uncovering hidden layers and secrets, working behind the scenes.",
        "abilities": [
            {"name": "Stealth Unveil", "ability_description": "Bonus on stealth rolls"},
            {"name": "Quick Peel", "ability_description": "Swift attack with bonus to hit"}
        ]
    },
    "Slicer": {
        "description": "Light Armor. Shields. Quick and precise warriors, preferring agility and sharp tactics over brute strength.",
        "abilities": [
            {"name": "Razor Edge", "ability_description": "Bonus on attack rolls with bladed weapons"},
            {"name": "Swift Strike", "ability_description": "Additional attack after downing an opponent"}
        ]
    },
    "Ripener": {
        "description": "Medium Armor. Masters of growth and nurturing, seen as healers and mentors.",
        "abilities": [
            {"name": "Growth Infusion", "ability_description": "Enhance plant growth or healing"}
        ]
    },
    "Harvester": {
        "description": "Heavy Armor. Shield. Strong and skilled in gathering resources and information, adept at acquiring what is needed.",
        "abilities": [
            {"name": "Resourceful Gathering", "ability_description": "Bonus on harvesting/gathering rolls"},
            {"name": "Hardened Peel", "ability_description": "Bonus to armor class."}
        ]
    },
    "Seedcaster": {
        "description": "Light Armor. Visionary and strategic, planting the seeds of future success with deep insight and foresight.",
        "abilities": [
            {"name": "Seed Manipulation", "ability_description": "Control plant growth"}
        ]
    }
};

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
    if (document.getElementById(statId).value !== '0') {
        return;
    }

    let count = 0;
    const intervalId = setInterval(() => {
        if (count >= 10) {
            clearInterval(intervalId);
            const finalValue = rollDice();
            document.getElementById(statId).value = finalValue;
            document.getElementById(modId).value = calculateModifier(finalValue);
            document.getElementById(buttonId).style.display = 'none'; 
        } else {
            document.getElementById(statId).value = getRandomInt(1, 18);
        }
        count++;
    }, 100); 
}

function resetStatsAndShowButtons() {
    ['strength', 'dexterity', 'mind', 'charisma'].forEach(stat => {
        document.getElementById(`${stat}-stat`).value = 0;
        document.getElementById(`${stat}-modifier`).value = 0;
        document.getElementById(`${stat}-button`).style.display = ''; 
    });
}

function initializeRollingMechanics() {
    document.getElementById('reroll-button').addEventListener('click', () => {
        if (rollCount > 0) {
            rollCount--;
            resetStatsAndShowButtons();
            document.getElementById('stat-message').innerText = `Stats reset. Roll each stat again. ${rollCount} rerolls left.`;
        }
    });

    ['strength', 'dexterity', 'mind', 'charisma'].forEach(stat => {
        document.getElementById(`${stat}-button`).addEventListener('click', () => {
            animateRoll(`${stat}-stat`, `${stat}-modifier`, `${stat}-button`);
        });

        if (document.getElementById(`${stat}-stat`).value !== '0') {
            document.getElementById(`${stat}-button`).style.display = 'none';
        }
    });
}

function initializeClassSelection() {
    const dropdown = document.getElementById('classDropdown');
    const classDescInput = document.getElementById('classDesc');
    const classAbilitiesInput = document.getElementById('classAbilities');

    // Populate the dropdown with class options
    Object.keys(classesData).forEach(className => {
        const option = document.createElement('option');
        option.value = className;
        option.textContent = className;
        dropdown.appendChild(option);
    });

    function updateInputs(className) {
        const classInfo = classesData[className];
        // Ensure these are targeting <input type="text"> elements
        const classDescInput = document.getElementById('classDesc');
        const classAbilitiesInput = document.getElementById('classAbilities');
    
        if (classInfo) {
            // Setting value for <input type="text"> elements
            classDescInput.value = classInfo.description;
            // Joining abilities descriptions into a single string
            classAbilitiesInput.value = classInfo.abilities.map(a => `${a.name}: ${a.ability_description}`).join('; ');
        } else {
            // Default text if class info is not found
            classDescInput.value = 'No information available.';
            classAbilitiesInput.value = 'No information available.';
        }
    }
    // Event listener for dropdown changes
    dropdown.addEventListener('change', function() {
        updateInputs(this.value);
    });

    // Initialize inputs with the first class information
    if (dropdown.value) {
        updateInputs(dropdown.value);
    }
}