import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import {CdkVisibilidadeFormComponent} from './cdk-visibilidade-form.component';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkUsuarioGridsearchModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {SetorService} from '@cdk/services/setor.service';
import {CdkSetorTreeModule} from '../../setor/cdk-setor-tree/cdk-setor-tree.module';
import {CdkSetorTreeService} from '../../setor/cdk-setor-tree/services/cdk-setor-tree.service';

@NgModule({
    declarations: [
        CdkVisibilidadeFormComponent,
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
        MatRadioModule,
        MatTooltipModule,

        CdkUsuarioAutocompleteModule,
        CdkUsuarioGridsearchModule,
        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,

        CdkSharedModule,
        CdkSetorTreeModule,
    ],
    providers: [
        UsuarioService,
        SetorService,
        CdkSetorTreeService
    ],
    exports: [
        CdkVisibilidadeFormComponent
    ]
})
export class CdkVisibilidadeFormModule {
}
