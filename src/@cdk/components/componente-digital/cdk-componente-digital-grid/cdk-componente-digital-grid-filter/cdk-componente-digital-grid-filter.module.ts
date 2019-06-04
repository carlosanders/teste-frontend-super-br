import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ComponenteDigitalService } from '@cdk/services/componente-digital.service';
import { CdkComponenteDigitalGridFilterComponent } from './cdk-componente-digital-grid-filter.component';

@NgModule({
    declarations: [
        CdkComponenteDigitalGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ComponenteDigitalService,
    ],
    exports: [
        CdkComponenteDigitalGridFilterComponent
    ]
})
export class CdkComponenteDigitalGridFilterModule {
}
