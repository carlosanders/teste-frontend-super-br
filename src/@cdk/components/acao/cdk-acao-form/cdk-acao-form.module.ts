import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import {CdkAcaoFormComponent} from './cdk-acao-form.component';
import {SetorService} from '@cdk/services/setor.service';
import {CdkModeloAutocompleteModule} from '../../modelo/cdk-modelo-autocomplete/cdk-modelo-autocomplete.module';
import {CdkModeloGridsearchModule} from '../../modelo/cdk-modelo-autocomplete/cdk-modelo-gridsearch/cdk-modelo-gridsearch.module';

@NgModule({
    declarations: [
        CdkAcaoFormComponent,
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

        CdkModeloAutocompleteModule,
        CdkModeloGridsearchModule,

        CdkSharedModule,
    ],
    providers: [
        UsuarioService,
        SetorService
    ],
    exports: [
        CdkAcaoFormComponent
    ]
})
export class CdkAcaoFormModule {
}
