import { NgModule } from '@angular/core';

import { CdkSharedModule } from '@cdk/shared.module';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule
} from '@cdk/angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { DirectivesModule } from '@cdk/directives/directives';
import { NotificationComponent } from './notification.component';

@NgModule({
    declarations: [
        NotificationComponent
    ],
    imports: [
        CdkSharedModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatGridListModule,
        DirectivesModule
    ],
    exports: [
        NotificationComponent
    ],
    providers: []
})
export class NotificationModule {
}
