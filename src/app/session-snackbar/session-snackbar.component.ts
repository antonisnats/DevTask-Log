import { Component } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-snackbar',
  standalone: true,
  imports: [CommonModule,MatSnackBarModule],
  templateUrl: './session-snackbar.component.html',
  styleUrl: './session-snackbar.component.scss'
})
export class SessionSnackbarComponent {

}
