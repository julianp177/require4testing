import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {REQUIREMENT, TESTRUN, USER} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class JavaSqlService {

  baseURL: String = "http://localhost:8080"

  constructor(private http: HttpClient) {
  }
  public checkUser(username:String) {
    return this.http.get(this.baseURL+'/usercheck/'+username)
  }

  public checkPassword(username:String,password:String){
    return this.http.get(this.baseURL+'/passwordcheck/'+password+'/'+username)
  }

  public getData(userId:number):Observable<TESTRUN[]>{
    return this.http.get<TESTRUN[]>(this.baseURL+'/getData/'+userId)
  }

  public getFirstName(userName: String){
    return this.http.get(this.baseURL+'/get/firstname/'+userName,{responseType:"text"})
  }
  public getLastName(userName: String){
    return this.http.get(this.baseURL+'/get/lastname/'+userName,{responseType:"text"})
  }
  public getUserId(userName: String):Observable<number>{
    return this.http.get<number>(this.baseURL+'/get/userid/'+userName)
  }
  public addUser(newUserData:String):Observable<string>{
    return this.http.post(this.baseURL+'/adduser',newUserData,{responseType:'text'})
  }
  public changePassword(newPasswordData:String):Observable<string>{
    return this.http.post(this.baseURL+'/change/password',newPasswordData,{responseType:'text'})
  }
  public getRequirement(){
    return this.http.get<REQUIREMENT[]>(this.baseURL+'/get/req')
  }
  public getUserNames(){
    return this.http.get<String[]>(this.baseURL+'/get/usernames')
  }
  public addRequirement(newRequirementData:String){
    return this.http.post(this.baseURL+'/add/requirement',newRequirementData,{responseType:'text'})
  }
  public addTestrun(newTestrunData:String){
    return this.http.post(this.baseURL+'/add/testrun',newTestrunData,{responseType:'text'})
  }
  public addTestcase(newTestcaseData:String){
    return this.http.post(this.baseURL+'/add/testcase',newTestcaseData,{responseType:'text'})
  }
  public addResult(resultData:String) {
    return this.http.post(this.baseURL+'/add/result',resultData,{responseType:'text'})
  }
  public assignTestcase(assignmentData:String) {
    return this.http.post(this.baseURL+'/assign/testcase',assignmentData,{responseType:'text'})
  }
  public assignTester(assignmentData:String) {
    return this.http.post(this.baseURL+'/assign/tester',assignmentData,{responseType:'text'})
  }
  public getRole(userId:number){
    return this.http.get(this.baseURL+'/get/role/'+userId,{responseType:'text'})
  }

}
