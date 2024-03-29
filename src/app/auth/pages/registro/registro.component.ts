import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from 'src/app/shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern) ] ],
    email: ['', [ Validators.required, Validators.pattern(this.validatorService.emailPattern) ], [ this.eV ] ],
    username: ['', [ Validators.required, this.validatorService.noPuedeSerStrider ] ],
    password: ['', [ Validators.required, Validators.minLength(6) ] ],
    password2: ['', [ Validators.required ] ],
  }, {
    validators: [ this.validatorService.camposIguales('password','password2') ]
  })

  get emailErrorMsg(): string {

    const errors = this.miFormulario.get('email')?.errors;

    if ( errors?.['required'] ){
      return 'Email es obligatorio';
    }else if ( errors?.['pattern'] ){
      return 'El valor ingresado no tiene formato de email'
    }else if ( errors?.['emailTomado'] ){
      return 'El email ingresado ya fue tomado'
    }

    return ''
  }

  constructor( private fb: FormBuilder,
                private validatorService: ValidatorService,
                private eV: EmailValidatorService) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Sergio Calderón',
      email: 'test1@test.com',
      username: 'scdm97',
      password: '123456',
      password2: '123456',
    })
  
  }

  campoNoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid 
            && this.miFormulario.get(campo)?.touched;
  }



  // emailRequired() {
  //   return this.miFormulario.get('email')?.errors?.['required']
  //           && this.miFormulario.get('email')?.touched;
  // }

  // emailFormat() {
  //   return this.miFormulario.get('email')?.errors?.['pattern']
  //           && this.miFormulario.get('email')?.touched;
  // }

  // emailTomado() {
  //   return this.miFormulario.get('email')?.errors?.['emailTomado']
  //           && this.miFormulario.get('email')?.touched;
  // }

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
