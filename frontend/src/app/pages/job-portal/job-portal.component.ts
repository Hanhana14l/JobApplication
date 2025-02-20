

import { Component, OnInit } from "@angular/core"

import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router" 


interface Job {
 job_id: number
  title: string
  location: string
  description: string
  salary: string
  category: string

}
interface Category {
  name: string;
}
@Component({
  selector: "app-job-portal",
  templateUrl: "./job-portal.component.html",
  styleUrls: ["./job-portal.component.css"],
})
export class JobPortalComponent implements OnInit {
  searchQuery = ""
  jobs: Job[] = []
  filteredJobs: Job[] = []
  showFilters = false

  categories: Category[] = [];
  selectedCategory: string = '';

  constructor(
    private http: HttpClient,
    private router: Router ) {}

  ngOnInit() {
    this.fetchJobs();
    this.fetchCategories();

  }

  
  fetchCategories() {
    this.http.get<Category[]>('http://localhost:5000/api/categories').subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  fetchJobs() {
    this.http.get<Job[]>("http://localhost:5000/api/jobs").subscribe(
      (data) => {
        this.jobs = data
        this.filterJobs()
      },
      (error) => {
        console.error("Error fetching jobs:", error)
      },
    )
  }

  filterJobs() {
    // this.filteredJobs = this.jobs.filter(
    //   (job) =>
    //     job.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    //     job.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
    //     job.location.toLowerCase().includes(this.searchQuery.toLowerCase()),
    // )
    this.filteredJobs = this.jobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || job.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }


  onCategoryChange() {
    this.filterJobs();
  }

  onSearch() {
    this.filterJobs()
  }

  toggleFilters() {
    this.showFilters = !this.showFilters
  }

  applyForJob(jobId: number) {
    console.log(`Applying for job with ID: ${jobId}`)
    if (this.isLoggedIn()) {
      this.router.navigate(['/apply', jobId])
    } else {
      alert('Please login first.')
    }
  }

  
private isLoggedIn(): boolean {
  // Check for authentication token (adapt this based on your auth system)
  return !!localStorage.getItem('token')
}
}


