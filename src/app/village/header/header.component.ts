import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { faSeedling, faHome, faGlobe, faChartLine, faBook, faEnvelope, faSmileWink } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() btnClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() btnFieldsClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  faSeedling = faSeedling;
  faHome = faHome;
  faGlobe = faGlobe;
  faChartLine = faChartLine;
  faBook = faBook;
  faEnvelope = faEnvelope;
  faSmileWink = faSmileWink;

  faStyle = {
    'color': 'darkgreen'
  };

  constructor() { }

  ngOnInit(): void {
  }

  onBuildingsClick(){
    this.btnClick.next(true);
  }

  onFieldsClick(){
    this.btnFieldsClick.next(true);
  }

}
