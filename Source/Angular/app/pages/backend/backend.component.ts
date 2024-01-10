import { Component } from '@angular/core';
import { ElectronBackendService } from '../../services/electron-backend.service';



@Component({
  selector: 'page-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.css']
})
export class BackendPageComponent {

  private selected_file: string = "";
  private loadError: any = null;
  private timeToFetch: any;

  fetchedData: Array<any> = [];
  columns: Array<string> = [];
  
  

  constructor(private api: ElectronBackendService) { }


  onClick(): void {
    this.api.ping()
  }

  getTimeToFetch(): string {
    return `${this.timeToFetch}`;
  }

  loadTable(): void {
    this.fetchedData = [];
    const startTime = new Date().getTime();

    this.api.fetchDemoTable().then((data: any) => {
      this.loadError = data.err
      this.columns = data.columns;
      this.fetchedData = data.rows;
      
      const endTime = new Date().getTime();
      this.timeToFetch = endTime - startTime;

    }).catch((error: any) => {
      this.loadError = error;

      const endTime = new Date().getTime();
      this.timeToFetch = endTime - startTime;
    });
  }

  
  getCurrentError(): string {
    return this.loadError;
  }


  hasError(): boolean {
    return (this.loadError !== null);
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
