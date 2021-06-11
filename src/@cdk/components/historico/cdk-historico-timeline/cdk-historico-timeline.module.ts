import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {HistoricoService} from '@cdk/services/historico.service';
import {CdkHistoricoTimelineComponent} from './cdk-historico-timeline.component';

@NgModule({
    declarations: [
        CdkHistoricoTimelineComponent
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        CdkSharedModule,
    ],
    providers: [
        HistoricoService,
    ],
    exports: [
        CdkHistoricoTimelineComponent
    ]
})
export class CdkHistoricoTimelineModule {
}
