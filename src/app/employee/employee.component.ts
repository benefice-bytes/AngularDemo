import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { IEmployee } from './employee';

@Component({
    selector:'app-employee',
    templateUrl:'./employee.component.html'
  
})
export class EmployeeComponent implements OnInit{
    title:string = "Employee Details";

    employee:IEmployee|null = null;
    statusMessage:string| null = null ;

    constructor(private employeeService:EmployeeService, 
                private activatedRoute:ActivatedRoute,
                private router: Router){
        this.statusMessage = 'Loading data...';
    }
    ngOnInit(){
        let empId = this.activatedRoute.snapshot.params['id'];
        this.employeeService.getEmployee(empId).then(
            (employee:IEmployee) => {
                if (employee == null)
                    this.statusMessage = 'Emloyee code does not exists';
                else
                    this.employee = employee
                },
            (error) => {
                this.statusMessage = error;
                console.log(error)
            }
        );
    }

    onBtnClickBack(){
        this.router.navigate(['/employees']);
    }
}