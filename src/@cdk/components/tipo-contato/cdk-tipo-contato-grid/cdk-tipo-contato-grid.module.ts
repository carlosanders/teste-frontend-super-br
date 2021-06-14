import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {TipoContatoService} from '@cdk/services/tipo-contato.service';
import {CdkTipoContatoGridComponent} from './cdk-tipo-contato-grid.component';
import {CdkTipoContatoFilterModule} from '../sidebars/cdk-tipo-contato-filter/cdk-tipo-contato-filter.module';

@NgModule({
    declarations: [
        CdkTipoContatoGridComponent,
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

        CdkTipoContatoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        TipoContatoService,
    ],
    exports: [
        CdkTipoContatoGridComponent
    ]
})
export class CdkTipoContatoGridModule {
}
