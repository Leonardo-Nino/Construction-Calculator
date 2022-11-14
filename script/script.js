

//Calculadora de materiales de construccion 


 // Funciones 

function datosLS (){
    let datos = localStorage.getItem("calculos")
    return  datos = JSON.parse(localStorage.getItem("calculos")) || []
}

function crearTabla (){

   datosCalculos.innerHTML = " "

   for(const calculos of objetosCalculos) {

      
      const tr = document.createElement("tr")

      const td1 = document.createElement("td")
      td1.innerText = calculos.dateOfCal

      const td2 = document.createElement("td")
      td2.innerText = calculos.material

      const td3 = document.createElement("td")
      td3.innerText = calculos.metrosCuadrados

      const td4 = document.createElement("td")
      td4.innerText = calculos.calculoPintura

      const td5 = document.createElement("td")
      td5.innerText = calculos.calculoConstruccion

   
      tr.append(td1)
      tr.append(td2)
      tr.append(td3)
      tr.append(td4)
      tr.append(td5)

      datosCalculos.append(tr);
   }
}



function squareMeter (){  

    let resultado = heigth.value *  width.value

   return resultado

}



function cleanInput(){

   document.getElementById("alto").value = ""
   document.getElementById("ancho").value = ""
   document.getElementById("cantidadManos").value = ""
}



function calcularConstruccion() {

   totalConstruccion =   squareMeter()  *  select.value 


    // cada ves que se ejecuta la funcion pongo el contador de la funcion opuesta es 0 para que no se generen valores que no quiero en la tabla 
   
   totalPintura = 0

      //captuto nombre de la opcion del selec
   
   const material = options[options.selectedIndex].innerHTML


      // creo un parrafo con el resultado del calculo 

   newParrafo.innerHTML = " "
   newParrafo = document.createElement("p")
   newParrafo.innerHTML = `Superficie ingresada: ${squareMeter()} metros cuadrados.<br>  
                           Usted necesita :${totalConstruccion} ${material}.`
   document.getElementById("form").append(newParrafo)
   

}



function calcularPintura() {

   totalPintura =  ((squareMeter()  * cantidadDeManos.value) /  select.value).toFixed(2)


   totalConstruccion = 0

      //captuto nombre de la opcion del selec
   
   const material = options[options.selectedIndex].innerHTML

      // creo un parrafo con el resultado del calculo 

   newParrafo.innerHTML = " "
   newParrafo = document.createElement("p")
   newParrafo.innerHTML = `Superficie ingresada: ${squareMeter()}  metros cuadrados.<br>
                           Capas de pintura: ${cantidadDeManos.value}. <br>
                           Usted necesita: ${totalPintura} litros de ${material}.`

   document.getElementById("form").append(newParrafo)
   

}


//Globals var 


      //Main  var 
      
      const DateTime = luxon.DateTime
      const hoy =  DateTime.now().toFormat("FF")

      const select = document.getElementById ("select")  
      const datosCalculos = document.getElementById ("datosCalculos")
      const botonFecha = document.getElementById ("ordenarFecha")
      const botonLimpiarTabla = document.getElementById("limpiarTabla")
      
      
      let heigth = document.getElementById("alto")
      let width =  document.getElementById("ancho")
      let cantidadDeManos  = document.getElementById("cantidadManos")

      let options = select.options   
      let objetosCalculos = datosLS()
      
      
      
      
            //Aux var 
            let newParrafo = ""
            let totalPintura = 0
            let totalConstruccion = 0
      
      


//Crear lista de  opciones en el DOM de manera dinamica  consumiendo un json

fetch("../materials.json")
   .then( (response) => {
      return response.json();
   }).then( (data) => {

         for(const materials of data) {
         const opciones = document.createElement("option")
         opciones.innerHTML = materials.names             
         opciones.value = materials.coverSquareMeter
         opciones.id = materials.id

         document.getElementById("select").append(opciones) 
         
         
         }
});



// inicio la tabla de datos con los datos guardados en el local storage

crearTabla ()



//-------------------Eventos----------------------





// Muestro el input  "cantidad de manos"  segun condicion "


let visible = document.getElementById("manos") 

select.addEventListener("click" , (event) =>{

   visible.style.display = "none"        // opcion  por defecto cada ves que se ejecuta el evento (Limpio)

   const id   = options[options.selectedIndex].id
   
   id ==="1" && (visible.style.display = "flex")
   
})



// lipiar parrafo creado cuando selecciono un material diferente

select.addEventListener("click", () => {

   newParrafo.innerHTML = ""
})


//  botón calcular 

let btnCalcular  = document.getElementById ("calcular")

   
btnCalcular.addEventListener("click" , () => {

   const id   = options[options.selectedIndex].id


   switch (id) {
      case "1" : calcularPintura()
      break;

      case "2": calcularConstruccion()
      break;

      default : swal( "Oh no!","Seleccione una opción","warning")
      break;
   }

   // Obtengo Input

   const material = options[options.selectedIndex].innerHTML
   const metrosCuadrados = squareMeter()
   const calculoPintura = totalPintura
   const calculoConstruccion = totalConstruccion
   const dateOfCal = hoy

    // agrego  los input a un array

   objetosCalculos.push  ({
      material: material,
      metrosCuadrados :metrosCuadrados,
      calculoPintura: calculoPintura,
      calculoConstruccion : calculoConstruccion,
      dateOfCal : hoy
   }) 

   // Guardo el  objeto en el locaStorage

   localStorage.setItem("calculos", JSON.stringify(objetosCalculos))

   crearTabla ()

   cleanInput()

   
})


// ordeno tabla por fecha

botonFecha.addEventListener("click", ()=>{

   objetosCalculos.reverse((a) => {
   a.dateOfCal
   })

   crearTabla()
})


// Boton limpiar tabla  (limpiar localStorage)


botonLimpiarTabla.addEventListener("click", () => {

   
   localStorage.setItem("calculos", JSON.stringify([]))
   
   objetosCalculos =  datosLS()

   crearTabla()

})





