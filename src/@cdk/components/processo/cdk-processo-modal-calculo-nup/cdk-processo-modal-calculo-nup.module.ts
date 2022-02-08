import { CdkProcessoModalCalculoNupComponent } from './cdk-processo-modal-calculo-nup.component';
import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatInputModule} from '@cdk/angular/material';

@NgModule({
    declarations: [
        CdkProcessoModalCalculoNupComponent
    ],
    imports: [

        MatDialogModule,
        MatButtonModule,

        MatAutocompleteModule,
        MatInputModule,

        CdkSharedModule,
    ],
    entryComponents: [
        CdkProcessoModalCalculoNupComponent
    ],
    exports: [
        CdkProcessoModalCalculoNupComponent
    ]
})
export class CdkProcessoModalCalculoNupComponentModule {
}
