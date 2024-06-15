import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    imports: [CommonModule, ReactiveFormsModule],
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    otpForm!: FormGroup;
    otpGenerated: boolean = false;

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.loadUserProfile().subscribe({
            next: user => {
                console.log('user',user);
            },
            error: error => {
                console.error('Error loading user profile:', error);
            }
        });
        this.loginForm = this.formBuilder.group({
            phoneNumber: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
        });
        this.otpForm = this.formBuilder.group({
            otp: ['', [Validators.required, Validators.pattern('[0-9]{6}')]]
        })
    }

    createOtp() {
        if (this.loginForm.valid) {
            const phoneNumber = this.loginForm.value.phoneNumber;
            this.authService.generateOtp(phoneNumber)
                .subscribe({
                    next: (data) => {
                        if (data) {
                            this.otpGenerated = true;
                        }
                    },
                    error: (error) => {
                        console.log(error);
                    }
                });
        } else {
            return;
        }
    }

    login() {
        if (this.otpForm.valid) {
            const phoneNumber = this.loginForm.value.phoneNumber;
            const otp = this.otpForm.value.otp;
            this.authService.verifyOtp(phoneNumber, otp)
                .subscribe({
                    next: (data: Object) => {
                        if (data) {
                            this.otpGenerated = false;
                        }
                    },
                    error: (error: Error) => {
                        console.log(error);
                    }
                });
        }
    }
}
