import {Component, OnInit} from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { IEmployee } from './employee';

@Component({
    selector:'app-list-employee',
    templateUrl:'./list-employee.component.html'
   
})
export class ListEmployeeComponent implements OnInit{
    title:string = "Employees List";

    employees:IEmployee[]|null = null;
    statusMessage:string|null = null;

    constructor(private employeeService: EmployeeService){
        this.statusMessage = 'Loading data...';
    }

    ngOnInit(){
        this.employeeService.getEmployees().subscribe(
            (employees:IEmployee[]) => {
                this.employees = employees;
                console.log(employees);
            },
            (error) => this.statusMessage = error
        );
    }
        
}