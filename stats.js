document.addEventListener('DOMContentLoaded', function() {
    initializeRollingMechanics();
    initializeClassSelection(); // Renamed to match the function definition.
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

document.addEventListener('DOMContentLoaded', function() {
    initializeClassSelection();
});

function initializeClassSelection() {
    const dropdown = document.getElementById('classDropdown');
    const classLabel = document.getElementById('classLabel'); // This targets your textarea

    // Assuming getClassInfo() returns your classes data correctly
    const classesData = getClassInfo();

    // Populate the dropdown with class names
    Object.keys(classesData).forEach(className => {
        const option = new Option(className, className);
        dropdown.add(option);
    });

    // Set the initial class based on the textarea content or the first dropdown option
    const initialClass = classLabel.value.trim() || dropdown.options[0].value;
    dropdown.value = initialClass;
    updateClassInfo(initialClass); // Update text areas based on the initial or first class

    // Listen for changes in the dropdown to update the class information
    dropdown.addEventListener('change', function() {
        const selectedClass = this.value;
        classLabel.value = selectedClass; // Update the textarea with the selected class name
        updateClassInfo(selectedClass); // Update class information based on the new selection
    });
}

function updateClassInfo(className) {
    const classInfo = getClassInfo(className);
    const classDescription = document.getElementById('classDescription');
    const classAbility = document.getElementById('classAbilities');

    if (classInfo) {
        // Assuming these are textareas or inputs that need their value updated
        classDescription.value = classInfo.description;
        classAbility.value = classInfo.abilities.join('\n');
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