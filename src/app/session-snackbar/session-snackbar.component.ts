import { Component } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-session-snackbar',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './session-snackbar.component.html',
  styleUrl: './session-snackbar.component.scss'
})
export class SessionSnackbarComponent {

}
