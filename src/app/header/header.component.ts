import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {JavaSqlService} from "../services/java.sql.service";
import {StorageService} from "../services/storage.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  loggedInUser="";
  firstName =""
  lastName=""

  constructor(
    private storageService: StorageService,
    private router: Router,
    private javaSqlService: JavaSqlService){}
  ngOnInit(){
    this.loggedInUser = this.storageService.getData("r4t.loggedInUser")
    if(this.loggedInUser!=""){

      forkJoin({
        firstName: this.javaSqlService.getFirstName(this.loggedInUser),
        lastName: this.javaSqlService.getLastName(this.loggedInUser)
      }).subscribe(({ firstName, lastName }) => {
        this.firstName = firstName;
        this.lastName = lastName;

        // Now you can use firstName and lastName here
        console.log(this.firstName, this.lastName);
      });
    }
  }

  logout(){
    this.router.navigate(['auth'])
    this.storageService.saveData('r4t.loggedInUser',"")
    window.location.reload()
  }
}
