import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkAssinaturaGridFilterComponent } from './cdk-assinatura-grid-filter.component';

@NgModule({
    declarations: [
        CdkAssinaturaGridFilterComponent,
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
        CdkAssinaturaGridFilterComponent
    ]
})
export class CdkAssinaturaGridFilterModule {
}
