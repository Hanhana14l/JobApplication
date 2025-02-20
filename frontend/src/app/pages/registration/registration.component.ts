import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  standalone: false
})
export class RegistrationComponent implements OnInit {
  
  registrationForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    const file = element.files ? element.files[0] : null;
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = new FormData();
      formData.append('name', this.registrationForm.get('name')?.value);
      formData.append('role', this.registrationForm.get('role')?.value);
      formData.append('email', this.registrationForm.get('email')?.value);
      formData.append('password', this.registrationForm.get('password')?.value);
      
      if (this.selectedFile) {
        formData.append('profilePicture', this.selectedFile, this.selectedFile.name);
      }
      formData.forEach((value, key) => {
        console.log(key, value);})
       // Send the form data to the backend
       this.http.post('http://localhost:5000/api/auth/register', formData).subscribe(
        (response: any) => {
          console.log('Registration successful:', response);
          alert('Registration successful!');
        },
        (error: HttpErrorResponse) => {
          console.error('Error during registration:', error);
          alert('Registration failed. Please try again.');
        }
        
      );
      console.log('Form submitted', formData);
      // You can add your API call here
    }
  }
}


