import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcumbsComponent} from './breadcumbs.component';
import {RouterModule} from '@angular/router';
import {MatIconModule, MatButtonModule} from '@cdk/angular/material';

@NgModule({
    declarations: [BreadcumbsComponent],
    exports: [
        BreadcumbsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class BreadcrumbsModule {
}
