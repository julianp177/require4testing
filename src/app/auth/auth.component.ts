import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {JavaSqlService} from "../services/java.sql.service";
import {StorageService} from "../services/storage.service";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(
    private javaSqlService: JavaSqlService,
    private router: Router,
    private storageService: StorageService) {
  }
  usernameValue: string = "";
  passwordValue: string = "";
  passwordConfirmation: string = "";
  newPassword: string = "";
  newPasswordConfirmation = "";
  firstName: string = "";
  lastName: string = "";

  errorMessage: string = "";

  loginMode: boolean = true;
  userSaved: boolean = false;
  passwordChanged : boolean = false;

  changePasswordMode: boolean = false;
  signUpMode: boolean = false;

  hovered: boolean = false;

  ngOnInit() {
    if(this.storageService.getData('r4t.loggedInUser')!=""){
      this.router.navigate(['testing'])
    }else{
      this.storageService.saveData("r4t.loggedInUser","")
    }
  }

  login() {
    this.userSaved = false;
    this.passwordChanged = false;
    if(this.loginMode){
      if(this.usernameValue.length>0&&this.passwordValue.length>0){
        this.javaSqlService.checkUser(this.usernameValue).subscribe(response =>{
          if(response==true){
            this.javaSqlService.checkPassword(this.usernameValue,this.passwordValue).subscribe(response2 =>{
              if(response2==true){
                /*this.errorMessage="Eingeloggt"*/
                this.storageService.saveData("r4t.loggedInUser",this.usernameValue)
                this.storageService.saveData('r4t.justLoggedIn',true)
                this.router.navigate(['testing'])
              }else{
                this.errorMessage="Der Username und das Passwort stimmen nicht überein"
              }
            })
          }else{
            this.errorMessage="Der eingegebene Username existiert nicht"
          }
        })
      }else{
        this.errorMessage="Bitte beide Input Felder ausfüllen"
      }
    }else if(this.signUpMode){
      if(this.usernameValue.length>0&&this.firstName.length>0&&this.lastName.length>0&&this.passwordValue.length>0&&this.passwordConfirmation.length>0){
        this.javaSqlService.checkUser(this.usernameValue).subscribe(response =>{
          if(response==false){
            if(this.passwordValue===this.passwordConfirmation){

              this.javaSqlService.addUser(
                this.usernameValue+";"+
                this.passwordValue+";"+
                this.firstName+";"+
                this.lastName+";"
              ).subscribe(response2 =>{
                console.log(response)
              })

              this.loginMode=true;
              this.errorMessage=""
              this.usernameValue=""
              this.passwordValue=""
              this.passwordConfirmation=""
              this.firstName=""
              this.lastName=""
              this.userSaved=true;
            }else{
              this.errorMessage = "Die Passwörter stimmen nicht überein"
            }
          }else{
            this.errorMessage = "Der Nutzername existiert bereits"
          }
        })
      }else{
        this.errorMessage = "Bitte alle Input Felder ausfüllen"
      }
    }else if(this.changePasswordMode){
      this.changePassword()
    }
  }

  switchMode(mode:string){
    this.hovered=false;
    if(mode==="login"){
      this.loginMode = true;
      this.signUpMode = false;
      this.errorMessage = "";
      this.changePasswordMode = false;
    }else if(mode==="signup"){
      this.loginMode = false;
      this.signUpMode = true;
      this.errorMessage = "";
      this.changePasswordMode = false;
    }else if(mode==="changepw"){
      this.loginMode = false;
      this.signUpMode = false;
      this.errorMessage = "";
      this.changePasswordMode = true;
    }
  }
  changePassword(){
    if(this.usernameValue.length>0 && this.passwordValue.length>0 && this.newPassword.length>0 && this.newPasswordConfirmation.length>0){
      this.javaSqlService.checkUser(this.usernameValue).subscribe(response =>{
        if(response){
          this.javaSqlService.checkPassword(this.usernameValue,this.passwordValue).subscribe(response2 =>{
            if(response2){
              if(this.newPassword===this.newPasswordConfirmation){
                this.javaSqlService.changePassword(this.newPassword+';'+this.usernameValue).subscribe(response3 =>{
                  console.log(response3)
                  this.usernameValue=""
                  this.passwordValue=""
                  this.switchMode('login')
                  this.errorMessage=""
                  this.passwordChanged=true;
                  this.newPassword=""
                  this.newPasswordConfirmation=""
                })
              }else{
                this.errorMessage = "Die neuen Passwörter stimmen nicht überein"
              }
            }else{
              this.errorMessage = "Das aktuelle Passwort ist falsch"
            }
          })
        }else{
          this.errorMessage = "Der Username existiert nicht"
        }
      })
    }else{
      this.errorMessage = "Alle Felder müssen ausgefüllt sein"
    }
  }
  hoverToggler(){
    this.hovered = !this.hovered
  }
}

