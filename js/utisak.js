const sacuvajUtisak = e => {

    const ime = document.querySelector('#ime').value
    const noviUtisak = document.querySelector('#utisak').value
    const randomCard = faker.image.avatar()

    if (!validirajUtisak(ime, noviUtisak)) {
        return false;
    }
    
    const utisak = {
        ime: ime,
        utisak: noviUtisak,
        avatar: randomCard
    }

    
    if (localStorage.getItem('utisci') === null) {
        
        const utisci = []
        
        utisci.push(utisak)
        
        localStorage.setItem('utisci', JSON.stringify(utisci))
    } else {
        
        const utisci = JSON.parse(localStorage.getItem('utisci'))
        
        utisci.push(utisak)
        
        localStorage.setItem('utisci', JSON.stringify(utisci))
    }

    Swal.fire(
        'Uspesno ste postavili Vas utisak!',
        'Zahvaljujemo na vremenu!',
        'success'
      )

    // Resetuj formu
    document.querySelector('#forma').reset()

    prikaziUtiske()

    e.preventDefault()
}

const izbrisiUtisak = utisak => {

    const utisci = JSON.parse(localStorage.getItem('utisci'))

    for (let i = 0; i < utisci.length; i++) {
        if (utisci[i].utisak === utisak) {
            // Izbrisi utisak
            utisci.splice(i, 1)
        }
    }

    localStorage.setItem('utisci', JSON.stringify(utisci))

    prikaziUtiske()
}

const prikaziUtiske = () => {
    if (localStorage.getItem('utisci') === null) {
        localStorage.setItem('utisci', JSON.stringify([]))
    }

    const utisci = JSON.parse(localStorage.getItem('utisci'))

    const prikazUtisaka = document.querySelector('#prikaz-utisaka')

    prikazUtisaka.innerHTML = '';

    for (let i = 0; i < utisci.length; i++) {
        const ime = utisci[i].ime;
        const utisak = utisci[i].utisak;
        const avatar = utisci[i].avatar;

        prikazUtisaka.innerHTML += `
        <div class="card card-body cardBody mb-0" style="background-color: #FDA403">
            <ul class="list-group list-group-flush" >
            <li class="list-group-item group listPozadina">
            <h3><img src=${avatar} width="45px"> ${ime} porucuje:</h3>
            <span class="span">${utisak} <button class="btn btn-danger btn-delete delete"><i onclick="izbrisiUtisak(\'${utisak}'\)" class="fas fa-times"> Izbrisi Utisak </i></button></span></li>
            </ul>
        </div>
        `
    }
}

const validirajUtisak = (ime, noviUtisak) => {
    if (!ime || !noviUtisak) {
        alert(`Molimo ispunite obavezna polja obrazca!`)
        return false;
    }

    return true;
}

document.querySelector('#forma').addEventListener('submit', sacuvajUtisak);

