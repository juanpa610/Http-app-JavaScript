const fetchApiCharacter = async (page) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
    const data = await response.json();
    return data;
};


/**
 * 
 * @param {HTMLElement} element 
 */
export const breakingBadApp = async (element ) => {
    document.querySelector('#app-title').innerHTML = 'Rick and Morty'
    
    const data = await fetchApiCharacter(1);

    
    data.results.forEach( character => {
        const img = document.createElement('img');
        img.setAttribute('class', 'character')
        img.src = character.image;
        element.append(img);
        
    });

    
};