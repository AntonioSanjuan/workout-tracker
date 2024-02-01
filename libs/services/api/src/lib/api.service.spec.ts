import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let httpMock: HttpTestingController;
  let service: ApiService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService)
  });

  describe('Unit tests', () => {
    describe('Unit tests', () => {
      it('should be created', () => {
        expect(service).toBeTruthy();
      });
    })
    describe('Integration tests', () => {
      it('get should made http request', () => {
        type TypeSut = { a: string }
        const urlSut = 'testUrl'
        const responseMock = { partner: true}
  
        service.get<TypeSut>(urlSut).subscribe((resp) => {
          expect(resp).toEqual(responseMock)

          //typeCheck?
        })
  
        const req = httpMock.expectOne(urlSut)
        expect(req.request.method).toBe('GET'); // Verificar que se hizo un request GET
        req.flush(responseMock); // Simular la respuesta del servidor
      })

      it('post should made http request', () => {
        type TypeSut = { a: string }
        const urlSut = 'testUrl'
        const bodySut = { example: true }
        const responseMock = { partner: true}
  
        service.post<TypeSut>(urlSut, bodySut).subscribe((resp) => {
          expect(resp).toEqual(responseMock)
        })
  
        const req = httpMock.expectOne(urlSut)
        expect(req.request.method).toBe('POST'); // Verificar que se hizo un request GET
        req.flush(responseMock); // Simular la respuesta del servidor
      })

      it('delete should made http request', () => {
        type TypeSut = { a: string }
        const urlSut = 'testUrl'
        const responseMock = { partner: true}
  
        service.delete<TypeSut>(urlSut).subscribe((resp) => {
          expect(resp).toEqual(responseMock)
        })
  
        const req = httpMock.expectOne(urlSut)
        expect(req.request.method).toBe('DELETE'); // Verificar que se hizo un request GET
        req.flush(responseMock); // Simular la respuesta del servidor
      })

      it('put should made http request', () => {
        type TypeSut = { a: string }
        const urlSut = 'testUrl'
        const bodySut = { example: true }
        const responseMock = { partner: true}
  
        service.put<TypeSut>(urlSut, bodySut).subscribe((resp) => {
          expect(resp).toEqual(responseMock)
        })
  
        const req = httpMock.expectOne(urlSut)
        expect(req.request.method).toBe('PUT'); // Verificar que se hizo un request GET
        req.flush(responseMock); // Simular la respuesta del servidor
      })
    })
  })
})
