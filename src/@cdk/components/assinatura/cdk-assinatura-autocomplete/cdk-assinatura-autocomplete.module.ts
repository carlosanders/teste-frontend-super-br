import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {CdkAssinaturaAutocompleteComponent} from './cdk-assinatura-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkAssinaturaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        AssinaturaService,
    ],
    exports: [
        CdkAssinaturaAutocompleteComponent
    ]
})
export class CdkAssinaturaAutocompleteModule {
}
