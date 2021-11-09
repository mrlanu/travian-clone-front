import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faSeedling, faHome, faGlobe, faChartLine, faBook, faEnvelope, faSmileWink, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

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
  faSignOutAlt = faSignOutAlt;

  faStyle = {
    'color': 'darkgreen'
  };

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.authService.logout();
  }
}
