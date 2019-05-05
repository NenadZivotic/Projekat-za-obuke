const numAll = document.querySelectorAll('.fas.fa-plus')
const spanAll = document.querySelectorAll('span:not(#ukupno):not(#ukupnaCena)')
const cenaAll = document.querySelectorAll('.cena')
const all = document.querySelector('body')
let num = document.querySelectorAll('.num')



const povecaj = (event) => {
    if (event.target.className === 'fas fa-plus') {
        let kolicina = event.target.parentElement.querySelector('.num')
        let novaKolicina = parseInt(kolicina.innerHTML)
        kolicina.innerHTML = novaKolicina + 1

        let povecajCenu = event.target.parentElement.parentElement.querySelector('.column4.povecaj')
        let ukupnaCena = event.target.parentElement.parentElement.querySelector('.column6.cena')
        let povecajCenu1 = parseInt(povecajCenu.innerHTML)
        let ukupnaCena1 = parseInt(ukupnaCena.innerHTML)
        ukupnaCena.innerHTML = ukupnaCena1 + povecajCenu1
    }
}

const smanji = (event) => {
    if (event.target.className === 'fas fa-minus') {
        let kolicina = event.target.parentElement.querySelector('.num')
        let novaKolicina = parseInt(kolicina.innerHTML)
        kolicina.innerHTML = novaKolicina - 1
        let smanjiCenu = event.target.parentElement.parentElement.querySelector('.column4.povecaj')
        let ukupnaCena = event.target.parentElement.parentElement.querySelector('.column6.cena')
        let smanjiCenu1 = parseInt(smanjiCenu.innerHTML)
        let ukupnaCena1 = parseInt(ukupnaCena.innerHTML)
        ukupnaCena.innerHTML = ukupnaCena1 - smanjiCenu1
        
        if (kolicina.innerHTML <= 0) {
            kolicina.innerHTML = 0
        }
        if (ukupnaCena.innerHTML <= 0) {
            ukupnaCena.innerHTML = 0
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