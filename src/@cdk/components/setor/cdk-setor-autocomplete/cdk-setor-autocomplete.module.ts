import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { SetorService } from '@cdk/services/setor.service';
import {CdkSetorAutocompleteComponent} from './cdk-setor-autocomplete.component';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkSetorAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        SetorService,
    ],
    exports: [
        CdkSetorAutocompleteComponent
    ]
})
export class CdkSetorAutocompleteModule {
}
