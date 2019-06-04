import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {JuntadaService} from '@cdk/services/juntada.service';
import {CdkJuntadaGridFilterComponent} from './cdk-juntada-grid-filter.component';

@NgModule({
    declarations: [
        CdkJuntadaGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        JuntadaService,
    ],
    exports: [
        CdkJuntadaGridFilterComponent
    ]
})
export class CdkJuntadaGridFilterModule {
}
