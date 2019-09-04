import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, MatProgressBarModule, MatTooltipModule,
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkComponenteDigitalGridComponent} from './cdk-componente-digital-grid.component';
import { CdkComponenteDigitalGridFilterModule} from './cdk-componente-digital-grid-filter/cdk-componente-digital-grid-filter.module';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    declarations: [
        CdkComponenteDigitalGridComponent
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

        CdkComponenteDigitalGridFilterModule,

        FuseSharedModule,
        MatTooltipModule,
        PipesModule,
    ],
    providers: [
    ],
    exports: [
        CdkComponenteDigitalGridComponent
    ]
})
export class CdkComponenteDigitalGridModule {
}
