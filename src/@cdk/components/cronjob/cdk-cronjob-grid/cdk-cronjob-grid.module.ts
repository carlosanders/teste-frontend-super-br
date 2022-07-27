import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkCronjobGridComponent} from './cdk-cronjob-grid.component';
import {CdkCronjobFilterModule} from '../sidebars/cdk-cronjob-filter/cdk-cronjob-filter.module';

@NgModule({
    declarations: [
        CdkCronjobGridComponent,
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,

        CdkCronjobFilterModule,
        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
    ],
    exports: [
        CdkCronjobGridComponent
    ]
})
export class CdkCronjobGridModule {
}
