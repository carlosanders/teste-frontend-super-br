import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {SetorService} from '@cdk/services/setor.service';
import {CdkTipoRelatorioAutocompleteComponent} from './cdk-tipo-relatorio-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkTipoRelatorioAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        SetorService,
    ],
    exports: [
        CdkTipoRelatorioAutocompleteComponent
    ]
})
export class CdkTipoRelatorioAutocompleteModule {
}
