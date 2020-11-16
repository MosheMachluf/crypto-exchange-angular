import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-strip',
  template: `
    <div class="row strip center">
      <div class="col-12">
        <h1 class="display-4 text-center text-uppercase text-white">
          Welcome to exchange <i class="fas fa-exchange-alt"></i> app
        </h1>
      </div>
    </div>
  `,
  styles: [
    `
      .strip {
        background: #11998e;
        background: linear-gradient(
            120deg,
            hsla(var(--color-1), 0.9),
            hsla(var(--color-2), 0.9)
          ),
          url('../assets/images/cover-1.jpg') no-repeat center center / cover;
        min-height: 35vh;
      }
    `,
  ],
})
export class StripComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
