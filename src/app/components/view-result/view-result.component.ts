import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-result',
  template: `
    <div class="center d-lg-none mb-3">
      <i class="fas fa-arrow-down text-muted fa-3x"></i>
    </div>
    <div class="border border-success py-5 center" style="min-height: 240px;">
      <div class="text-center">
        <h3 class="h1 text-muted">Result</h3>
        <p *ngIf="result" class="display-4 text-success">
          <img *ngIf="cryptoSrc" [src]="cryptoSrc" />
          {{ result.toFixed(4) }}
        </p>
      </div>
    </div>
  `,
  styles: [],
})
export class ViewResultComponent implements OnInit {
  @Input() result: number = 0;
  @Input() cryptoSrc: string = null;

  constructor() {}

  ngOnInit(): void {}
}
