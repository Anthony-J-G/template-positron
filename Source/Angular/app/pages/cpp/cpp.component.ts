import { NumberSymbol } from '@angular/common';
import { Component } from '@angular/core';
import { first } from 'rxjs';
import { ElectronBackendService } from '../../services/electron-backend.service';

@Component({
  selector: 'app-cpp',
  templateUrl: './cpp.component.html',
  styleUrls: ['./cpp.component.css']
})
export class CppPageComponent {
  firstNumParam: string = "0";
  secondNumParam: string = "0";

  private solution: number = 0;
  private solutionStmt?: string = "Click to calculate the solution!"

  constructor(private api: ElectronBackendService) { }


  solve(): void {
    const firstNumber: number = parseFloat(this.firstNumParam);
    const secondNumber: number = parseFloat(this.secondNumParam);

    if (Number.isNaN(firstNumber) || Number.isNaN(secondNumber)) {
      this.solutionStmt = undefined;
      return;
    }

    this.api.runCppFunction(firstNumber, secondNumber)
    .then((data: any) => {
      this.solution = data;
      this.solutionStmt = `Solution: ${this.solution}`;
    }).catch((err) => {
      console.error(err);
    });    
  }


  getSolution(): string {
    if (this.solutionStmt === null) {
      return "Error: Cannot find solution!";
    }
    if (this.solutionStmt === undefined) {
      return "Error: The solution does not exist!";
    }

    return this.solutionStmt;
  }

}
