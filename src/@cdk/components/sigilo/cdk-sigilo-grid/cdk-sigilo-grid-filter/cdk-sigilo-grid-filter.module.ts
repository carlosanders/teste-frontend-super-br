import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {SigiloService} from '@cdk/services/sigilo.service';
import {CdkSigiloGridFilterComponent} from './cdk-sigilo-grid-filter.component';

@NgModule({
    declarations: [
        CdkSigiloGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        SigiloService,
    ],
    exports: [
        CdkSigiloGridFilterComponent
    ]
})
export class CdkSigiloGridFilterModule {
}
