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
      
    // Második legördülő lista (kiválasztott kategóriához tartozó elemek)
    let termeknev = document.querySelector('#termeknev');
        
    // Eseményfigyelő a kategória kiválasztásához
    kategoria.addEventListener('change', function () {
        // Töröld az összes meglévő opciót a második listából
        termeknev.innerHTML = "";

        // Kiválasztott kategória
        let selectedCategory = this.value;

        // Szűrd ki azokat az elemeket, amik a kiválasztott kategóriához tartoznak
        let filteredItems = itemek.filter(user => user.category === selectedCategory);

        // Adj hozzá új opciókat a második listához
        filteredItems.forEach(item => {
            let optionItem = document.createElement('option');
            optionItem.value = item.productname; // Változtasd meg a name-re, vagy az adatstruktúrádnak megfelelőre
            optionItem.text = item.productname;  // Változtasd meg a name-re, vagy az adatstruktúrádnak megfelelőre
            termeknev.add(optionItem);
        });
    });
       
    // Eseményfigyelő a második legördülő lista kiválasztásához
    termeknev.addEventListener('change', function () {
        // A kiválasztott elem szövege
        let selectedOptionText = this.value;
        console.log(selectedOptionText);
    });
    




}); 

axios.get('http://localhost:3000/hozzaad').then(res => {
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
        }
        var frissit = document.createElement('input');
        frissit.type = "button";
        frissit.className = "btn btn-success";
        frissit.value = "()";
        frissit.onclick = function frissites(){
            td5.innerHTML = mennyiseg.value * user.unitprice;
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
        }

        var frissit = document.createElement('input');
        frissit.type = "button";
        frissit.className = "btn btn-success";
        frissit.value = "()";
        frissit.onclick = function frissites(){
            td5.innerHTML = egysegar.value * mennyiseg.value;
            
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
        console.log (hozzaadottItemek);
        
   
}

function teljesTorles(){
    tbody.remove();
    fizetendoSzamitas();
}

function mentes() {
    let promises = [];

    for (let i = 0; i < hozzaadottItemek.length; i++) {
        let data = {
            category: hozzaadottItemek[i].category,
            productname: hozzaadottItemek[i].productname,
            quantity: hozzaadottItemek[i].quantity,
            unitprice: hozzaadottItemek[i].unitprice,
            price: hozzaadottItemek[i].price
        };
        promises.push(
            axios.post('http://localhost:3000/hozzaad', data)
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
    let osszeg = 0;
    for (let i = 0; i < hozzaadottItemek.length; i++) {
        osszeg += hozzaadottItemek[i].price;
        
    }
    
    fizetendo.value = osszeg;

}

