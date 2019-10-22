import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';
import {FuseSharedModule} from '../../../../../@fuse/shared.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {ModeloService} from '../../../../services/modelo.service';
import {CdkModalidadeMeioAutocompleteModule} from '../../../modalidade-meio/cdk-modalidade-meio-autocomplete/cdk-modalidade-meio-autocomplete.module';
import {CdkModeloGridFilterComponent} from './cdk-modelo-grid-filter.component';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkTemplateAutocompleteModule} from '../../../template/cdk-template-autocomplete/cdk-template-autocomplete.module';
import {CdkDocumentoAutocompleteModule} from '../../../documento/cdk-documento-autocomplete/cdk-documento-autocomplete.module';

@NgModule({
    declarations: [
        CdkModeloGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatCheckboxModule,

        FuseSharedModule,

        CdkUsuarioAutocompleteModule,
        CdkModalidadeMeioAutocompleteModule,
        CdkTemplateAutocompleteModule,
        CdkDocumentoAutocompleteModule,
    ],
    providers: [
        ModeloService,
    ],
    exports: [
        CdkModeloGridFilterComponent
    ]
})
export class CdkModeloGridFilterModule {
}
