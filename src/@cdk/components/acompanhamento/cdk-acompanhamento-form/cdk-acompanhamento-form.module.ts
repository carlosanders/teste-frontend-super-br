import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {UsuarioService} from '@cdk/services/usuario.service';
import {CdkAcompanhamentoFormComponent} from './cdk-acompanhamento-form.component';
import {CdkProcessoAutocompleteModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';

@NgModule({
    declarations: [
        CdkAcompanhamentoFormComponent,
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

        CdkSharedModule,

        CdkProcessoAutocompleteModule,
        CdkProcessoGridsearchModule,
    ],
    providers: [
        UsuarioService,
    ],
    exports: [
        CdkAcompanhamentoFormComponent
    ]
})
export class CdkAcompanhamentoFormModule {
}
