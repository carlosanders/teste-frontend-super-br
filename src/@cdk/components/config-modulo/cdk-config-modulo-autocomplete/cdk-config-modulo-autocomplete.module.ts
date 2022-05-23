import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkConfigModuloAutocompleteComponent} from './cdk-config-modulo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {ConfigModuloService} from '../../../services/config-modulo.service';

@NgModule({
    declarations: [
        CdkConfigModuloAutocompleteComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        PipesModule,
        CdkSharedModule,
    ],
    providers: [
        ConfigModuloService,
    ],
    exports: [
        CdkConfigModuloAutocompleteComponent
    ]
})
export class CdkConfigModuloAutocompleteModule {
}
