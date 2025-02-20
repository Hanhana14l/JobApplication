// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class JobService {

//   constructor() { }
// }

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // Makes the service available application-wide
})
export class JobService {
  private apiUrl = 'http://localhost:5000/api/jobs';

  constructor(private http: HttpClient, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // Create a new job
  createJob(jobData: any): Observable<any> {

     const token = localStorage.getItem('token'); // Get JWT token
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const payload = {
      title: jobData.title,
      description: jobData.description,
      category: jobData.category,
      location: jobData.location,
      salary: jobData.salary,
      job_type: jobData.jobType.toUpperCase().replace('-', '_'), // Convert to enum format
    
    };
    return this.http.post(this.apiUrl, payload, { headers });
  }

  // Get all jobs 
  getJobs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Get single job by ID 
  getJobById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Update job 
  updateJob(id: string, jobData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, jobData);
  }

  // Delete job 
  deleteJob(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}