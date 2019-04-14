import { AuthService } from './auth.service';
import { async } from '@angular/core/testing';

describe('Service: Auth', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
  });

  afterEach(() => {
    service = null;
    localStorage.removeItem('token');
  });
  it('should return true from isAuthenticated when there is a token', async(() => {
    localStorage.setItem('token', '1234');
    service.isAuthenticated().then((isAuthenticated) => expect(isAuthenticated).toBeTruthy());
  }));
  it('should return false from isAuthenticated when there is no token', async(() => {
    service.isAuthenticated().then((isAuthenticated) => expect(isAuthenticated).toBeFalsy());
  }));
});
