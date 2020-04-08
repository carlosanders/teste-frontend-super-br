import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkVinculacaoRepositorioEspecieSetorFormComponent} from './cdk-vinculacao-repositorio-especie-setor-form.component';
import {CdkEspecieSetorAutocompleteModule} from '../../especie-setor/cdk-especie-setor-autocomplete/cdk-especie-setor-autocomplete.module';
import {CdkEspecieSetorGridsearchModule} from '../../especie-setor/cdk-especie-setor-autocomplete/cdk-especie-setor-gridsearch/cdk-especie-setor-gridsearch.module';
import {EspecieSetorService} from '../../../services/especie-setor.service';

@NgModule({
    declarations: [
        CdkVinculacaoRepositorioEspecieSetorFormComponent
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
        CdkVinculacaoRepositorioEspecieSetorFormComponent
    ]
})
export class CdkVinculacaoRepositorioEspecieSetorFormModule {
}
