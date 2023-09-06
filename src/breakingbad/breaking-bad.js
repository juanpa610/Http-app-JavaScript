const fetchApiCharacter = async (page) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`,);
    const data = await response.json();
    return data;
};

/**
 * 
 * @param {HTMLElement} element 
 */
export const breakingBadApp = async (element ) => {
    document.querySelector('#app-title').innerHTML = 'Rick and Morty Personages';

    let currentPage = 1;
    const btnNextPage = document.createElement('button');
    const btnPrevPage = document.createElement('button');
    btnNextPage.innerHTML = `Siguiente pagina`;
    btnPrevPage.innerHTML = `Anterior pagina`;
    element.before(btnPrevPage);
    element.before(btnNextPage);
    btnPrevPage.disabled = true;

    const pages = await renderData(currentPage, element, 2, btnNextPage);

    btnNextPage.addEventListener('click', () =>{
        if(currentPage < pages) currentPage++;
        currentPage > 1 && currentPage < pages && ( btnPrevPage.disabled = false);
        btnNextPage.disabled = true;
        renderData(currentPage, element, pages, btnNextPage);
    });

    btnPrevPage.addEventListener('click', () =>{
        currentPage--;
        currentPage === 1 && (btnPrevPage.disabled = true);
        if(currentPage <= 0) return;
        
        renderData(currentPage, element, pages, btnNextPage);
    });
};

const renderData = async (currentPage, element, pages, btnNextPage ) => {
    if( currentPage > pages ) return;
    element.innerHTML = '';

    const data = await fetchApiCharacter(currentPage);

    data.results.forEach( character => {
        const img = document.createElement('img');
        img.setAttribute('class', 'character')
        img.src = character.image;
        element.append(img); 
    });

    currentPage !== pages && (btnNextPage.disabled = false);

    return data.info.pages;
};