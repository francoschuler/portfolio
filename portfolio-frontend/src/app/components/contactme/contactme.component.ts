import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from 'src/app/models/Message';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


@Component({
  selector: 'app-contactme',
  templateUrl: './contactme.component.html',
  styleUrls: ['./contactme.component.scss']
})
export class ContactmeComponent implements OnInit {

  contactForm: any;
  messages: Message[] = [];
  isLogged: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
              ) { }

  ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn();
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  sendMessage(e: Event){

    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: { type: 'send'}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result === 1){
        let templateParams = {
          from_name: this.contactForm.value.name,
          from_email: this.contactForm.value.email,
          message: this.contactForm.value.message
        };
    
        e.preventDefault();
        emailjs.send('service_xr86skc', 'template_coz416g', templateParams, 'qSmwZHh2LQOY63XqJ')
          .then((result: EmailJSResponseStatus) => {
            this.openSnackBar('Thanks! Your message was sent correctly.', 'Ok', 'success-snackbar');
            this.contactForm.reset();
          }, (error) => {
            this.openSnackBar('Sorry, your message could not be sent. Please, try again.', 'Ok', 'error-snackbar');
            console.log(error.text);
          });
      }
    })

  }

  openSnackBar(message: string, action: string, panelClass: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: [panelClass],
    })
  }

}
