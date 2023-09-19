document.addEventListener("DOMContentLoaded", function () {
    const apiDataElement = document.getElementById("apiData");
    const searchButton = document.getElementById("searchButton");
    const pokemonIdInput = document.getElementById("pokemonId");

    searchButton.addEventListener("click", function () {
        const pokemonId = pokemonIdInput.value.trim();

   
    
    // URL de la API 
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;


    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('La solicitud no fue exitosa');
            }
            return response.json();
        })
        .then((data) => {
            // Accede a los datos específicos que deseas mostrar
            const pokemonName = data.name;
            const pokemonAbilities = data.abilities.map(ability => ability.ability.name).join(", ");

            // Muestra los datos en la página
            apiDataElement.innerHTML = `<h2>Nombre del Pokémon: ${pokemonName}</h2><p>Habilidades: ${pokemonAbilities}</p>`;
        })
        .catch((error) => {
            console.error("Error al obtener los datos de la API:", error);
        });
})
});

