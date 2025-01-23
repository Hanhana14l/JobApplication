import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: false
})
export class HomeComponent {
  searchQuery: string = '';
  results: any[] = [];     // Store search results

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Initialize any logic here
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.http.get(`http://localhost:5000/api/search?query=${this.searchQuery}`)
        .subscribe({
          next: (response: any) => {
            console.log('Search results:', response.results);
            this.results = response.results; // Bind this to the search results in your component
          },
          error: (err) => {
            console.error('Search error:', err);
          }
        });
    
  }
 }

  }
