import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { SetorService } from '@cdk/services/setor.service';
import { CdkSetorGridFilterComponent } from './cdk-setor-grid-filter.component';

@NgModule({
    declarations: [
        CdkSetorGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        SetorService,
    ],
    exports: [
        CdkSetorGridFilterComponent
    ]
})
export class CdkSetorGridFilterModule {
}
