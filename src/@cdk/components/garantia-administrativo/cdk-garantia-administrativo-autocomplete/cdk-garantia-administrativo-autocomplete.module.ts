import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { GarantiaAdministrativoService } from '@cdk/services/garantia-administrativo.service';
import {CdkGarantiaAdministrativoAutocompleteComponent} from './cdk-garantia-administrativo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkGarantiaAdministrativoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        GarantiaAdministrativoService,
    ],
    exports: [
        CdkGarantiaAdministrativoAutocompleteComponent
    ]
})
export class CdkGarantiaAdministrativoAutocompleteModule {
}
