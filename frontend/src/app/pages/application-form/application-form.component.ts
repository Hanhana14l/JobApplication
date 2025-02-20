import { Component , OnInit} from '@angular/core';
import {  FormBuilder,  FormGroup, Validators } from "@angular/forms"
import  { ActivatedRoute, Router } from "@angular/router"
import  { ApplicationService } from "../../services/application.service"

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.css'
})
export class ApplicationFormComponent implements OnInit{
  applicationForm!: FormGroup;
  jobId!: string;
  resumeFile: File | null = null;
  coverLetterFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private router: Router 
  ) {}

  ngOnInit() {
    const role = localStorage.getItem('role');
    if (role !== 'applicant') {
      alert('Only applicants can submit applications');
      this.router.navigate(['/']);
      return;
    }
    this.applicationForm = this.fb.group({
      resume: [null, Validators.required],
      cover_letter: [null, Validators.required]
    });

    this.route.params.subscribe((params) => {
      this.jobId = params["jobId"];
    });
  }

  onResumeSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.resumeFile = file;
      this.applicationForm.patchValue({ resume: file });
      this.applicationForm.get('resume')?.updateValueAndValidity();
    }
  }

  onCoverLetterSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.coverLetterFile = file;
      this.applicationForm.patchValue({ cover_letter: file });
      this.applicationForm.get('cover_letter')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    const applicantId = localStorage.getItem('userId');
    console.log("this is the applicantId:", applicantId);
  if (!applicantId) {
    console.error("User not logged in");
    return;
  }
    if (this.applicationForm.valid) {
      const applicantId = localStorage.getItem("userId");
      if (!applicantId) {
        console.error("User not logged in");
        return;
      }

      const formData = new FormData();
      formData.append('resume', this.resumeFile!);
      formData.append('cover_letter', this.coverLetterFile!);
      formData.append('applicantId', applicantId);
      formData.append('jobId', this.jobId);
      formData.append('status', 'Submitted');

      this.applicationService.submitApplication(formData).subscribe(
        (response) => {
          console.log("Application submitted successfully", response);
          // Reset form after successful submission
          this.applicationForm.reset();
          this.resumeFile = null;
          this.coverLetterFile = null;
        },
        (error) => {
          console.error("Error submitting application", error);
        }
      );
    }
  }
}
