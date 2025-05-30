import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  imports: [],
  templateUrl: './custom-snackbar.component.html',
  styleUrl: './custom-snackbar.component.scss'
})
export class CustomSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}

export const openCustomSnackBar=(message: string,snackBar:MatSnackBar,duration:number)=> {
  snackBar.openFromComponent(CustomSnackbarComponent, {
    data: message,
    duration: duration,
    panelClass: ['no-background-snackbar']
  });
}
