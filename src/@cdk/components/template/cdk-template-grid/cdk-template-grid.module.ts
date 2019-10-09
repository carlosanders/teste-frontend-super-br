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

import {FuseSharedModule} from '@fuse/shared.module';
import {TemplateService} from '@cdk/services/template.service';
import {CdkTemplateGridComponent} from './cdk-template-grid.component';
import {CdkTemplateAutocompleteModule} from '@cdk/components/template/cdk-template-autocomplete/cdk-template-autocomplete.module';
import {CdkTemplateGridFilterModule} from './cdk-template-grid-filter/cdk-template-grid-filter.module';

@NgModule({
    declarations: [
        CdkTemplateGridComponent
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
