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

document.getElementById('reroll-button').addEventListener('click', () => {
    if (rollCount > 0) {
        rollCount--;
        resetStatsAndShowButtons();
        document.getElementById('stat-message').innerText = `Stats reset. Roll each stat again. ${rollCount} rerolls left.`;
    }
});

function initialize() {
 
    ['strength', 'dexterity', 'mind', 'charisma'].forEach(stat => {
        document.getElementById(`${stat}-button`).addEventListener('click', () => {
            animateRoll(`${stat}-stat`, `${stat}-modifier`, `${stat}-button`);
        });

        // Hide the roll button if the stat already has a value
        if (document.getElementById(`${stat}-stat`).value !== '0') {
            document.getElementById(`${stat}-button`).style.display = 'none';
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    
    const classesData = {
        "Juicer": {
            "description": "Light Armor. Experts in extracting essence, adept at getting information or crafting concoctions.",
            "abilities": [
                {
                    "name": "Essence Extraction",
                    "ability_description": "Bonus on essence extraction rolls",
                    "formula": "mind_modifier + currentLevel"
                },
                {
                    "name": "Vitality Surge",
                    "ability_description": "Create a healing elixir",
                    "formula": "currentLevel + mind_modifier",
                    "uses_per_combat": "1 + (currentLevel / 4)"
                }
            ]
        },
        "Peeler": {
            "description": "Medium Armor. Specialize in uncovering hidden layers and secrets, working behind the scenes.",
            "abilities": [
                {
                    "name": "Stealth Unveil",
                    "ability_description": "Bonus on stealth rolls",
                },
                {
                    "name": "Quick Peel",
                    "ability_description": "Swift attack with bonus to hit",
                }
            ]
        },
        "Slicer": {
            "description": "Light Armor. Shields. Quick and precise warriors, preferring agility and sharp tactics over brute strength.",
            "abilities": [
                {
                    "name": "Razor Edge",
                    "ability_description": "Bonus on attack rolls with bladed weapons",
                },
                {
                    "name": "Swift Strike",
                    "ability_description": "Additional attack after downing an opponent",
                }
            ]
        },
        "Ripener": {
            "description": "Medium Armor. Masters of growth and nurturing, seen as healers and mentors.",
            "abilities": [
                {
                    "name": "Growth Infusion",
                    "ability_description": "Enhance plant growth or healing",
                }
            ]
        },
        "Harvester": {
            "description": "Heavy Armor. Shield. Strong and skilled in gathering resources and information, adept at acquiring what is needed.",
            "abilities": [
                {
                    "name": "Resourceful Gathering",
                    "ability_description": "Bonus on harvesting/gathering rolls",
                },
                {
                    "name": "Hardened Peel",
                    "ability_description": "Bonus to armor class.",
                }
            ]
        },
        "Seedcaster": {
            "description": "Light Armor. Visionary and strategic, planting the seeds of future success with deep insight and foresight.",
            "abilities": [
                {
                    "name": "Seed Manipulation",
                    "ability_description": "Control plant growth",
                }
            ]
        }
    };

    function populateDropdown() {
        const dropdown = document.getElementById('classDropdown');
        Object.keys(classesData).forEach(className => {
            const option = document.createElement('option');
            option.value = className;
            option.textContent = className;
            dropdown.appendChild(option);
        });
    }

    function updateClassDetails(className) {
        const classInfo = classesData[className];
        document.getElementById('classDesc').textContent = classInfo.description;

        const abilitiesList = document.getElementById('classAbilities');
        abilitiesList.innerHTML = ''; // Clear existing abilities
        classInfo.abilities.forEach(ability => {
            const li = document.createElement('li');
            li.textContent = `${ability.name}: ${ability.ability_description}`;
            abilitiesList.appendChild(li);
        });
    }

    document.getElementById('classDropdown').addEventListener('change', function() {
        updateClassDetails(this.value);
    });

    populateDropdown();
    updateClassDetails(document.getElementById('classDropdown').value); // Initialize with the first class
});

document.addEventListener('DOMContentLoaded', initialize);

