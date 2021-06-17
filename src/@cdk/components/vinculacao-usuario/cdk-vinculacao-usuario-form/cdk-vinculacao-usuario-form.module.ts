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
    MatSlideToggleModule,
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkUsuarioAutocompleteModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkUsuarioGridsearchModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import {CdkVinculacaoUsuarioFormComponent} from './cdk-vinculacao-usuario-form.component';
import {CdkLogentryGridsearchModule} from '../../logentry/cdk-logentry-grid/cdk-logentry-gridsearch/cdk-logentry-gridsearch.module';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    declarations: [
        CdkVinculacaoUsuarioFormComponent,
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
        MatSlideToggleModule,
        MatTooltipModule,

        CdkUsuarioAutocompleteModule,
        CdkUsuarioGridsearchModule,

        CdkSharedModule,
        CdkLogentryGridsearchModule,
        MatCardModule,
    ],
    providers: [
        UsuarioService
    ],
    exports: [
        CdkVinculacaoUsuarioFormComponent
    ]
})
export class CdkVinculacaoUsuarioFormModule {
}
