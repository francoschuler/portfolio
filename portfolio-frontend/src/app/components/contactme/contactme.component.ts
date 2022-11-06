import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from 'src/app/models/Message';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

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
              private messageService: MessageService,
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
    this.getMessages();
  }

  getMessages() {
    this.messageService.getMessages()
      .subscribe((res:any) => {
        this.messages = res;
      })
  }

  sendMessage(){

    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      data: { type: 'send'}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result === 1) {
        this.messageService.sendMessage({
          name: this.contactForm.value.name,
          email: this.contactForm.value.email,
          message: this.contactForm.value.message
        }).subscribe((res) => {
          this.contactForm.reset();
          this.openSnackBar('Message was sent correctly.', 'Ok');
        }, (error:any) => {
          this.openSnackBar('Sorry, there was an error trying to send the message. Please, try again.', 'Ok');
  
        })
      }

    });
    
    
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    })
  }

}
