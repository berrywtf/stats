document.addEventListener('DOMContentLoaded', function() {
    initializeRollingMechanics();
    initializeClassSelection();
});

function initializeRollingMechanics() {
    // Attach event listeners to each stat's roll button
    document.querySelectorAll('[id$="-button"]').forEach(button => {
        button.addEventListener('click', function() {
            const statType = button.id.replace('-button', ''); // e.g., 'strength'
            animateRoll(`${statType}-stat`, `${statType}-modifier`, button.id);
        });
    });
}

function animateRoll(statId, modId, buttonId) {
    if (document.getElementById(statId).value !== '0') return;

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

// getRandomInt, rollDice, and calculateModifier functions remain unchanged.

function initializeClassSelection() {
    const dropdown = document.getElementById('classDropdown');
    const classDescription = document.getElementById('classDescription');
    const classAbility = document.getElementById('classAbilities');

    // Set event listener for class selection change
    dropdown.addEventListener('change', () => {
        const selectedClass = dropdown.value;
        const classInfo = getClassInfo(selectedClass);
        classDescription.value = classInfo ? classInfo.description : 'Select a class to see the description.';
        classAbility.value = classInfo ? classInfo.abilities.join('\n') : 'Select a class to see the abilities.';
    });

    // Trigger the change event manually to initialize the description and abilities on page load
    dropdown.dispatchEvent(new Event('change'));
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