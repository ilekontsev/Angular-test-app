import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

const MODULES = [MatTabsModule, MatButtonModule];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class MaterialModule {}
