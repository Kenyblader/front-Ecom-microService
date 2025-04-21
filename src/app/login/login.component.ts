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
import { error } from 'console';
import { openCustomSnackBar } from '../components/custom-snackbar/custom-snackbar.component';
import { Route, Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private authService: AuthService,private router:Router) {
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
      this.authService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe({
        next:token=>{
          console.log(token);
          openCustomSnackBar('Login succes',this.snackbar,2000)
          this.router.navigate(['/admin'])

        },
        error:e=>{
          openCustomSnackBar('Login false Verifier vos identifiants',this.snackbar,3000)
          console.log(e)
        }
      })
    }
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      console.log('Inscription :', this.registerForm.value);
      this.authService.register(this.registerForm.value.email,this.registerForm.value.password,this.registerForm.value.name).subscribe({
        next: user=>{
          openCustomSnackBar('Inscription reussit',this.snackbar,3000)
          setTimeout(()=>{
            this.selectedTab=0
          },3000)
          
        },
        error: e=>{console.error(e);
          openCustomSnackBar('Un Probleme est survenu veuiller reessayer',this.snackbar,3000)
        }
      })
    }
  }
}
