import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {TemplateService} from '@cdk/services/template.service';
import {CdkTemplateFilterComponent} from './cdk-template-filter.component';
import {CdkModalidadeTemplateAutocompleteModule} from '@cdk/components/modalidade-template/cdk-modalidade-template-autocomplete/cdk-modalidade-template-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkDocumentoAutocompleteModule} from '@cdk/components/documento/cdk-documento-autocomplete/cdk-documento-autocomplete.module';
import {CdkTipoDocumentoAutocompleteModule} from '../../../tipo-documento/cdk-tipo-documento-autocomplete/cdk-tipo-documento-autocomplete.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';

@NgModule({
    declarations: [
        CdkTemplateFilterComponent,
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

        CdkSharedModule,

        CdkUsuarioAutocompleteModule,
        CdkModalidadeTemplateAutocompleteModule,
        CdkDocumentoAutocompleteModule,
        CdkTipoDocumentoAutocompleteModule,
        MatButtonToggleModule,
        MatMenuModule,
        CdkDateFilterModule,
    ],
    providers: [
        TemplateService,
    ],
    exports: [
        CdkTemplateFilterComponent
    ]
})
export class CdkTemplateFilterModule {
}
