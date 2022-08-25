import { NgModule, AfterViewInit, Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from "@angular/material/paginator";





const MATERIALS = [MatButtonModule, MatInputModule, MatPaginatorModule]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MATERIALS
  ],
  exports: [MATERIALS],
})
export class MaterialModule { }

