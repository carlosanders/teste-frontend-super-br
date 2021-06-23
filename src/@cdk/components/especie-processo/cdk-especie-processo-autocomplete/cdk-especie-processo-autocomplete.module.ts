import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {EspecieProcessoService} from '@cdk/services/especie-processo.service';
import {CdkEspecieProcessoAutocompleteComponent} from './cdk-especie-processo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkEspecieProcessoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        EspecieProcessoService,
    ],
    exports: [
        CdkEspecieProcessoAutocompleteComponent
    ]
})
export class CdkEspecieProcessoAutocompleteModule {
}
