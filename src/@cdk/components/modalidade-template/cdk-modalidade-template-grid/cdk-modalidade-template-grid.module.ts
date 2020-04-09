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
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeTemplateService} from '@cdk/services/modalidade-template.service';
import {CdkModalidadeTemplateGridComponent} from './cdk-modalidade-template-grid.component';
import {CdkModalidadeTemplateAutocompleteModule} from '@cdk/components/modalidade-template/cdk-modalidade-template-autocomplete/cdk-modalidade-template-autocomplete.module';
import {CdkModalidadeTemplateFilterModule} from '../sidebars/cdk-modalidade-template-filter/cdk-modalidade-template-filter.module';
import {CdkModalidadeTemplateMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkModalidadeTemplateGridComponent,
        CdkModalidadeTemplateMainSidebarComponent,
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

        CdkModalidadeTemplateAutocompleteModule,
        CdkModalidadeTemplateFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        ModalidadeTemplateService,
    ],
    exports: [
        CdkModalidadeTemplateGridComponent
    ]
})
export class CdkModalidadeTemplateGridModule {
}
