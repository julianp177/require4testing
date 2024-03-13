import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {JavaSqlService} from "../services/java.sql.service";
import {StorageService} from "../services/storage.service";
import {REQUIREMENT, TESTCASE, TESTRUN, USER} from "../interfaces";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent {

  loggedInUser=""
  userId : number = 999999
  role = ""
  testruns:TESTRUN[] = []
  requirements: REQUIREMENT[] = []
  testcases: TESTCASE[] = []
  userNames: String[] = []
  closeResult = '';
  waitForModal = false;

  newReqValue = ""
  newDescriptionValue = ""
  newTestrunValue =""
  newTestcaseValue = ""
  newResultValue = "Ergebnis auswählen"

  chosenRequirement = "Anforderung auswählen"
  chosenTestcase = ""
  chosenTestrun = "Testlauf auswählens"
  chosenTester:String = "Tester auswählen"
  chosenRequirementId=99999
  chosenTestcaseId = 99999
  chosenTestrunId = 99999

  requirementForAssignment = 999999

  errorMessage = ""

  constructor(
    public javaSqlService:JavaSqlService,
    private storageService: StorageService,
    private router: Router,
    private modalService: NgbModal) {
  }

  ngOnInit(){
    this.getData()
  }

  getData() {
    this.testruns = []
    this.testcases = []
    this.loggedInUser = this.storageService.getData("r4t.loggedInUser")
    if(this.storageService.getData("r4t.loggedInUser")===""){
      this.router.navigate(['auth'])
    }
    if(this.loggedInUser!=""){
      if(this.storageService.getData('r4t.justLoggedIn')){
        this.storageService.saveData('r4t.justLoggedIn',false)
        location.reload()
      }
      this.javaSqlService.getUserId(this.loggedInUser).subscribe(response1 =>{
        this.userId = response1;
        this.javaSqlService.getRequirement().subscribe(response2 =>{
          this.requirements = response2;
          console.log(this.requirements);
          this.javaSqlService.getUserNames().subscribe(response3 =>{
            this.userNames = response3
            console.log(this.userNames)
            this.javaSqlService.getRole(this.userId).subscribe(response4 =>{
              this.role = response4
              console.log(this.role)
            })
          })
          /*this.testruns.push(this.requirements[0].testrun_ID[0])*/
          for(let i=0;i<this.requirements.length;i++){
            for(let j=0;j<this.requirements[i].testrun_ID.length;j++){
              this.testruns.push(this.requirements[i].testrun_ID[j])
            }
          }
          console.log(this.testruns)
          /*for(let i=0;i<this.testruns.length;i++){
            for(let j=0;j<this.testruns[i].testcase_ID.length;j++){
              this.testcases.push(this.testruns[i].testcase_ID[j])
            }
          }*/
          for(let i = 0;i<this.requirements.length;i++){
            for(let j = 0;j<this.requirements[i].testcase_ID.length;j++){
              this.testcases.push(this.requirements[i].testcase_ID[j])
            }
          }
          console.log(this.testcases)
        })
      })
    }
  }

  show(content: any): void {
    this.waitForModal = true;
    this.chosenRequirement = "Anforderung auswählen"
    this.chosenTester = "Tester auswählen"
    this.chosenTestrun = "Testlauf auswählen"
    this.modalService.open(content, {
      fullscreen: false,
      scrollable: false,
      size:"sm",
      ariaLabelledBy: 'modal-basic-title'
    }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addRequirement(){
    if(this.newReqValue!=""&&this.newDescriptionValue!=""){
      this.javaSqlService.addRequirement(this.newReqValue+";"+this.newDescriptionValue).subscribe(result=>{
        console.log(result)
      })
      this.errorMessage="";
      this.newDescriptionValue=""
      this.newReqValue=""
      this.getData()
      this.modalService.dismissAll()
    }else{
      this.errorMessage="Bitte alle Felder ausfüllen"
    }
  }

  addTestrun() {
    if(this.newTestrunValue!=""&&this.chosenRequirement!="Anforderung auswählen") {
      this.javaSqlService.addTestrun(this.newTestrunValue+";"+this.chosenRequirementId).subscribe(result=>{
        console.log(result)
      })
      this.errorMessage = ""
      this.chosenRequirement = ""
      this.chosenRequirementId = 999999
      this.newTestrunValue = ""
      this.getData()
      this.modalService.dismissAll()
    }else{
      this.errorMessage="Bitte alle Felder ausfüllen"
    }
  }

  addTestcase() {
    if(this.newTestcaseValue!=""&&this.chosenRequirement!="Anforderung auswählen") {
      this.javaSqlService.addTestcase(this.newTestcaseValue+";"+this.chosenRequirementId).subscribe(result=>{
        console.log(result)
      })
      this.errorMessage = ""
      this.chosenRequirement = ""
      this.chosenRequirementId = 99999
      this.newTestcaseValue = ""
      this.getData()
      this.modalService.dismissAll()
    }else{
      this.errorMessage="Bitte alle Felder ausfüllen"
    }
  }

  addResult() {
    if(this.newResultValue!="Ergebnis auswählen") {
      this.javaSqlService.addResult(this.newResultValue+';'+this.chosenTestcaseId).subscribe(result=>{
        console.log(result)
      })
      this.errorMessage = ""
      this.chosenTestcase = ""
      this.chosenTestcaseId = 99999
      this.newResultValue = "Ergebnis auswählen"
      this.getData()
      this.modalService.dismissAll()
    }else{
      this.errorMessage="Bitte Ergebnisfeld ausfüllen"
    }
  }

  assignTestcase() {
    if(this.chosenTestcase!="Testfall auswählen") {
      this.javaSqlService.assignTestcase(this.chosenTestrunId+';'+this.chosenTestcaseId).subscribe(result=>{
        console.log(result)
        console.log(this.chosenTestcaseId)
        console.log(this.chosenTestrunId)
      })
      this.errorMessage = ""
      this.chosenTestcase = ""
      this.chosenTestcaseId = 99999
      this.chosenTestrun = "Testlauf auswählen"
      this.chosenTestrunId = 99999
      this.getData()
      this.modalService.dismissAll()
    }else{
      this.errorMessage="Bitte eine komplette Zuweisung auswählen"
    }
  }

  assignTester() {
    if(this.chosenTester!="Tester auswählen") {
      let userId
      for(let i=0;i<this.userNames.length;i++){
        if(this.userNames[i]==this.chosenTester){
          userId = i+1
        }
      }
      this.javaSqlService.assignTester(userId+';'+this.chosenTestrunId).subscribe(result=>{
        console.log(result)
      })
      this.errorMessage = ""
      this.chosenTester = ""
      this.chosenTestrun = "Testlauf auswählen"
      this.chosenTestrunId = 99999
      this.getData()
      this.modalService.dismissAll()
    }else{
      this.errorMessage="Bitte einen Tester auswählen"
    }
  }
}
