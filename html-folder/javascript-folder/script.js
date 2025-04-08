document.addEventListener('DOMContentLoaded', () => {
    fetch('javascript-folder/dishes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-fel! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(menu => {
            console.log('Hämtad meny:', menu);
            renderMenu(menu);
            setupFilters(menu);
        })
        .catch(error => {
            console.error('Det gick inte att hämta menyn:', error);
        });
});

function renderMenu(menu, forceShowAllColumns = false) {
    const förrättList = document.getElementById('förrätt-list');
    const varmrättList = document.getElementById('varmrätt-list');
    const efterrättList = document.getElementById('efterrätt-list');

    //Töm kolumner
    förrättList.innerHTML = '';
    varmrättList.innerHTML = '';
    efterrättList.innerHTML = '';

    //Räkna hur många rätter som hamnar i varje kolumn
    let countF = 0, countV = 0, countE = 0;

    menu.forEach(dish => {
        const el = createDishElement(dish);
        if (dish.category === 'förrätt') {
            förrättList.appendChild(el);
            countF++;
        } else if (dish.category === 'varmrätt') {
            varmrättList.appendChild(el);
            countV++;
        } else if (dish.category === 'efterrätt') {
            efterrättList.appendChild(el);
            countE++;
        }
    });

    //Visa eller dölj kolumner beroende på innehåll eller "visa alla"
    toggleColumnVisibility('förrätt-column', forceShowAllColumns || countF > 0);
    toggleColumnVisibility('varmrätt-column', forceShowAllColumns || countV > 0);
    toggleColumnVisibility('efterrätt-column', forceShowAllColumns || countE > 0);
}

function createDishElement(dish) {
    const dishElement = document.createElement('div');
    dishElement.classList.add('dish');
    dishElement.innerHTML = `
        <h3>${dish.name}</h3>
        <p><strong>Pris:</strong> ${dish.price} kr</p>
        <p>${dish.description}</p>
    `;
    return dishElement;
}

function toggleColumnVisibility(columnId, shouldShow) {
    const column = document.getElementById(columnId);
    column.style.display = shouldShow ? 'block' : 'none';
}

function setupFilters(originalMenu) {
    const categorySelect = document.getElementById('filter-category');
    const vegetarianCheckbox = document.getElementById('filter-vegetarian');
    const fishCheckbox = document.getElementById('filter-fish');
    const glutenFreeCheckbox = document.getElementById('filter-gluten-free');
    const priceSort = document.getElementById('sort-price');

    const applyFilters = () => {
        let filtered = [...originalMenu];

        const selectedCategory = categorySelect.value;
        const vegetarianOnly = vegetarianCheckbox.checked;
        const fishOnly = fishCheckbox.checked;
        const glutenFreeOnly = glutenFreeCheckbox.checked;
        const sortValue = priceSort.value;

        const noFilters =
            selectedCategory === 'alla' &&
            !vegetarianOnly &&
            !fishOnly &&
            !glutenFreeOnly &&
            sortValue === 'none';

        if (noFilters) {
            renderMenu(originalMenu, true);
            return;
        }

        if (selectedCategory !== 'alla') {
            filtered = filtered.filter(dish => dish.category === selectedCategory);
        }

        if (vegetarianOnly) {
            filtered = filtered.filter(dish => dish.vegetarian === true);
        }

        if (fishOnly) {
            filtered = filtered.filter(dish => dish.type === 'fisk');
        }

        if (glutenFreeOnly) {
            filtered = filtered.filter(dish => dish.glutenFree === true);
        }

        if (sortValue === 'low-to-high') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'high-to-low') {
            filtered.sort((a, b) => b.price - a.price);
        }

        renderMenu(filtered, false);
    };

    //Event listeners
    categorySelect.addEventListener('change', applyFilters);
    vegetarianCheckbox.addEventListener('change', applyFilters);
    fishCheckbox.addEventListener('change', applyFilters);
    glutenFreeCheckbox.addEventListener('change', applyFilters);
    priceSort.addEventListener('change', applyFilters);
}

//lunchbuffen
document.addEventListener('DOMContentLoaded', () => {
    const lunchBtn = document.getElementById('toggle-lunch');
    const lunchInfo = document.getElementById('lunch-info');

    if (lunchBtn && lunchInfo) {
        lunchBtn.addEventListener('click', () => {
            const isVisible = lunchInfo.style.display === 'block';
            lunchInfo.style.display = isVisible ? 'none' : 'block';
            lunchBtn.textContent = isVisible ? 'Visa lunchbuffé' : 'Dölj lunchbuffé';
        });
    }
});
