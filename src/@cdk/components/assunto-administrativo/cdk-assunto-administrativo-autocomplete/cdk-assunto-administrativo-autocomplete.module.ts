import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { AssuntoAdministrativoService } from '@cdk/services/assunto-administrativo.service';
import {CdkAssuntoAdministrativoAutocompleteComponent} from './cdk-assunto-administrativo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkAssuntoAdministrativoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        AssuntoAdministrativoService,
    ],
    exports: [
        CdkAssuntoAdministrativoAutocompleteComponent
    ]
})
export class CdkAssuntoAdministrativoAutocompleteModule {
}
