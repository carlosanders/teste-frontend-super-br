import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalAvisoRestricaoNupComponent} from './modal-aviso-restricao-nup.component';
import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatInputModule} from '@cdk/angular/material';

@NgModule({
    declarations: [
        ModalAvisoRestricaoNupComponent
    ],
    imports: [

        MatDialogModule,
        MatButtonModule,

        MatAutocompleteModule,
        MatInputModule,

        CdkSharedModule,
    ],
    entryComponents: [
        ModalAvisoRestricaoNupComponent
    ],
    exports: [
        ModalAvisoRestricaoNupComponent
    ]
})
export class ModalAvisoRestricaoNupModule {
}
