import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';
import {CdkRelacionamentoPessoalAutocompleteComponent} from './cdk-relacionamento-pessoal-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkRelacionamentoPessoalAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        RelacionamentoPessoalService,
    ],
    exports: [
        CdkRelacionamentoPessoalAutocompleteComponent
    ]
})
export class CdkRelacionamentoPessoalAutocompleteModule {
}
