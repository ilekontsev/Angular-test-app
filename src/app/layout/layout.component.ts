import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  public isDisableNavigationPanel: boolean;

  constructor(private _router: Router, private _ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.isDisableNavigationPanel = event.url === '/login';
        this._ref.detectChanges();
        return;
      }
    });
  }
}
