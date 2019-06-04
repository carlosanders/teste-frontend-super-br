import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { EspecieSetorService } from '@cdk/services/especie-setor.service';
import {CdkEspecieSetorAutocompleteComponent} from './cdk-especie-setor-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkEspecieSetorAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        EspecieSetorService,
    ],
    exports: [
        CdkEspecieSetorAutocompleteComponent
    ]
})
export class CdkEspecieSetorAutocompleteModule {
}
