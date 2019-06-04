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
import { CdkCargoFormComponent } from './cdk-cargo-form.component';

@NgModule({
    declarations: [
        CdkCargoFormComponent,
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
        CdkCargoFormComponent
    ]
})
export class CdkCargoFormModule {
}
