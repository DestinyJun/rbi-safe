import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-st-plain',
  template: `
    <div class="st-plain">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .st-plain {
      width: 100%;
      height: 100%;
      padding: 1vh 2vw;
      border-radius: 15px;
      box-shadow: 0 0 20px #C4C4C4;
      background: #ffffff;
    }
  `]
})
export class StPlainComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
