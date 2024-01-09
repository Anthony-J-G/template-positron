import { Component } from '@angular/core';
import { ElectronBackendService } from '../../services/electron-backend.service';



@Component({
  selector: 'page-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.css']
})
export class BackendPageComponent {

  private selected_file: string = "";
  fetchedData: Array<any> = [];
  columns: Array<string> = [];
  

  constructor(private api: ElectronBackendService) { }


  onClick(): void {
    this.api.ping()
  }


  loadTable(): void {
    this.fetchedData = [];
    
    this.api.fetchDemoTable().then((data: any) => {
      console.log(data)

      this.columns = data.columns;
      this.fetchedData = data.rows;

    }).catch((error: any) => {
      console.log(error);
    });
  }


  hasData(): boolean {
    return (this.fetchedData.length != 0)
  }


  getSelectedFile(): string { 
    if (this.selected_file == "") {
      return "No File Selected!";
    }

    return this.selected_file;
  }


  openFileDialog(): void {
    this.api.queryFilePath().then((filepath: string) => {
      this.selected_file = filepath;
    }).catch((error: any) => {
      this.selected_file = `${error}`;
    });
  }
}
