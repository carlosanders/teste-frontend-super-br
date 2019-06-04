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
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeTemplateService } from '@cdk/services/modalidade-template.service';
import { CdkModalidadeTemplateGridComponent} from './cdk-modalidade-template-grid.component';
import { CdkModalidadeTemplateGridFilterComponent } from './cdk-modalidade-template-grid-filter/cdk-modalidade-template-grid-filter.component';
import { CdkModalidadeTemplateAutocompleteModule } from '@cdk/components/modalidade-template/cdk-modalidade-template-autocomplete/cdk-modalidade-template-autocomplete.module';

@NgModule({
    declarations: [
        CdkModalidadeTemplateGridComponent,
        CdkModalidadeTemplateGridFilterComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkModalidadeTemplateAutocompleteModule,

        FuseSharedModule,
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
