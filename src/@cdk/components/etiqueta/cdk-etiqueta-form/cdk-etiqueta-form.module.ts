import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule

} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkEtiquetaFormComponent } from './cdk-etiqueta-form.component';

@NgModule({
    declarations: [
        CdkEtiquetaFormComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,

        FuseSharedModule,
    ],
    providers: [

    ],
    exports: [
        CdkEtiquetaFormComponent
    ]
})
export class CdkEtiquetaFormModule {
}
