import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkProcessoSearchAutocompleteComponent} from './cdk-processo-search-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {ProcessoService} from '../../../services/processo.service';

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
