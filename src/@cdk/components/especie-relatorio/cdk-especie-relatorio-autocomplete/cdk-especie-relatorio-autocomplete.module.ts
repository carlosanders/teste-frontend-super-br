import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkEspecieRelatorioAutocompleteComponent} from './cdk-especie-relatorio-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {EspecieRelatorioService} from '../../../services/especie-relatorio.service';

@NgModule({
    declarations: [
        CdkEspecieRelatorioAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        EspecieRelatorioService
    ],
    exports: [
        CdkEspecieRelatorioAutocompleteComponent
    ]
})
export class CdkEspecieRelatorioAutocompleteModule {
}
