var app = angular.module('bevasarlo', ['ngRoute', 'ngNotify']);
let kategoria = document.querySelector("#kategoria");
let termeknev = document.querySelector('#termeknev');
let egysegar = document.querySelector('#egysegar')
let tbody = document.querySelector('tbody');
let itemek = [];

app.run(function($rootScope){

    $rootScope.title = "Bevásárló lista";
        
    
});

axios.get('http://localhost:3000/bevasarlolista_').then(res => {

    if(itemek.includes(res.data)){
        
    }
    else{
        itemek = res.data;
    }
    
    itemek.forEach(user => {

        let optionCategory = document.createElement('option');
        optionCategory.value = user.category;
        optionCategory.innerText = user.category;
        kategoria.appendChild(optionCategory);


        let optionProduct = document.createElement('option');
        optionProduct.value = user.productname;
        optionProduct.innerText = user.productname;
        termeknev.appendChild(optionProduct);

        

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

        var frissit = document.createElement('input');
        frissit.type = "button";
        frissit.className = "btn btn-success";
        frissit.value = "()";

        var mennyiseg = document.createElement('input');
        mennyiseg.type = "number";
        mennyiseg.className = "form-control";
        mennyiseg.value = 0;

        
        

        td1.innerHTML = user.category;
        td2.innerHTML = user.productname;
        td4.innerHTML = user.price;
        td5.innerHTML = td3.value * td4.value;
        

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
       
    });

   


}); 

function valtozas(){
    for (let i = 0; i < itemek.length; i++) {
        
        if (termeknev.value == itemek[i].productname) {
            egysegar.value = itemek[i].price;

        }
        
    }
}


