import { Component, inject, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {AuthService} from '../services/auth.service';
import {MatSnackBar} from  '@angular/material/snack-bar' ;

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,MatCardModule,ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule, // Ajouté pour mat-form-field et mat-error
    MatInputModule,    // Ajouté pour matInput
    MatButtonModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  selectedTab = 0;
  private snackbar=inject(MatSnackBar)

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // Formulaire de connexion
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Formulaire d'inscription
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.matchPasswordsValidator });
  }

  matchPasswordsValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true } : null;
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      console.log('Connexion :', this.loginForm.value);
      // TODO: Appeler l'API d'authentification
    }
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      console.log('Inscription :', this.registerForm.value);
      this.authService.register(this.registerForm.value.email,this.registerForm.value.password,this.registerForm.value.name).subscribe({
        next: user=>{
          this.snackbar.open('Inscription Reussit',undefined,{duration:3000})
          setTimeout(()=>{
            this.selectedTab=0
          },3000)
          
        },
        error: e=>{console.error(e)}
      })
    }
  }
}
