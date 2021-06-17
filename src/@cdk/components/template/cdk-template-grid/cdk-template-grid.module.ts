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
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {TemplateService} from '@cdk/services/template.service';
import {CdkTemplateGridComponent} from './cdk-template-grid.component';
import {CdkTemplateAutocompleteModule} from '@cdk/components/template/cdk-template-autocomplete/cdk-template-autocomplete.module';
import {CdkTemplateFilterModule} from '../sidebars/cdk-template-filter/cdk-template-filter.module';

@NgModule({
    declarations: [
        CdkTemplateGridComponent,
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
        CdkTemplateFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
