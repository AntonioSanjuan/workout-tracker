import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { FirebaseService } from './firebase.service'
import { LibsServicesFirebaseModule } from './libs/services/firebase.module'
describe('FirebaseService', () => {
  let service: FirebaseService;
  let store: Store;
  let translateService: FirebaseService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        LibsServicesFirebaseModule
     ],
      providers: [
        provideMockStore({
          initialState: {}
        })
      ]
    });
    service = TestBed.inject(FirebaseService);
    store = TestBed.inject(Store)
  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })
});
