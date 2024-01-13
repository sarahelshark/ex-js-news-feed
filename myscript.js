window.addEventListener('scroll', () => {
  console.log("scrolled");
});
//alla fine //scrollbar che si vede solo allo scroll

//inserire dinamicamente in pagina i post
//inserire select dinamicamente in pagina//gestire hover
//programma filtro dei post
//programma post salvati
//style dettagli
//date method

/*bookmark che cambia al click--step4, ragiono dopo
-------------------------------
-creo una array vuota per inserirci i miei click di bookmark
-procedo con un event listener sui bookmark
  -al click, devono cambiare aspetto
  -pusho il click dentro il mio arrai che si userà dopo per creare il filtro dei post salvati 
 //Selezione degli elementi di bookmark sia solidi che regolari
const solidBookmark = document.querySelector('.fa-solid.fa-bookmark');
const regularBookmark = document.querySelector('.fa-regular.fa-bookmark'); 

// Seleziona tutti gli elementi di bookmark, sia solidi che regolari
const allBookmarks = document.querySelectorAll('.fa-bookmark');


// Itera su tutti gli elementi di bookmark e aggiungi l'event listener
allBookmarks.forEach(bookmark => {
    
    bookmark.addEventListener('click', function () {
        // 
        console.log('Bookmark Clicked');
        // Add a class
        solidBookmark.classList.toggle('d-none'); 
        regularBookmark.classList.toggle('d-none');

           
    });
});


*/
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

/***********************************************ARRAY DEI TAGS DEL MIO ARRAY OBJECT*/
const tagsSet = new Set();  //approccio per evitare doppioni di tags 

allArticles.forEach(article => {
  article.tags.forEach(tag => tagsSet.add(tag));
});

const tagsArray = Array.from(tagsSet);

console.log(tagsArray);
/************ ******************DYNAMIC SELECT *****************************************/
/**
 * ## Aggiunge dinamicamente le opzioni alla select.
 *
 * @function
 */
function stampaOpzioniSelect() {
  // luogo che voglio popolare
  const selectElement = document.querySelector('.form-select');

  // Array di opzioni che ciclero con forEach
  const tagsOptions = [
    'Tutti i tags',
    'Politica',
    'Geo',
    'Tech',
    'Viaggi',
    'Cucina'
  ];

  tagsOptions.forEach(tag => {
    //creo il mio div delle options
    const option = document.createElement('option');
    //...lo riempio col contenuto
    option.textContent = tag;
    //lo appendo al luogo dove devo popolare
    selectElement.appendChild(option);
  });
}
// Chiamare la funzione quando la pagina è caricata, come ho fatto con gli articoli
document.addEventListener('DOMContentLoaded', stampaOpzioniSelect);

/*****************************GENERARE LE news vecchio metodo*******************/
//creo il luogo in cui andrò a stampare successivamente i miei articoli e filtri
const articleWrapperEL =  document.getElementById('articlesWrapper');
//creo funzione che sarà richiamata al caricamento della pagina per stampare tutti gli articoli in pagina
/**
 * ## Stampa i miei oggetti sul DOM, TUTTI 
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
        <i class="fa-solid fa-bookmark fa-xl mt-3 custom-txt-color d-none"> </i>
        <i class="fa-regular fa-bookmark fa-xl mt-3 custom-txt-color"></i>
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
//Chiamare la funzione per stampare gli articoli quando la pagina è pronta
document.addEventListener('DOMContentLoaded', stampaArticoli);

/************************FUNZIONE FILTRO ARTICOLI****************************************/
function filterArticles() {
	
  //creo costante per estrapolare value che utilizzero in filter() (voglio filtrare il mio array di oggetti)
  const selectedType = test.value;

  //Soluzione più semplice
  // Ciclo attraverso tutti post e nascondo quelli che non corrispondono al tipo selezionato
  for (let i = 0; i < allArticles.length; i++) {
  
    const cardId = `articleContainer_${allArticles.id}`;
    const card = document.getElementById(cardId);

    if (selectedType === 'Tutti i tags' || allArticles[i].tags === selectedType) {
      stampaArticoli()
    // mostra la card se la situazione è quella di default con tutte le carte e/o se le icone sono del tipo selezionato
    } else {
      console.log('prova') // nascondi la card se la situazione è contraria alla situazione descritta sopra
    }   

   }


}

/********************TRIGGERO CAMBIAMENTO****************************************/

//variabile + event listener al 'change'
const test = document.getElementById("selectEl");
//gestire il cambiamento della select direttamente con la mia funzione 
test.addEventListener('change', filterArticles);









/***************************GENERARE MESSAGGIO VUOTO*************************************/

/**
 * ## Stampa il mio messaggio di vuoto nel DOM
 *
 */
function stampaVuoto() {
    
  //inserisco un messaggio che avverte l'utente dell'assenza di posts in merito al filtro scelto    
  //scelgo il luogo dove posizionare il mio nuovo messaggio e creo l'elemento in pagina
  const wrapperEl = document.getElementById('mainWrapper');
  const articleNotAvailable = document.createElement('h3');
  //...le sue classi
  articleNotAvailable.className = 'container-sm mt-3 text-light';
  //...il suo html con template literal
  articleNotAvailable.innerHTML = `No news available.  `; 
  //..unisco il mio template literal al div che ho creato precedentemente
  wrapperEl.appendChild(articleNotAvailable);
}













/**old
 * // step 3,gestire  il cambio della selezione nel filtro
const test = document.getElementById("selectEl");
console.log(test)

test.addEventListener("change", function() {

 // Reimposto la variabile quando la selezione cambia
 if (test.value !== "Politica") {
  document.getElementById('articlesWrapper').innerHTML = " ";
  stampaArticoli();
}else if (test.value === "Politica") {
    document.getElementById('articlesWrapper').innerHTML = " ";
  } 
});

 * 
 */







/************let isExecuted = false;

function myFunction() {
  if (!isExecuted) {
    console.log("Questa riga verrà stampata solo una volta.");
    // Inserisci qui il resto del codice che vuoi eseguire una sola volta
    isExecuted = true;
  } else {
    console.log("Questa funzione è già stata eseguita.");
  }
}
document.getElementById("myButton").addEventListener("click", myFunction);********TEST BOOLEANE per fx stampaVuoto()*/

