import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ProcessoService} from '@cdk/services/processo.service';
import {CdkProcessoAutocompleteComponent} from './cdk-processo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkProcessoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ProcessoService,
    ],
    exports: [
        CdkProcessoAutocompleteComponent
    ]
})
export class CdkProcessoAutocompleteModule {
}
