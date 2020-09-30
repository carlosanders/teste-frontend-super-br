import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { ProcessoService } from '@cdk/services/processo.service';
import {CdkProcessoSearchAutocompleteComponent} from './cdk-processo-search-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkProcessoSearchAutocompleteComponent,
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
        CdkProcessoSearchAutocompleteComponent
    ]
})
export class CdkProcessoSearchAutocompleteModule {
}
