import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ProcessoService } from '@cdk/services/processo.service';
import {CdkProcessoAutocompleteComponent} from './cdk-processo-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkProcessoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
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
