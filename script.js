const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let pokemonData = [];
let loadedPokemonCount = 0;
let searchedPokemons = [];
let usingSearchedPokemons = false;
let pokemon = [];
let prevPokemon = [];
let currentPokemon = [];
let nextPokemon = [];
let fetchedPokemon = 0;

function init() {
    fetchPokemon();   
}

async function fetchPokemon() {
    let pokemonList = document.getElementById("pokemon-list");
    pokemonList.innerHTML = "";
    await Promise.all([fetchPokemonData()]);
    disableLoadingSpinner();
    renderPokemonListBoxTemplate();
    fetchAllOtherPokemon();
}

async function fetchPokemonData() {
    for (let index = 1; index <= 40; index++) {
        let response = await fetch(`${BASE_URL}/${index}`);
        let responseToJson = await response.json();
        let speciesResponse = await fetch(responseToJson.species.url);
        let speciesToJson = await speciesResponse.json();
        let pokemon = formatPokemonData(responseToJson, speciesToJson);
        pokemonData.push(pokemon);
        fetchedPokemon ++;
    }
}

async function fetchAllOtherPokemon() {
    for (let index = 41; index <= 1025; index++) {
        let response = await fetch(`${BASE_URL}/${index}`);
        let responseToJson = await response.json();
        let speciesResponse = await fetch(responseToJson.species.url);
        let speciesToJson = await speciesResponse.json();
        let pokemon = formatPokemonData(responseToJson, speciesToJson);
        pokemonData.push(pokemon);
        fetchedPokemon ++;
        if (loadedPokemonCount+20 > fetchedPokemon) {
            loadMoreButtonDisable();
        }  else {
            loadMoreButtonEnable(); 
        }
    }
}

function loadMoreButtonDisable() {
    let loadButton = document.getElementById("loadButton");
    loadButton.disabled = true;
    loadButton.className = "loadButtonDisable"
}

function loadMoreButtonEnable() {
    let loadButton = document.getElementById("loadButton");
    loadButton.disabled = false;
    loadButton.className = "loadButton"
}

function getGenderSVG(genderRate) {
    if (genderRate === -1) {
        return ``; 
    } else if (genderRate === 0) {
        return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#0000fd" width="24px"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path clip-rule="evenodd" d="M20.7071 4.29289C20.9147 4.50053 21.012 4.77677 20.9988 5.04866C20.9996 5.06567 21 5.08279 21 5.1V9C21 9.55228 20.5523 10 20 10C19.4477 10 19 9.55228 19 9V7.41421L15.8907 10.5235C16.5892 11.5043 17 12.7042 17 14C17 17.3137 14.3137 20 11 20C7.68629 20 5 17.3137 5 14C5 10.6863 7.68629 8 11 8C12.2958 8 13.4957 8.41079 14.4765 9.10925L17.5858 6H16C15.4477 6 15 5.55228 15 5C15 4.44772 15.4477 4 16 4H19.9C19.9172 4 19.9343 4.0004 19.9513 4.00118C20.2232 3.98801 20.4995 4.08525 20.7071 4.29289ZM15 14C15 16.2091 13.2091 18 11 18C8.79086 18 7 16.2091 7 14C7 11.7909 8.79086 10 11 10C13.2091 10 15 11.7909 15 14Z" fill="#009afd" fill-rule="evenodd"></path></g></svg>`; 
    } else if (genderRate === 8) {
        return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fa0000" width="24px"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path clip-rule="evenodd" d="M18 9C18 11.9742 15.836 14.4429 12.9967 14.9176C12.9989 14.9448 13 14.9722 13 15V17H14C14.5523 17 15 17.4477 15 18C15 18.5523 14.5523 19 14 19H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V19H10C9.44772 19 9 18.5523 9 18C9 17.4477 9.44772 17 10 17H11V15C11 14.9722 11.0011 14.9448 11.0033 14.9176C8.16399 14.4429 6 11.9742 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13Z" fill="#fa4b64" fill-rule="evenodd"></path></g></svg>`;
    } else {
        return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fa0000" width="24px"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path clip-rule="evenodd" d="M18 9C18 11.9742 15.836 14.4429 12.9967 14.9176C12.9989 14.9448 13 14.9722 13 15V17H14C14.5523 17 15 17.4477 15 18C15 18.5523 14.5523 19 14 19H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V19H10C9.44772 19 9 18.5523 9 18C9 17.4477 9.44772 17 10 17H11V15C11 14.9722 11.0011 14.9448 11.0033 14.9176C8.16399 14.4429 6 11.9742 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13Z" fill="#fa4b64" fill-rule="evenodd"></path></g></svg> / <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#0000fd" width="24px"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path clip-rule="evenodd" d="M20.7071 4.29289C20.9147 4.50053 21.012 4.77677 20.9988 5.04866C20.9996 5.06567 21 5.08279 21 5.1V9C21 9.55228 20.5523 10 20 10C19.4477 10 19 9.55228 19 9V7.41421L15.8907 10.5235C16.5892 11.5043 17 12.7042 17 14C17 17.3137 14.3137 20 11 20C7.68629 20 5 17.3137 5 14C5 10.6863 7.68629 8 11 8C12.2958 8 13.4957 8.41079 14.4765 9.10925L17.5858 6H16C15.4477 6 15 5.55228 15 5C15 4.44772 15.4477 4 16 4H19.9C19.9172 4 19.9343 4.0004 19.9513 4.00118C20.2232 3.98801 20.4995 4.08525 20.7071 4.29289ZM15 14C15 16.2091 13.2091 18 11 18C8.79086 18 7 16.2091 7 14C7 11.7909 8.79086 10 11 10C13.2091 10 15 11.7909 15 14Z" fill="#009afd" fill-rule="evenodd"></path></g></svg>`;
    }
}

function formatPokemonData(responseToJson, speciesToJson) {
    const id = String(responseToJson.id).padStart(4, '0');
    const name = responseToJson.name.charAt(0).toUpperCase() + responseToJson.name.slice(1);
    const types = responseToJson.types.map(typeInfo => {
        const typeName = typeInfo.type.name;
        return typeName.charAt(0).toUpperCase() + typeName.slice(1); });
    const image = responseToJson.sprites.other["official-artwork"].front_default;
    const height = responseToJson.height / 10;
    const weight = responseToJson.weight / 10;
    const abilities = responseToJson.abilities.map(abilityInfo => {
        const abilityName = abilityInfo.ability.name;
        return abilityName.charAt(0).toUpperCase() + abilityName.slice(1); });
    const { hp, attack, defense, specialAttack, specialDefense, speed } = getPokemonStats(responseToJson.stats);
    const { genusData, gender, genderSVG } = getSpeciesData(speciesToJson);
    return { id, name, types, image, height, weight, abilities, genusData, gender, genderSVG, hp, attack, defense, specialAttack, specialDefense, speed };
}

function getPokemonStats(baseStats) {
    return {
        hp: baseStats.find(stat => stat.stat.name === 'hp').base_stat,
        attack: baseStats.find(stat => stat.stat.name === 'attack').base_stat,
        defense: baseStats.find(stat => stat.stat.name === 'defense').base_stat,
        specialAttack: baseStats.find(stat => stat.stat.name === 'special-attack').base_stat,
        specialDefense: baseStats.find(stat => stat.stat.name === 'special-defense').base_stat,
        speed: baseStats.find(stat => stat.stat.name === 'speed').base_stat
    };
}

function getSpeciesData(speciesToJson) {
    const genusData = speciesToJson.genera.find(g => g.language.name === 'en').genus;
    const gender = speciesToJson.gender_rate;
    const genderSVG = getGenderSVG(gender);
    return { genusData, gender, genderSVG };
}

function renderPokemonListBoxTemplate() {
    let pokemonList = document.getElementById("pokemon-list");
    pokemonList.innerHTML = "";
    for (let index = 0; index < 20; index++) {
        pokemonList.innerHTML += getPokemonListBoxTemplate(index);
    }
    loadedPokemonCount += 20;
    pokemon = pokemonData;
}

function loadMorePokemon() {
    let pokemonList = document.getElementById("pokemon-list");
    for (let index = loadedPokemonCount; index < loadedPokemonCount + 20; index++) {
        if (pokemonData[index]) {
            pokemonList.innerHTML += getPokemonListBoxTemplate(index);
        } else {
        loadMoreButtonDisable(); 
        }
    }
    loadedPokemonCount += 20;  
}

function searchPokemonNames() {
    let searchRef = document.getElementById("searchField")
    let search = searchRef.value.toUpperCase();
    if (search == "") {
        resetPokemonSearch();
        return
    } 
    if (search.length < 3) {
        alert("Bitte geben Sie mindestens 3 Zeichen ein, um zu suchen.");
        return;
    }
    searchedPokemons = [];
    for (let index = 0; index < pokemonData.length; index++) {
        if (pokemonData[index].name.toUpperCase().includes(search)) {
            searchedPokemons.push(pokemonData[index]);
            renderSearchPokemon(searchedPokemons);
        } 
        }
    usingSearchedPokemons = true;
    pokemon = searchedPokemons;
}

function resetPokemonSearch() {
    searchedPokemons = [];
    loadedPokemonCount = 0;
    usingSearchedPokemons = false;
    pokemon = pokemonData;
    renderPokemonListBoxTemplate();
    document.getElementById("loadDiv").style = "display: flex";
}

function renderSearchPokemon() {
    let pokemonList = document.getElementById("pokemon-list");
    pokemonList.innerHTML = "";
    for (let index = 0; index < searchedPokemons.length; index++) {
        pokemonList.innerHTML += getPokemonListBoxTemplate(index);
    }
    document.getElementById("loadDiv").style = "display: none";
}   

function handleEnterKey(event) {
    if (event.key === "Enter") {
        searchPokemonNames(); 
    }
}

function openOverlay(event, index) {
    event.stopPropagation();
    let overlayRef = document.getElementById("overlay");
    let noScrolling = document.body;
    noScrolling.classList.add("stopScrolling");
    overlayRef.classList.add("overlay");
    overlayRef.innerHTML += getDialogTemplate(index);
    openMain(currentPokemon);
    const dialogElement = document.getElementById("dialog");
    dialogElement.addEventListener("click", (event) => {
    event.stopPropagation(); 
    });    
}

function closeDialog() {
    let overlayRef = document.getElementById("overlay");
    let noScrolling = document.body;
    noScrolling.classList.remove("stopScrolling");
    overlayRef.classList.remove("overlay");
    overlayRef.innerHTML = "";
}

function getNextPokemon(event, index) {
    event.stopPropagation();
    let overlayRef = document.getElementById("overlay");
    overlayRef.innerHTML = "";
    if (index < pokemon.length-1) {
        overlayRef.innerHTML = getDialogTemplate(index+1);
        openMain(currentPokemon);
    } else {
        overlayRef.innerHTML = getDialogTemplate(0);
        openMain(currentPokemon);
    };
    const dialogElement = document.getElementById("dialog");
    dialogElement.addEventListener("click", (event) => {
    event.stopPropagation(); 
    }); 
}

function getBackPokemon(event, index) {
    event.stopPropagation();
    let overlayRef = document.getElementById("overlay");
    overlayRef.innerHTML = "";
    if (index >= 1) {
        overlayRef.innerHTML = getDialogTemplate(index-1);
        openMain(currentPokemon);  
    } else {
        overlayRef.innerHTML = getDialogTemplate(pokemon.length-1);
        openMain(currentPokemon);
    };
    const dialogElement = document.getElementById("dialog");
    dialogElement.addEventListener("click", (event) => {
    event.stopPropagation(); 
    }); 
}

function fillPokemonStatus() {
    const pokemonStatuses = document.querySelectorAll('.pokemon-status');
    for (let index = 0; index < pokemonStatuses.length; index++) {
        const status = pokemonStatuses[index];
        const value = status.getAttribute('value');
        const scales = status.querySelectorAll('.pokemon-status_scale'); 
        const filledScales = Math.round((value / 255) * scales.length);
        for (let indexScale = 0; indexScale < scales.length; indexScale++) {
            const scale = scales[indexScale];
            if (indexScale < filledScales) {
                scale.classList.add('filled');
            } 
        }
    }
}

function openMain(currentPokemon) {
    let mainOverlay = document.getElementById("pokemonInfos");
    mainOverlay.innerHTML = "";
    mainOverlay.innerHTML = openMainTemplate(currentPokemon);    
}

function openStatus(currentPokemon) {
    let mainOverlay = document.getElementById("pokemonInfos");
    mainOverlay.innerHTML = "";
    mainOverlay.innerHTML = openStatusTemplate(currentPokemon);    
    fillPokemonStatus();
}

function disableLoadingSpinner() {
    document.getElementById("loadingSpinner").style = "display: none";
    document.getElementById("loadingDiv").style = "display: flex";
}