import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  id!:number;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private activeRouter:ActivatedRoute
  ) {
    
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)]
    });
  }

  ngOnInit() {
    this.id=Number(this.activeRouter.snapshot.paramMap.get("id") as string);
    this.authService.getProfile(this.id).subscribe({
      next: (user: User) => {
        this.profileForm.patchValue({
          name: user.name,
          email: user.email
        });
      },
      error: (error) => {
        this.snackBar.open('Erreur lors du chargement du profil.', 'Fermer', { duration: 5000 });
        console.error('Erreur :', error);
      }
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const user: User = {
        id: this.id,
        name: this.profileForm.value.name,
        email: this.profileForm.value.email,
        role: 'USER',
        ...(this.profileForm.value.password && { password: this.profileForm.value.password })
      };
      this.authService.updateProfile(user).subscribe({
        next: () => {
          this.snackBar.open('Profil mis à jour !', 'Fermer', { duration: 3000 });
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de la mise à jour.', 'Fermer', { duration: 5000 });
          console.error('Erreur :', error);
        }
      });
    }
  }
}