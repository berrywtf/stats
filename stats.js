document.addEventListener('DOMContentLoaded', function() {
    initializeRollingMechanics();
    initializeClassSelection();
});

// Initialize rolling mechanics for character stats
function initializeRollingMechanics() {
    document.getElementById('reroll-button').addEventListener('click', function() {
        rollCount--;
        if (rollCount >= 0) {
            resetStatsAndShowButtons();
            document.getElementById('stat-message').textContent = `Stats reset. Roll each stat again. ${rollCount} rerolls left.`;
        }
    });

    const stats = ['strength', 'dexterity', 'mind', 'charisma'];
    stats.forEach(stat => {
        document.getElementById(`${stat}-button`).addEventListener('click', function() {
            animateRoll(`${stat}-stat`, `${stat}-modifier`, `${stat}-button`);
        });
    });
}

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
        document.getElementById(`${stat}-stat`).value = '0';
        document.getElementById(`${stat}-modifier`).value = '0';
        document.getElementById(`${stat}-button`).style.display = 'inline-block';
    });
}

// Initialize class selection and update class info based on selection
function initializeClassSelection() {
    const dropdown = document.getElementById('classDropdown');
    dropdown.addEventListener('change', function() {
        updateClassInfo(this.value);
    });

    // Optionally, initialize the class info if a class is already selected on page load
    if (dropdown.value) {
        updateClassInfo(dropdown.value);
    }
}

function updateClassInfo(className) {
    const classDescInput = document.getElementById('classDesc');
    const classAbilitiesInput = document.getElementById('classAbilities');
    const classInfo = classesData[className];

    if (classInfo) {
        classDescInput.value = classInfo.description;
        classAbilitiesInput.value = classInfo.abilities.map(a => `${a.name}: ${a.ability_description}`).join('; ');
    } else {
        classDescInput.value = '';
        classAbilitiesInput.value = '';
    }
}

// Class information
const classesData = {
    // Populate with your classesData
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