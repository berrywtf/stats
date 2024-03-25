document.addEventListener('DOMContentLoaded', function() {
   
    initializeClassSelection(); // Renamed to match the function definition.
});


function initializeClassSelection() {
    const dropdown = document.getElementById('classDropdown');
    const descInput = document.getElementById('classDescription');
    const abilitiesInput = document.getElementById('classAbility');

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