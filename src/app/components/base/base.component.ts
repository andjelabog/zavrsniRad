import { Component, OnInit } from '@angular/core';
import { GovernmentService } from 'src/app/services/government.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor( ) { }

  ngOnInit(): void {
  }

}
