
// Funktion för att visa menyn
function displayMenu(items) {
    const menuContainer = document.getElementById("menu");
    menuContainer.innerHTML = ""; // Rensa innan vi lägger till nya rätter
    items.forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Kategori: ${item.category}</p>
            <p>Typ: ${item.type}</p>
            <p>Pris: ${item.price} kr</p>
        `;
        menuContainer.appendChild(menuItem);
    });
}

// Funktion för att filtrera menyn
function filterMenu() {
    const category = document.getElementById("category").value;
    const type = document.getElementById("type").value;
    const sort = document.getElementById("sort").value;

    let filteredItems = menuItems;

    // Filtrera efter kategori
    if (category !== "all") {
        filteredItems = filteredItems.filter(item => item.category === category);
    }

    // Filtrera efter typ
    if (type !== "all") {
        filteredItems = filteredItems.filter(item => item.type === type);
    }

    // Sortera efter pris
    if (sort === "low") {
        filteredItems.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
        filteredItems.sort((a, b) => b.price - a.price);
    }

    // Visa uppdaterad meny
    displayMenu(filteredItems);
}

// Visa menyn vid start
displayMenu(menuItems);

//fetcha json-filen

//fetch("menu.json")
    //.then(response => response.json()) // Omvandla till JSON
    //.then(data => {
        //menuItems = data; // Spara datan i en variabel
        //displayMenu(menuItems); // Visa menyn
    //})
    //.catch(error => console.error("Fel vid hämtning av meny:", error));

    //fetch("./javascript-folder/dishes.json")
    //.then(response => response.json())
    //.then(data => displayMenu(data))
    //.catch(error => console.error("Fel vid hämtning av meny:", error));

//function displayMenu(items) {
    // Hitta HTML-sektionerna för varje kategori
    //const förrätterContainer = document.getElementById("förrätter");
    //const varmrätterContainer = document.getElementById("varmrätter");
    //const efterrätterContainer = document.getElementById("efterrätter");

    // Rensa befintligt innehåll
    //förrätterContainer.innerHTML += ""; 
    //varmrätterContainer.innerHTML += ""; 
    //efterrätterContainer.innerHTML += ""; 

    // Loopa igenom rätterna och placera dem i rätt kategori
    //items.forEach(item => {
        //const menuItem = document.createElement("div");
        //menuItem.classList.add("menu-item");
        //menuItem.innerHTML = `
            //<h3>${item.name}</h3>
            //<p><strong>Typ:</strong> ${item.type}</p>
            //<p><strong>Pris:</strong> ${item.price} kr</p>
            //<p><strong>Beskrivning:</strong> ${item.description}</p>
            //<p><strong>Allergener:</strong> ${item.allergener}</p>
        //`;

        // Lägg till rätten i rätt kolumn baserat på kategori
        //if (item.category === "förrätt") {
            //förrätterContainer.appendChild(menuItem);
        //} else if (item.category === "varmrätt") {
            //varmrätterContainer.appendChild(menuItem);
        //} else if (item.category === "efterrätt") {
            //efterrätterContainer.appendChild(menuItem);
        //}
    //});
//}

