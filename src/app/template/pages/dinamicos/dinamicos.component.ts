import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


interface Persona {
  nombre: string;
  favoritos: Favorito[];
}


interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  nuevoJuego: string = '';
  persona: Persona = {
    nombre: 'Sergio',
    favoritos: [
      {id: 1, nombre: 'Pokemon'},
      {id: 2, nombre: 'God of War'}
    ]
  }

  @ViewChild('miFormulario') miFormulario!: NgForm;


  nombreValido() {
    return this.miFormulario?.controls['nombre']?.invalid &&
          this.miFormulario?.controls['nombre']?.touched
  }

  agregarJuego() {
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.nuevoJuego
    }

    this.persona.favoritos.push({ ...nuevoFavorito });
    this.nuevoJuego = '';
  }

  eliminar(i: number) {
    this.persona.favoritos.splice(i, 1)
  }

  guardar() {
    console.log('Formulario posteado')
  }
}
