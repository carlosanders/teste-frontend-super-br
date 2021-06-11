import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CargoService} from '@cdk/services/cargo.service';
import {CdkCargoAutocompleteComponent} from './cdk-cargo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkCargoAutocompleteComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        PipesModule,
        CdkSharedModule,
    ],
    providers: [
        CargoService,
    ],
    exports: [
        CdkCargoAutocompleteComponent
    ]
})
export class CdkCargoAutocompleteModule {
}
