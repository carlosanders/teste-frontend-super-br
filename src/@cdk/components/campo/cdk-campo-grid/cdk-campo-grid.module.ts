import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatSelectModule,
} from '@cdk/angular/material';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {CampoService} from '@cdk/services/campo.service';
import {CdkCampoGridComponent} from './cdk-campo-grid.component';
import {CdkCampoAutocompleteModule} from '@cdk/components/campo/cdk-campo-autocomplete/cdk-campo-autocomplete.module';
import {CdkCampoGridFilterModule} from './cdk-campo-grid-filter/cdk-campo-grid-filter.module';
import {CommonModule} from "@angular/common";
import {CdkCampoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkCampoGridComponent,
        CdkCampoMainSidebarComponent,
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
        CdkCampoGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
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
