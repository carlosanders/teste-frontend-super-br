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
import {CampoService} from '@cdk/services/campo.service';
import {CdkCampoGridComponent} from './cdk-campo-grid.component';
import {CdkCampoAutocompleteModule} from '@cdk/components/campo/cdk-campo-autocomplete/cdk-campo-autocomplete.module';
import {CdkCampoFilterModule} from '../sidebars/cdk-campo-filter/cdk-campo-filter.module';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        CdkCampoGridComponent,
    ],
    imports: [
        CommonModule,

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTooltipModule,
        MatSelectModule,

        CdkCampoAutocompleteModule,
        CdkCampoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        CampoService,
    ],
    exports: [
        CdkCampoGridComponent
    ]
})
export class CdkCampoGridModule {
}
