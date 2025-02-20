import { Component, type OnInit } from "@angular/core"
import { FormBuilder,  FormGroup, Validators } from "@angular/forms"
import { JobService } from '../../services/job.service';
@Component({
  selector: "app-job-adding-form",
  templateUrl: "./job-adding-form.component.html",
  styleUrl: "./job-adding-form.component.css",
  standalone: false,
})
export class JobAddingFormComponent implements OnInit {
  jobForm!: FormGroup 
  categories: string[] = ["Technology", "Finance", "Healthcare", "Education", "Other"]
  jobTypes: string[] = ["Full-time", "Part-time", "Contract"]

  constructor(private jobService: JobService, private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      category: ["", Validators.required],
      location: ["", Validators.required],
      salary: ["", [Validators.required]],
      jobType: ["", Validators.required],
    })
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
      const formData = {
        ...this.jobForm.value,
        jobType: this.jobForm.value.jobType.toLowerCase().replace(' ', '-')
      };
      
      this.jobService.createJob(formData)
        .subscribe({
          next: (response) => {
            console.log('Job created:', response);
            alert('Job posted successfully');
          },
            
            error: (err) => {
              console.error('Error creating job:', err);
              // Handle error
            }})
      console.log(this.jobForm.value)
      // Here you would typically send the form data to a server
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.jobForm.controls).forEach((key) => {
        const control = this.jobForm.get(key)
        control?.markAsTouched()
      })
    }
  }
}

