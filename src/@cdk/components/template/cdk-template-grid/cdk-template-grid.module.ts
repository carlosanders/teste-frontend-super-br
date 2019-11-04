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
    MatSelectModule,
} from '@angular/material';

import {FuseSidebarModule} from '@fuse/components';
import {FuseSharedModule} from '@fuse/shared.module';
import {TemplateService} from '@cdk/services/template.service';
import {CdkTemplateGridComponent} from './cdk-template-grid.component';
import {CdkTemplateAutocompleteModule} from '@cdk/components/template/cdk-template-autocomplete/cdk-template-autocomplete.module';
import {CdkTemplateGridFilterModule} from './cdk-template-grid-filter/cdk-template-grid-filter.module';
import {CdkTemplateMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkTemplateGridComponent,
        CdkTemplateMainSidebarComponent,
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

        CdkTemplateAutocompleteModule,
        CdkTemplateGridFilterModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        TemplateService,
    ],
    exports: [
        CdkTemplateGridComponent
    ]
})
export class CdkTemplateGridModule {
}
