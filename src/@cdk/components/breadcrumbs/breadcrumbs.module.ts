import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcumbsComponent} from './breadcumbs.component';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [BreadcumbsComponent],
    exports: [
        BreadcumbsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule
    ]
})
export class BreadcrumbsModule {
}
