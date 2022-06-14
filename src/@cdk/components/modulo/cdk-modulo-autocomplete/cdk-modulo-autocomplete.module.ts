import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkModuloAutocompleteComponent} from './cdk-modulo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {ModuloService} from '../../../services/modulo.service';

@NgModule({
    declarations: [
        CdkModuloAutocompleteComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModuloService,
    ],
    exports: [
        CdkModuloAutocompleteComponent
    ]
})
export class CdkModuloAutocompleteModule {
}
