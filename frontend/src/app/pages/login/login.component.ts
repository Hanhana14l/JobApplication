import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false
})
export class LoginComponent {
  loginForm: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('Login successful', response);
          alert('Login successful');
          // Store the token in localStorage or a cookie
          localStorage.setItem('token', response.token);
        },
        (error) => {
          console.error('Login failed', error);
          alert('Invalid email or password');
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
   
  }


