import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { StoreHelperService } from '../services/store-helper.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  public isDisableNavigationPanel =
    this._storeHelperService.isDisableNavigationPanel;

  constructor(private _storeHelperService: StoreHelperService) {}

  ngOnInit(): void {}
}
