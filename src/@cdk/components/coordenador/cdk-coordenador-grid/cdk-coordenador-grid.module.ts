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
import {CoordenadorService} from '@cdk/services/coordenador.service';
import {CdkCoordenadorGridComponent} from './cdk-coordenador-grid.component';
import {CdkCoordenadorFilterModule} from '../sidebars/cdk-coordenador-filter/cdk-coordenador-filter.module';

@NgModule({
    declarations: [
        CdkCoordenadorGridComponent,
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

        CdkCoordenadorFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        CoordenadorService,
    ],
    exports: [
        CdkCoordenadorGridComponent
    ]
})
export class CdkCoordenadorGridModule {
}
