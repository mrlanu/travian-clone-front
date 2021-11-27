import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-army',
  templateUrl: './home-army.component.html',
  styleUrls: ['./home-army.component.css']
})
export class HomeArmyComponent implements OnInit {

  @Input() homeArmy: Map<string, number> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
