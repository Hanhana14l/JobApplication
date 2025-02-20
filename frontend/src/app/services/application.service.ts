import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class ApplicationService {
  private apiUrl = "http://localhost:5000/api/applications" // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  submitApplication(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData)
  }
}


