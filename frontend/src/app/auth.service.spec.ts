// import { TestBed } from '@angular/core/testing';

// import { AuthService } from './auth.service';

// describe('AuthService', () => {
//   let service: AuthService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(AuthService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const mockToken = 'fake-jwt-token';
  const apiUrl = 'http://localhost:000/api/login';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send login request with correct credentials', () => {
    const credentials = { email: 'test@example.com', password: 'password123' };

    service.login(credentials).subscribe();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);
  });

  it('should store token on successful login', () => {
    const credentials = { email: 'test@example.com', password: 'password123' };

    service.login(credentials).subscribe(response => {
      expect(response.token).toBe(mockToken);
      expect(localStorage.getItem('token')).toBe(mockToken);
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush({ token: mockToken });
  });

  it('should handle login errors', () => {
    const credentials = { email: 'test@example.com', password: 'wrongpass' };
    const mockError = { status: 401, statusText: 'Unauthorized' };

    service.login(credentials).subscribe({
      error: (err) => {
        expect(err.status).toBe(401);
        expect(localStorage.getItem('token')).toBeNull();
      }
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush(null, mockError);
  });

  it('should handle network errors', () => {
    const credentials = { email: 'test@example.com', password: 'password123' };
    const mockError = new ProgressEvent('error');

    service.login(credentials).subscribe({
      error: (err) => {
        expect(err.error).toBe(mockError);
        expect(localStorage.getItem('token')).toBeNull();
      }
    });

    const req = httpMock.expectOne(apiUrl);
    req.error(mockError);
  });
});