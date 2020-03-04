import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule, MatRadioModule

} from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { UsuarioService } from '@cdk/services/usuario.service';
import { CdkVisibilidadeFormComponent } from './cdk-visibilidade-form.component';
import { CdkUsuarioAutocompleteModule } from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import { CdkUsuarioGridsearchModule } from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {SetorService} from '@cdk/services/setor.service';

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

        CdkUsuarioAutocompleteModule,
        CdkUsuarioGridsearchModule,

        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,

        CdkSharedModule,
    ],
    providers: [
        UsuarioService,
        SetorService
    ],
    exports: [
        CdkVisibilidadeFormComponent
    ]
})
export class CdkVisibilidadeFormModule {
}
