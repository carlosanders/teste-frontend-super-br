import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {GeneroRelatorioService} from '@cdk/services/genero-relatorio.service';
import {CdkGeneroRelatorioAutocompleteComponent} from './cdk-genero-relatorio-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkGeneroRelatorioAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        GeneroRelatorioService,
    ],
    exports: [
        CdkGeneroRelatorioAutocompleteComponent
    ]
})
export class CdkGeneroRelatorioAutocompleteModule {
}
