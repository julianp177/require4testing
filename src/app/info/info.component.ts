import { Component } from '@angular/core';
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  loggedInUser = ""
  constructor(private storageService: StorageService, private router: Router) {
  }
  ngOnInit(){
    this.loggedInUser = this.storageService.getData("r4t.loggedInUser")
    if(this.storageService.getData("r4t.loggedInUser")===""){
      this.router.navigate(['auth'])
    }
  }
}
