document.addEventListener('DOMContentLoaded', function() {
    initializeRollingMechanics();
    initializeClassSelection();
});

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
    // Placeholder for your implementation of stat rolling mechanics
}

function initializeClassSelection() {
    const dropdown = document.getElementById('classDropdown');
    const classDescription = document.getElementById('classDescription');
    const classAbility = document.getElementById('classAbility');
    const classLabel = document.getElementById('classLabel');

    Object.keys(getClassInfo()).forEach(className => {
        const option = new Option(className, className);
        dropdown.add(option);
    });

    let selectedClass = localStorage.getItem('selectedClass') || classLabel.textContent.trim();

    if (!dropdown.querySelector(`option[value="${selectedClass}"]`)) {
        selectedClass = dropdown.options[0].value;
    }

    dropdown.value = selectedClass;
    classLabel.textContent = selectedClass;
    updateClassInfo(selectedClass, classDescription, classAbility);
    
    dropdown.addEventListener('change', function() {
        const newSelectedClass = this.value;
        const classLabel = document.getElementById('classLabel');
        classLabel.value = newSelectedClass; // Update the value for the textarea
    
        localStorage.setItem('selectedClass', newSelectedClass); // Save the new selection to localStorage
        
        updateClassInfo(newSelectedClass, classDescription, classAbility); // Update class information
    });
    
    // Initialization and updating based on saved selection or default
    const savedClass = localStorage.getItem('selectedClass');
    if (savedClass && dropdown.querySelector(`option[value="${savedClass}"]`)) {
        dropdown.value = savedClass;
        const classLabel = document.getElementById('classLabel');
        classLabel.value = savedClass; // Make sure to use .value for textareas
        updateClassInfo(savedClass, classDescription, classAbility);
    } else if (dropdown.options.length > 0) {
        const initialClass = dropdown.options[0].value;
        dropdown.value = initialClass;
        const classLabel = document.getElementById('classLabel');
        classLabel.value = initialClass; // Use .value for initializing textarea
        updateClassInfo(initialClass, classDescription, classAbility);
    }
    
function updateClassInfo(className, classDescription, classAbility) {
    const classInfo = getClassInfo(className);
    if (classInfo) {
        classDescription.value = classInfo.description;
        classAbility.value = classInfo.abilities.join('\n');
    } else {
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

            // If className is not provided, return all class names for dropdown population.
// If a specific className is provided, return its details or null if it doesn't exist.
return className ? classesData[className] || null : classesData;
        }


