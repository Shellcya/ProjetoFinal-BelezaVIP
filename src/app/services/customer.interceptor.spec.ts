import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TokenInterceptor } from './customer.interceptor';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe('TokenInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should add an Authorization header', () => {
    httpClient.get('/auth/login').subscribe();

    const req = httpTestingController.expectOne('/auth/login');

    expect(req.request.headers.has('Authorization')).toEqual(true);

    httpTestingController.verify();
  });
});