import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CampoService } from '@cdk/services/campo.service';
import { CdkCampoGridFilterComponent } from './cdk-campo-grid-filter.component';

@NgModule({
    declarations: [
        CdkCampoGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        CampoService,
    ],
    exports: [
        CdkCampoGridFilterComponent
    ]
})
export class CdkCampoGridFilterModule {
}
