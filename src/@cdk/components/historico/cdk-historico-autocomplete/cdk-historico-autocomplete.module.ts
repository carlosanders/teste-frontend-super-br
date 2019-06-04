import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {HistoricoService} from '@cdk/services/historico.service';
import {CdkHistoricoAutocompleteComponent} from './cdk-historico-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkHistoricoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        HistoricoService,
    ],
    exports: [
        CdkHistoricoAutocompleteComponent
    ]
})
export class CdkHistoricoAutocompleteModule {
}
