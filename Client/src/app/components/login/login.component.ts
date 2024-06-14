import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      otp: ['', [Validators.required, Validators.pattern('[0-9]{6}')]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      // Logic to authenticate the user with the provided phone number and OTP
      const phoneNumber = this.loginForm.value.phoneNumber;
      const otp = this.loginForm.value.otp;

      // Example: Send the phoneNumber and OTP to a backend server for authentication
      // This is just a placeholder, actual implementation depends on your backend
      // this.authService.login(phoneNumber, otp)
      //     .subscribe(
      //         (response) => {
      //           // Handle successful login
      //         },
      //         (error) => {
      //           // Handle login error
      //         }
      //     );
    } else {
      // Form is invalid, handle error or show validation messages
    }
  }
}
