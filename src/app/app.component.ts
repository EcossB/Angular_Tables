import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HtmlTagDefinition } from '@angular/compiler';
import { last } from 'rxjs';

interface cars{
  id: number,
  marca: string,
  modelo: string,
  year: string,
  version: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  //template: `<h1>Hello world!</h1>`,
  styleUrl: './app.component.css'
})

export class AppComponent  implements OnInit{

  title = 'Tables with Angular!';

  constructor() { }

   cars: cars[] = [
    {id: 1 , marca: 'ford', modelo: 'escape', year: '2022', version: '4*4'},
  ];

  idInput = document.getElementById("idInput") as HTMLInputElement;
  brand = document.getElementById("marcaInput") as HTMLInputElement;
  model = document.getElementById("modeloInput") as HTMLInputElement;
  year = document.getElementById("añoInput") as HTMLInputElement;
  version = document.getElementById("versionInput") as HTMLInputElement;


  addCar() {

   this.brand = document.getElementById("marcaInput") as HTMLInputElement;
   this.model = document.getElementById("modeloInput") as HTMLInputElement;
   this.year = document.getElementById("añoInput") as HTMLInputElement;
   this.version = document.getElementById("versionInput") as HTMLInputElement;

    if(this.brand.value === '' || this.model.value === '' ||
    this.year.value === '' || this.version.value === ''  ) {
      alert("Tiene que llenar todos los campos")
    } 
    else {

      this.pushToCars()
      localStorage.setItem('carros', JSON.stringify(this.cars))
      localStorage.getItem('carros');
      this.cleanRows()
      this.setStorage()
      
    }

 }

  pushToCars(){

    //No es buena practica acceder a la interfaz para saber el estado de la data. 
    //lo ideal es que si tenemos la el array de datos en el back podemos consumirlo y saber el estado 
    //del array en tiempo real.  

    if(this.cars.length ==0 ){
      this.cars.push({
        "id": 1,
        "marca": this.brand.value, 
       "modelo": this.model.value, 
        "year": this.year.value, 
        "version": this.version.value})
    } else{

      let lastId = this.cars.reduce((pre, cv) => {
        return (pre.id > cv.id) ? pre : cv
      }).id;

      this.cars.push({
        "id": lastId + 1,
        "marca": this.brand.value, 
       "modelo": this.model.value, 
        "year": this.year.value, 
        "version": this.version.value})
    }
  }


 
 /*

  Este metodo lo que hace es recibir un objeto de datos de cualquier tipo
  Estoy usando any porque no estoy especificando de que tipo de objetos entran en el metodo.}
  Si quisiera un tipo de obhjeto en especifico utilizaria una interfaz.
 */
 selectRow(c:cars) {

  console.log(c)

  this.idInput =  document.getElementById("idInput") as HTMLInputElement;
  this.brand = document.getElementById("marcaInput") as HTMLInputElement;
  this.model = document.getElementById("modeloInput") as HTMLInputElement;
  this.year = document.getElementById("añoInput") as HTMLInputElement;
  this.version = document.getElementById("versionInput") as HTMLInputElement;

  console.log(c.id)

  let editbtn = document.getElementById("editarbtn") as HTMLButtonElement;

  this.idInput.value = c.id.toString();
  this.brand.value = c.marca;
  this.model.value = c.modelo;
  this.year.value = c.year;
  this.version.value = c.version;

    // const ultimoId = (_cars:any[], index: number, maxId: number): number => {
    //   let lastCar = _cars[index];

    //   if (!lastCar){
    //     return maxId;
    //   } else{

    //     maxId = (maxId < lastCar.id) ? lastCar.id : maxId;

    //     index++;
    //     return ultimoId(_cars, index, maxId);
    //   }
    // }

    //console.log('ultimo id: ', ultimoId(this.cars,0,0));


    

  }

 deleteRow() {

  //console.log(c.id)

  this.idInput = document.getElementById("idInput") as HTMLInputElement;
  console.log(this.idInput.value)

  const index = this.cars.findIndex(el => el.id === parseInt(this.idInput.value))

  if (index > -1) {
    this.cars.splice(index, 1);
  }

  this.cleanRows();
  this.setStorage();
  }

  editCar() {

    this.idInput = document.getElementById("idInput") as HTMLInputElement;
    this.brand = document.getElementById("marcaInput") as HTMLInputElement;
    this.model = document.getElementById("modeloInput") as HTMLInputElement;
    this.year = document.getElementById("añoInput") as HTMLInputElement;
    this.version = document.getElementById("versionInput") as HTMLInputElement;
  

    let data = this.cars.findIndex((obj => obj.id == parseInt(this.idInput.value)));

    console.log("Array antes de modificar: " , this.cars[data]); 
    
    this.cars[data].marca = this.brand.value;
    this.cars[data].modelo = this.model.value;
    this.cars[data].year = this.year.value;
    this.cars[data].version = this.version.value;

    this.cleanRows();
    this.setStorage();
    
  }


  cleanRows(){
    this.idInput.value = "";
    this.brand.value = "";
    this.model.value = "";
    this.year.value = "";
    this.version.value = "";
  }

  setStorage(){
    localStorage.setItem('carros', JSON.stringify(this.cars))
  }
  
  getStorage(){
    localStorage.getItem('carros');
  }

 ngOnInit() {

  console.log(localStorage.getItem('carros'))

  let data = localStorage.getItem('carros');

  if(data){
    this.cars = JSON.parse(data);
  }

}


}
