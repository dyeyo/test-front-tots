import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  let token = localStorage.getItem('token') || "";
  const tokenFinal = token.replace('"', '').replace('"', '');
  const authReq = tokenFinal
    ? req.clone({ setHeaders: { Authorization: `Bearer  ${tokenFinal}` } })
    : req;

  return next(authReq);
};
