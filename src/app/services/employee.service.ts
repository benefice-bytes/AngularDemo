import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http"
import { Observable, throwError } from "rxjs";
import {catchError, map} from "rxjs/operators";
import { IEmployee } from "../employee/employee";


@Injectable()
export class EmployeeService{

    readonly APIUrl = "https://localhost:44388/api/Employee/";

    constructor(private httpClient:HttpClient){

    }

    getEmployees():Observable<IEmployee[]>{
        return this.httpClient.get<IEmployee[]>(this.APIUrl)
                .pipe( catchError(this.handleError));
    }

    // getEmployee(id:string):Observable<IEmployee>{
    //     return this.httpClient.get<IEmployee>(this.APIUrl + id)
    //                 .pipe(catchError(this.handleError));
    // }

    getEmployee(id:string):Promise<IEmployee>{
        const promise = new Promise<IEmployee>((resolve, reject) =>{
            this.httpClient.get<IEmployee>(this.APIUrl + id)
            .toPromise()
            .then( (result: IEmployee)=>{
                console.log('result callback: ' + JSON.stringify(result));
                resolve(result);
            }).
            catch((errorResponse:HttpErrorResponse) => 
                {
                    let errorMessage = JSON.stringify(errorResponse.message);
                    if (errorResponse.status == 400)
                        reject(`Employee Id: [${id}] not found`)
                    else
                        console.log(`Server side error: ${errorMessage} `);

                    reject(`Server side error: ${errorMessage}`);
                }
            ),
            (err:any) => { reject(err);}
            
        });
        return promise;
    }

    private handleError(errorResponse:HttpErrorResponse){
        let errorMessage = 'Unknown error';
        if(errorResponse.error instanceof ErrorEvent){
            console.log('Client side error: '+ errorResponse.error.message);
        }
        else
            console.log('Server side error');

        return throwError('There is a proble with the service');
    }
}