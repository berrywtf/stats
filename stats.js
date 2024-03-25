export const statRoller = (() => {

    document.addEventListener('DOMContentLoaded', function() {
        initializeRollingMechanics();
        initializeClassSelection();
    });
    
    // The rolling mechanics functions remain unchanged.
    
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
     
});