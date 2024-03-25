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
        document.getElementById('classDescription').textContent = classInfo.description;

        const abilitiesList = document.getElementById('classAbility');
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