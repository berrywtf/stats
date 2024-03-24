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

function initializeRollingMechanics() {
    // Your implementation of stat rolling initialization goes here
    // This function was mentioned in the original script but not defined
}

function initializeClassSelection() {
    const dropdown = document.getElementById('classDropdown');
    const classDescription = document.getElementById('classDescription');
    const classAbility = document.getElementById('classAbility');
    const classLabel = document.getElementById('classLabel');

    // Populate the dropdown with class names
    Object.keys(getClassInfo()).forEach(className => {
        const option = new Option(className, className);
        dropdown.add(option);
    });

    // Retrieve the last selected class from localStorage
    const savedClass = localStorage.getItem('selectedClass') || classLabel.textContent.trim();
    if (dropdown.querySelector(`option[value="${savedClass}"]`)) {
        dropdown.value = savedClass;
        classLabel.textContent = savedClass; // Ensure classLabel matches the saved selection
    }

    updateClassInfo(savedClass, classDescription, classAbility); // Update text areas based on the saved or default class

    // Listener for changes in dropdown selection
    dropdown.addEventListener('change', function() {
        const selectedClass = this.value;
        classLabel.textContent = selectedClass; // Update classLabel to reflect the new selection
        localStorage.setItem('selectedClass', selectedClass); // Save the new selection to localStorage
        updateClassInfo(selectedClass, classDescription, classAbility); // Update text areas
    });
}

function updateClassInfo(className, classDescription, classAbility) {
    const classInfo = getClassInfo(className);
    if (classInfo) {
        classDescription.value = classInfo.description;
        classAbility.value = classInfo.abilities.join('\n');
    } else {
        // Handle the case where no valid class information is found
        classDescription.value = 'Select a class to see the description.';
        classAbility.value = 'Select a class to see the abilities.';
    }
}


function getClassInfo(className = null) {
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
            // If className is not provided, return all class names for dropdown population
if (className === null) {
    return classesData;
}

// Return class info for the given className, or null if the class doesn't exist
return classesData[className] || null;
}

