var app = angular.module('bevasarlolistaF', ['ngRoute', 'ngNotify']);
let kategoria = document.querySelector("#kategoria");
let termeknev = document.querySelector('#termeknev');
let egysegar = document.querySelector('#egysegar')
let tbody = document.querySelector('tbody');
let osszeg = document.querySelector('#osszeg');
let mennyisegID = document.querySelector('#mennyiseg');
let fizetendo = document.querySelector('#fizetendo');
let itemek = [];
let hozzaadottItemek = [];
let vegosszeg = 0;



axios.get('http://localhost:3000/bevasarlolista_').then(res => {

    itemek = res.data;
    itemek.forEach(user => {

        let optionCategory = document.createElement('option');
        optionCategory.value = user.category;
        
        optionCategory.text = user.category;

        // Ellenőrizd, hogy az opció még nincs-e a listában
        if (!Array.from(kategoria.options).some(opt => opt.value === optionCategory.value)) {
            kategoria.add(optionCategory);
        }
    });
      
    
    let termeknev = document.querySelector('#termeknev');
        
    
    kategoria.addEventListener('change', function () {
       
        termeknev.innerHTML = "";

        
        let selectedCategory = this.value;

        
        let filteredItems = itemek.filter(user => user.category === selectedCategory);

        // Adj hozzá új opciókat a második listához
        filteredItems.forEach(item => {
            let optionItem = document.createElement('option');
            optionItem.value = item.productname; // Változtasd meg a name-re, vagy az adatstruktúrádnak megfelelőre
            optionItem.text = item.productname;  // Változtasd meg a name-re, vagy az adatstruktúrádnak megfelelőre
            termeknev.add(optionItem);
        });
    });
}); 
axios.get('http://localhost:3000/hozzaad_').then(res => {
    hozzaadottItemek = res.data;
    
    hozzaadottItemek.forEach(user => {
        
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let td4 = document.createElement('td');
            let td5 = document.createElement('td');
            let td6 = document.createElement('td');

            var btn = document.createElement('input');
            btn.type = "button";
            btn.className = "btn btn-danger";
            btn.value = "-";
            btn.onclick = function torles(){
                tr.remove();
                fizetendoSzamitas();
                mennyisegValtozas()
            }

            var frissit = document.createElement('input');
            frissit.type = "button";
            frissit.className = "btn btn-success";
            frissit.value = "+";
            frissit.onclick = function frissites(){
                user.quantity = mennyisegID.value;  // Frissítjük a mennyiséget a tömbben
                td5.innerHTML = user.unitprice * user.quantity;
                fizetendoSzamitas();
                mennyisegValtozas()
            };

            var mennyiseg = document.createElement('input');
            mennyiseg.type = "number";
            mennyiseg.className = "form-control";
            mennyiseg.value = user.quantity;

            td1.innerHTML = user.category;
            td2.innerHTML = user.productname;
            td4.innerHTML = user.unitprice;
            td5.innerHTML = user.unitprice * user.quantity;

            td3.appendChild(mennyiseg);
            td6.appendChild(frissit);
            td6.appendChild(btn);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            tbody.appendChild(tr);
            fizetendoSzamitas();
            mennyisegValtozas()
    })
});
function termeknevValtozas(){
    for (let i = 0; i < itemek.length; i++) {
        console.log(kategoria.value);
        if (kategoria.value == itemek[i].category){
            if (termeknev.value == itemek[i].productname) {
                egysegar.value = itemek[i].price;
            }
        }
    }
}

function mennyisegValtozas(){
   osszeg.value = mennyisegID.value * egysegar.value;
}
function adatHozzaadas(){

            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let td4 = document.createElement('td');
            let td5 = document.createElement('td');
            let td6 = document.createElement('td');
        var btn = document.createElement('input');
        btn.type = "button";
        btn.className = "btn btn-danger";
        btn.value = "-";
        btn.onclick = function torles(){
            tr.remove();
            fizetendoSzamitas();
            mennyisegValtozas()
        }
        var frissit = document.createElement('input');
        frissit.type = "button";
        frissit.className = "btn btn-success";
        frissit.value = "+";
        frissit.onclick = function frissites(){
            td5.innerHTML = egysegar.value * mennyiseg.value;  
            fizetendoSzamitas();  
            mennyisegValtozas()
        };
        var mennyiseg = document.createElement('input');
        mennyiseg.type = "number";
        mennyiseg.className = "form-control";
        mennyiseg.value = mennyisegID.value;
        let ar = egysegar.value * mennyiseg.value
            td1.innerHTML = kategoria.value;
            td2.innerHTML = termeknev.value;
            td4.innerHTML = egysegar.value;
            td5.innerHTML = ar;
            td3.appendChild(mennyiseg);
            td6.appendChild(frissit);
            td6.appendChild(btn);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            tbody.appendChild(tr);
            hozzaadottItemek.push({"category":kategoria.value,"productname":termeknev.value,"quantity":mennyiseg.value,"unitprice":egysegar.value,"price":ar});
        fizetendoSzamitas();
}

function teljesTorles(){
    
        axios.delete('http://localhost:3000/torles_')
            .then(response => {
                while (tbody.firstChild) {
                    tbody.removeChild(tbody.firstChild);
                }
                hozzaadottItemek = []; // Az adatokat tartalmazó tömbet is töröljük
                fizetendoSzamitas();
            })
            .catch(error => {
                console.error("Hiba történt az adatok törlése közben:", error);
            });
    
    
}

function mentes() {
    
        let promises = [];
    // Azokat az elemeket mentsd csak el újra, amelyek még nincsenek a hozzaadottItemek tömbben
    for (let i = 0; i < hozzaadottItemek.length; i++) {
        let data = {
            category: hozzaadottItemek[i].category,
            productname: hozzaadottItemek[i].productname,
            quantity: hozzaadottItemek[i].quantity,
            unitprice: hozzaadottItemek[i].unitprice,
            price: hozzaadottItemek[i].price
        };

        promises.push(
            axios.post('http://localhost:3000/hozzaad_', data)
                .then(response => {
                    console.log("Adat sikeresen elmentve:", response.data);
                })
                .catch(error => {
                    console.error("Hiba az adat mentése közben:", error);
                })
        );
    }

    Promise.all(promises)
        .then(() => {
            console.log("Minden elmentve.");
        })
        .catch(error => {
            console.error("Hiba történt a mentésnél:", error);
        });
}
function fizetendoSzamitas(){
    mennyisegValtozas();
    let osszeg = 0;
    for (let i = 0; i < hozzaadottItemek.length; i++) {
        osszeg += hozzaadottItemek[i].price;
    }
    fizetendo.value = osszeg;
}


