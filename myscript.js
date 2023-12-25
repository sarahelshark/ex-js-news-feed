console.log('hello');
//alla fine //scrollbar che si vede solo allo scroll

//inserire dinamicamente in pagina i post
//inserire select dinamicamente in pagina//gestire hover
//programma filtro dei post
//programma post salvati
//style dettagli
//date method

/*bookmark che cambia al click
-------------------------------
-creo una array vuota per inserirci i miei click di bookmark
-procedo con un event listener sui bookmark
  -al click, devono cambiare aspetto
  -pusho il click dentro il mio arrai che si userà dopo per creare il filtro dei post salvati 


*/

 //Selezione degli elementi di bookmark sia solidi che regolari
const solidBookmark = document.querySelector('.fa-solid.fa-bookmark');
const regularBookmark = document.querySelector('.fa-regular.fa-bookmark'); 


// Seleziona tutti gli elementi di bookmark, sia solidi che regolari
const allBookmarks = document.querySelectorAll('.fa-bookmark');

// Itera su tutti gli elementi di bookmark e aggiungi l'event listener
allBookmarks.forEach(bookmark => {
    bookmark.addEventListener('click', function () {
        // Tuo codice qui per l'evento di clic sul bookmark
        console.log('Bookmark Clicked');
        // Add a class
        solidBookmark.classList.toggle('d-none'); 
        regularBookmark.classList.toggle('d-none');
           
    });
});


