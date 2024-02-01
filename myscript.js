/*window.addEventListener('scroll', () => {
  console.log("scrolled");
});
//alla fine //scrollbar che si vede solo allo scroll

//inserire dinamicamente in pagina i post
//inserire select dinamicamente in pagina//gestire hover
//programma filtro dei post
//programma post salvati
//style dettagli
//date method



/*********************************STRUTTURE DATI************************************************/
//STEP1- stampo tutti gli articoli in pagina
//creo una lista di oggetti
const allArticles = [
  {
      title: 'Scoperta di una nuova specie di papera di gomma',
      content: 'Un breve articolo sulla recente scoperta di una specie di papera di gomma mai vista prima.',
      tags: ['geo', 'tech'],
      author: 'Diana Rossi',
      published: new Date('2023-02-11'),
      image: 'rubber-duck.jpg',
      alt: 'rubber duck in a river',
      id: '1'
  },
  {
      title: 'Esplorando le profondità marine: il mistero degli abissi',
      content: "un viaggio nelle profondità dell'oceano alla scoperta di creature misteriose e inesplorate",
      tags: ['viaggi', 'geo'],
      author: 'Fabio Mari',
      published: new Date('2023-03-14'),
      image: 'deep-sea.jpg',
      alt: 'deep sea',
      id: '2'       
  },
  {
      title: 'Viaggio culinario: alla ricerca dei sapori perduti',
      content: 'Esplorazione di tradizioni culinarie dimenticate e la ricerca di sapori autentici.',
      tags: ['cucina'],
      author: 'Marta Bianchi',
      published: new Date('2023-04-20'),
      image: 'kitchen-food.jpg',
      alt: 'a table with tomatoes, a knife in the middle and some pot herbs',
      id: '3'
  },
  {
      title: 'Arte moderna: oltre i confini convenzionali',
      content: "Un'analisi delle tendenze e delle sfide nell'arte contemporanea, con interviste a artisti emergenti.",
      tags: ['arte', 'tech'],
      author: 'Gabriele Neri',
      published: new Date('2023-05-29'),
      image: 'modern-art.jpg',
      alt: 'wall full of graffiti, street art',
      id: '4'
  }
]
console.table(allArticles)
//creo il luogo in cui andrò a stampare successivamente i miei articoli e filtri
const articleWrapperEL =  document.getElementById('articlesWrapper');
stampaOpzioniSelect();
stampaArticoli();

/************ ******************DYNAMIC SELECT *****************************************/
/**
 *### Aggiunge dinamicamente le opzioni alla select.
 *@param {Array} articles array di oggetti dove posso ciclare ==> .tags
 * @function stampa opzioni select
 */
function stampaOpzioniSelect() {
  // luogo che voglio popolare
  const selectElement = document.querySelector('.form-select');

  const tagsSet = new Set();  //approccio per evitare doppioni di tags 

allArticles.forEach(article => {
  article.tags.forEach(tag => tagsSet.add(tag));
});

const tagsArray = Array.from(tagsSet);

tagsArray.unshift("Politica");  
tagsArray.unshift("Tutti i tags"); 
console.log(tagsArray);

  tagsArray.forEach(tag => {
    //creo il mio div delle options
    const option = document.createElement('option');
    //...lo riempio col contenuto
    option.textContent = tag;
    //lo appendo al luogo dove devo popolare
    selectElement.appendChild(option);
  });
  
}



/**
 *
 * ### Stampa i miei oggetti sul DOM, TUTTI 
 *@param {Array} articles array di oggetti da stampare sul DOM con template literal
 * @function   stampa articoli
 */
function stampaArticoli() {
//Pulisci il contenuto attuale
  articleWrapperEL.innerHTML = "";
//
  allArticles.forEach(article => {
    //creo un contenitore del mio template literal
    const articleContainer = document.createElement('div');
    //...le sue classi
    articleContainer.className = 'container-sm mt-3 bg-light p-2';
    //il suo id, che poi uso per nascondere le news
    articleContainer.id = `articleContainer_${article.id}`; 
    //modifico il formato delle date
    const formattedDate = article.published.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  // il suo html con template literal
    articleContainer.innerHTML = `
      <div class="container-sm d-flex justify-content-between flex-nowrap">
        <h4 class="font-weight-bold">
          ${article.title}
        </h4>
        <i class="fa-solid fa-bookmark fa-xl mt-3 custom-txt-color d-none" > </i>
        <i class="fa-regular fa-bookmark fa-xl mt-3 custom-txt-color" ></i>
      </div>
      <div class="container-sm d-flex flex-column justify-content-center">
        <article>
          <div class="author font-weight-bold">
            Pubblicato da ${article.author}
          </div>
          <div class="date">
            in data ${formattedDate};
          </div>
        </article>
        <p>
          ${article.content}
        </p>
        <img src="./images/${article.image}" alt="${article.alt}">
        <div class="badges mt-1">
          ${article.tags.map(tag => `
            <span class="badge custom-${tag}-badge p-1 rounded-4 text-light font-weight-normal shadow">
              ${tag}
            </span>`).join('')}
        </div>
      </div>
    `; 
    //unisco il mio template literal al div che ho creato precedentemente
    articleWrapperEL.appendChild(articleContainer);
  });

}



/**
   *### filtra e solo dopo Stampa i miei oggetti sul DOM
   *@param {Array} articles array di oggetti da stampare sul DOM con template literal
   * @function   filtra&stampa articoli
   */
function filterArticles() {
  const selectedTag = test.value;

  let filteredArticles;
  if (selectedTag === 'Tutti i tags') {
    filteredArticles = allArticles; // se 'Tutti i tags' è selezionato, mostra tutti gli articoli
    
  } else {
    filteredArticles = allArticles.filter(article => article.tags.includes(selectedTag));
  }

  articleWrapperEL.innerHTML = ""; // Svuoto il contenitore

  //logica simile alla funzione di stampa articoli, ma mi stampa TUTTI quelli filtrati 
  if (filteredArticles.length > 0) {
    filteredArticles.forEach(article => {
      const formattedDate = article.published.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      const articleContainer = document.createElement('div');
      articleContainer.className = 'container-sm mt-3 bg-light p-2';
      articleContainer.id = `articleContainer_${article.id}`;

      articleContainer.innerHTML = `
        <div class="container-sm d-flex justify-content-between flex-nowrap">
          <h4 class="font-weight-bold">${article.title}</h4>
          <i class="fa-solid fa-bookmark fa-xl mt-3 custom-txt-color d-none" ></i>
          <i class="fa-regular fa-bookmark fa-xl mt-3 custom-txt-color" ></i>
        </div>
        <div class="container-sm d-flex flex-column justify-content-center">
          <article>
            <div class="author font-weight-bold">Pubblicato da ${article.author}</div>
            <div class="date">in data ${formattedDate}</div>
          </article>
          <p>${article.content}</p>
          <img src="./images/${article.image}" alt="${article.alt}">
          <div class="badges mt-1">
            ${article.tags.map(tag => `
            <span class="badge custom-${tag}-badge p-1 rounded-4 text-light font-weight-normal shadow">${tag}</span>
            `).join('')}
          </div>
        </div>
      `; 
      articleWrapperEL.appendChild(articleContainer);
    });
} else {
  articleWrapperEL.innerHTML = "";
  stampaVuoto(); // Funzione per mostrare il messaggio in pagina
}


}  


/********************TRIGGERO CAMBIAMENTO****************************************/

//variabile + event listener al 'change'
const test = document.getElementById("selectEl");
//gestire il cambiamento della select direttamente con la mia funzione 
test.addEventListener('change', filterArticles );




/**
   * ## stampa il mio messaggio di VUOTO nel DOM
   *
   * @function   crea nuovo messaggio in pagina 
   */
function stampaVuoto() {
    
  //inserisco un messaggio che avverte l'utente dell'assenza di posts in merito al filtro scelto    
  //scelgo il luogo dove posizionare il mio nuovo messaggio e creo l'elemento in pagina
  const wrapperEl = document.getElementById('articlesWrapper');
  const articleNotAvailable = document.createElement('h3');
  //...le sue classi
  articleNotAvailable.className = 'container-sm mt-3 text-light';
  //...il suo html con template literal
  articleNotAvailable.innerHTML = `No news available.  `; 
  //..unisco il mio template literal al div che ho creato precedentemente
  wrapperEl.appendChild(articleNotAvailable);
}


/***********************************************************/
//bookmarks

//event listener al checkbox, che in un secondo momento farà partire il secondo filtraggio
let CheckBox = document.getElementById('flexCheckDefault');

CheckBox.addEventListener('click', function(){
  console.log('clicked');

  if (selectedBookmark = true) {
    articleWrapperEL.innerHTML = ""; // Svuoto il contenitore
  } 


})

//array vuoto di supporto per creare una nuova lista dei clicked bookmarks
let savedPosts = []

for  ( let i = 0 ; i< allArticles.length; i++) {

  let selectedBookmark = document.querySelectorAll('.fa-solid.fa-bookmark.fa-xl.mt-3.custom-txt-color');
  let unselectedBookmark = document.querySelectorAll('.fa-regular.fa-bookmark.fa-xl.mt-3.custom-txt-color');

  unselectedBookmark[i].addEventListener('click',function(){
    //console.log('funziona');

    //feedback visivo di 'click' sul bookmark
    unselectedBookmark[i].classList.add('d-none');
    selectedBookmark[i].classList.remove('d-none');

    //pusho i miei click sull'array di supporto
    savedPosts.push(selectedBookmark[i]);
   
})
}
 console.log(savedPosts);


 