import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkEtiquetaGridFilterComponent } from './cdk-etiqueta-grid-filter.component';

@NgModule({
    declarations: [
        CdkEtiquetaGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [

    ],
    exports: [
        CdkEtiquetaGridFilterComponent
    ]
})
export class CdkEtiquetaGridFilterModule {
}
