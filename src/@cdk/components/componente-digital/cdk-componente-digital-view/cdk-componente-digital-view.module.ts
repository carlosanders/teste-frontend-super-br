import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, MatProgressBarModule,
} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkComponenteDigitalViewComponent} from './cdk-componente-digital-view.component';
import {CdkDocumentoFormModule} from '../../documento/cdk-documento-form/cdk-documento-form.module';

@NgModule({
    declarations: [
        CdkComponenteDigitalViewComponent
    ],
    imports: [
        
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkDocumentoFormModule,

        FuseSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkComponenteDigitalViewComponent
    ]
})
export class CdkComponenteDigitalViewModule {
}
