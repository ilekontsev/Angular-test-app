import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

const MODULES = [
  MatTabsModule,
  MatButtonModule,
  MatIconModule,
  ScrollingModule,
  MatProgressSpinnerModule,
  DragDropModule,
  MatDialogModule,
  MatMenuModule,
  MatSelectModule,
  MatInputModule,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
})
export class MaterialModule {}
