import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {AssuntoAdministrativoService} from '@cdk/services/assunto-administrativo.service';
import {CdkAssuntoFormComponent} from './cdk-assunto-form.component';
import {CdkAssuntoAdministrativoAutocompleteModule} from '@cdk/components/assunto-administrativo/cdk-assunto-administrativo-autocomplete/cdk-assunto-administrativo-autocomplete.module';
import {CdkAssuntoAdministrativoGridsearchModule} from '@cdk/components/assunto-administrativo/cdk-assunto-administrativo-autocomplete/cdk-assunto-administrativo-gridsearch/cdk-assunto-administrativo-gridsearch.module';
import {CdkAssuntoAdministrativoGridTreeModule} from '../../assunto-administrativo/cdk-assunto-administrativo-grid-tree/cdk-assunto-administrativo-grid-tree.module';
import {CdkAssuntoAdministrativoGridTreeService} from '../../assunto-administrativo/cdk-assunto-administrativo-grid-tree/services/cdk-assunto-administrativo-grid-tree.service';

@NgModule({
    declarations: [
        CdkAssuntoFormComponent,
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

        CdkAssuntoAdministrativoAutocompleteModule,
        CdkAssuntoAdministrativoGridsearchModule,

        CdkSharedModule,
        CdkAssuntoAdministrativoGridTreeModule,
    ],
    providers: [
        AssuntoAdministrativoService,
        CdkAssuntoAdministrativoGridTreeService
    ],
    exports: [
        CdkAssuntoFormComponent
    ]
})
export class CdkAssuntoFormModule {
}
