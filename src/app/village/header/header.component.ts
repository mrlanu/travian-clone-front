import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { faSeedling, faHome, faGlobe, faChartLine, faBook, faEnvelope, faSmileWink } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
}
