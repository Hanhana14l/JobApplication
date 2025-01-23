import { Component, type OnInit } from "@angular/core"
import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      category: ["", Validators.required],
      location: ["", Validators.required],
      salary: ["", [Validators.required, Validators.min(0)]],
      jobType: ["", Validators.required],
    })
  }

  onSubmit(): void {
    if (this.jobForm.valid) {
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

