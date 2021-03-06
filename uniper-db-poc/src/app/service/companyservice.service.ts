import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { Companies } from '../model/companies';
import { Company } from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyserviceService {
  
  companyUrl = baseUrl+"/company/"
  constructor(private http: HttpClient) { }
  getModelBasedOnId(mobileNumber: number) {
    return this.http.get<Company>(this.companyUrl+mobileNumber);
  }
  getAllCompanies() {
    return this.http.get<Companies>(this.companyUrl);
  }
  saveUser(company: Company) {
    return this.http.post<Company>(this.companyUrl,company);
  }
  updateUser(company:Company,id:number){
    console.log("call for rest backend.."+this.companyUrl+id);
    return this.http.put<Company>(this.companyUrl+id,company).pipe(catchError(this.handleError));
  }
  deleteModel(mobileNumber: number) {
    return this.http.delete(this.companyUrl+mobileNumber).pipe(catchError(this.handleError));
  }

  private handleError(httpError: HttpErrorResponse) {
    if (httpError.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', httpError.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${httpError.status}, ` +
        `body was: ${httpError.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
