import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
} from '@cdk/angular/material';
import {CdkSidebarModule} from '@cdk/components/index';
import { CdkSharedModule } from '@cdk/shared.module';
import { CdkDocumentoIdentificadorGridComponent} from './cdk-documento-identificador-grid.component';
import { CdkDocumentoIdentificadorFilterModule } from '../sidebars/cdk-documento-identificador-filter/cdk-documento-identificador-filter.module';
import {CdkDocumentoIdentificadorMainSidebarComponent} from './sidebars/main/main.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [
        CdkDocumentoIdentificadorGridComponent,
        CdkDocumentoIdentificadorMainSidebarComponent,
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkDocumentoIdentificadorFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        
    ],
    exports: [
        CdkDocumentoIdentificadorGridComponent
    ]
})
export class CdkDocumentoIdentificadorGridModule {
}
