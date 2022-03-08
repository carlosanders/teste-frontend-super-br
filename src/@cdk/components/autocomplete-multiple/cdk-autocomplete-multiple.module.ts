import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkAutocompleteMultipleComponent} from './cdk-autocomplete-multiple.component';

@NgModule({
    declarations: [
        CdkAutocompleteMultipleComponent
    ],
    imports: [
        CdkSharedModule,
    ],
    exports: [
        CdkAutocompleteMultipleComponent
    ]
})

export class CdkAutocompleteMultipleModule {

}
