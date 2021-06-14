import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeAfastamentoService} from '@cdk/services/modalidade-afastamento.service';
import {CdkAfastamentoFormComponent} from './cdk-afastamento-form.component';
import {CdkModalidadeAfastamentoAutocompleteModule} from '@cdk/components/modalidade-afastamento/cdk-modalidade-afastamento-autocomplete/cdk-modalidade-afastamento-autocomplete.module';
import {CdkModalidadeAfastamentoGridsearchModule} from '@cdk/components/modalidade-afastamento/cdk-modalidade-afastamento-autocomplete/cdk-modalidade-afastamento-gridsearch/cdk-modalidade-afastamento-gridsearch.module';
import {ColaboradorService} from '@cdk/services/colaborador.service';

@NgModule({
    declarations: [
        CdkAfastamentoFormComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,

        CdkModalidadeAfastamentoAutocompleteModule,
        CdkModalidadeAfastamentoGridsearchModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeAfastamentoService,
        ColaboradorService,
    ],
    exports: [
        CdkAfastamentoFormComponent
    ]
})
export class CdkAfastamentoFormModule {
}
