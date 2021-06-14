import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkVinculacaoAvisoEspecieSetorFormComponent} from './cdk-vinculacao-aviso-especie-setor-form.component';
import {CdkEspecieSetorAutocompleteModule} from '../../especie-setor/cdk-especie-setor-autocomplete/cdk-especie-setor-autocomplete.module';
import {CdkEspecieSetorGridsearchModule} from '../../especie-setor/cdk-especie-setor-autocomplete/cdk-especie-setor-gridsearch/cdk-especie-setor-gridsearch.module';
import {EspecieSetorService} from '../../../services/especie-setor.service';

@NgModule({
    declarations: [
        CdkVinculacaoAvisoEspecieSetorFormComponent
    ],
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTooltipModule,

        CdkEspecieSetorAutocompleteModule,
        CdkEspecieSetorGridsearchModule,

        CdkSharedModule
    ],
    providers: [
        EspecieSetorService,
    ],
    exports: [
        CdkVinculacaoAvisoEspecieSetorFormComponent
    ]
})
export class CdkVinculacaoAvisoEspecieSetorFormModule {
}
