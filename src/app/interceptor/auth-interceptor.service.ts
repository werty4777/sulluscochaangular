import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {


    constructor(private router: Router) {
    }

    getToken(): string {
        return <string>localStorage.getItem('token');
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        const token = this.getToken();
        let request = req;
        if (token || token != undefined || token != null) {

            request = req.clone({

                setHeaders: {
                    Authorization: 'Bearer ' + token,
                    'Content-type': 'application/json'
                }

            });

        }
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                console.log(err)
                let status=err.status;
                if (  status==404  ) {
                    this.router.navigate(['/login']);
                    localStorage.removeItem('token');
                    localStorage.removeItem('gmail');
                }
                return throwError(err);

            })
        )


    }
}
