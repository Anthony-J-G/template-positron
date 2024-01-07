import { Component } from '@angular/core';
import { ElectronBackendService } from '../../services/electron-backend.service';



@Component({
  selector: 'page-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.css']
})
export class BackendPageComponent {

  private selected_file: string = "";

  constructor(private api: ElectronBackendService) { }

  columns: Array<string> = [
    "Temple", "Boss", "Item", "Great Fairy Reward"
  ];

  data: Array<any> = [
    {temple: "Woodfall", boss: "Odoolwa", item: "Bow", great_fairy: "Super Spin Attack"},
    {temple: "Snowhead", boss: "Goht", item: "Fire Arrows", great_fairy: "Double Magic Meter"},
    {temple: "Great Bay", boss: "Gyorg", item: "Ice Arrows", great_fairy: "Double Defense"},
    {temple: "Stone Tower", boss: "Twinmold", item: "Light Arrows", great_fairy: "Great Fairy's Sword"}
  ];

  fetchedData: Array<any> = [];


  onClick(): void {
    this.api.ping()
  }


  loadTable(): void {
    this.fetchedData = [];

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
