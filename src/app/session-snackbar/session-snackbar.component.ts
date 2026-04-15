import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-snackbar',
  standalone: true,
  imports: [CommonModule,MatSnackBarModule],
  templateUrl: './session-snackbar.component.html',
  styleUrl: './session-snackbar.component.scss'
})
export class SessionSnackbarComponent {

  // constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string }) {}

}
