const numAll = document.querySelectorAll('.fas.fa-plus')
const spanAll = document.querySelectorAll('span:not(#ukupno):not(#ukupnaCena)')
const cenaAll = document.querySelectorAll('.cena')
const all = document.querySelector('body')


const povecaj = (event) => {
    if (event.target.className === 'fas fa-plus') {
        event.target.nextSibling.nextSibling.innerHTML++
        let novaCena = parseInt(event.target.parentElement.parentElement.childNodes[7].innerHTML)
        novaCena += parseInt(event.target.parentElement.parentElement.childNodes[3].innerHTML)
        event.target.parentElement.parentElement.childNodes[7].innerHTML = parseInt(novaCena)
    }
}

const smanji = (event) => {
    if (event.target.className === 'fas fa-minus') {
        let prev = event.target.previousSibling.previousSibling
        prev.innerHTML--
        let novaCena = parseInt(event.target.parentElement.parentElement.childNodes[7].innerHTML)
        novaCena -= parseInt(event.target.parentElement.parentElement.childNodes[3].innerHTML)
        event.target.parentElement.parentElement.childNodes[7].innerHTML = parseInt(novaCena)
        if (prev.innerHTML <= '0') {
            prev.innerHTML = '0'
        }

        let minusCena = event.target.parentElement.parentElement.childNodes[7]
        
        if (minusCena.innerHTML <= '0') {
            minusCena.innerHTML = '0'
        }
    }
}

const dodaj = () => {
    
    let total = 0;
    for (let i = 0; i < spanAll.length; i++) {
        total += parseInt(spanAll[i].innerHTML)
    }

    document.querySelector('#ukupno').innerHTML = total;

    let sve = document.querySelector('#ukupnaCena');

    let totalCena = 0;
    for (let i = 0; i < cenaAll.length; i++) {
        totalCena += parseInt(cenaAll[i].innerHTML)
    }
    
    sve.innerHTML = totalCena

    if (total === 0 || totalCena === 0) {
        Swal.fire({
            type: 'error',
            title: 'Korpa je prazna!',
            text: 'Molimo dodajte nesto u korpu!'
          })
    } else {
        Swal.fire(
            'Cestitamo!',
            'Vasi proizvodi su dodati u korpu!',
            'success'
          )
    }
}

const kupi = () => {

    let totalCena = document.querySelector('#ukupnaCena').innerHTML;

    if (totalCena === '0') {
        Swal.fire({
            type: 'error',
            title: 'Korpa je prazna!',
            text: 'Molimo dodajte nesto u korpu!'
          })
    } else {
    
    Swal.fire({
        title: 'Da li zelite da narucite?',
        text: `Ukupna cena je: ${totalCena}`,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Poruci!'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Cestitamo!',
            'Vasi proizvodi su na putu ka Vama!',
            'success'
          )
          setTimeout(() => {
            location.reload()
        }, 2000)
        }
      })

    }
}

document.querySelector('#dodaj').addEventListener('click', dodaj)
document.querySelector('#kupi').addEventListener('click', kupi)
all.addEventListener('click', povecaj)
all.addEventListener('click', smanji)