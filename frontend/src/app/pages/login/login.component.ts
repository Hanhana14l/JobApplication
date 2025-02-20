import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false
})
export class LoginComponent {
  loginForm: FormGroup

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) {
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
          localStorage.setItem('role', response.role);
          localStorage.setItem('userId', response.id);
          
          // Redirect based on role
          if (response.role === 'applicant') {
            this.router.navigate(['/jobAdding']);
          } else if (response.role === 'recruiter') {
            this.router.navigate(['/apply/4']);
          }
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


