import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';

import {ProcessoTimelineComponent} from './processo-timeline.component';
import {RouterModule, Routes} from '@angular/router';
import {
    MatButtonModule,
    MatProgressSpinnerModule,
} from '@cdk/angular/material';
import {ProcessoTimelineStoreModule} from './store/store.module';
import {modulesConfig} from 'modules/modules-config';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@cdk/angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import * as fromGuards from './store/guards'
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {DateGroupModule} from './date-group/date-group.module';
import {EventDialogModule} from './event-dialog/event-dialog.module';
import ProcessoTimelineBridge from './services/processo-timeline.bridge';

const routes: Routes = [
    {
        path: '',
        component: ProcessoTimelineComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-timeline';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ProcessoTimelineComponent,
    ],
    imports: [
        RouterModule.forChild(routes),

        HttpClientModule,

        MatButtonModule,
        MatProgressBarModule,
        CdkSharedModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatTooltipModule,
        ProcessoTimelineStoreModule,
        MatIconModule,
        MatBadgeModule,
        DateGroupModule,
        EventDialogModule
    ],
    exports: [
    ],
    providers: [
        fromGuards.ResolveGuard,
        ProcessoTimelineBridge
    ]
})
export class ProcessoTimelineModule {
}
