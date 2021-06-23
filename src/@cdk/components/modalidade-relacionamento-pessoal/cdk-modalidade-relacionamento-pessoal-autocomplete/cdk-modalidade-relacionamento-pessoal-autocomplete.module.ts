import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeRelacionamentoPessoalService} from '@cdk/services/modalidade-relacionamento-pessoal.service';
import {CdkModalidadeRelacionamentoPessoalAutocompleteComponent} from './cdk-modalidade-relacionamento-pessoal-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeRelacionamentoPessoalAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeRelacionamentoPessoalService,
    ],
    exports: [
        CdkModalidadeRelacionamentoPessoalAutocompleteComponent
    ]
})
export class CdkModalidadeRelacionamentoPessoalAutocompleteModule {
}
