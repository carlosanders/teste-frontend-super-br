import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {
    MatButtonModule,
} from '@cdk/angular/material';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@cdk/angular/material';
import {MatIconModule} from '@angular/material/icon';
import {DateGroupComponent} from './date-group.component';
import {EventListModule} from '../event-list/event-list.module';

@NgModule({
    declarations: [
        DateGroupComponent
    ],
    imports: [
        HttpClientModule,
        MatButtonModule,
        MatProgressBarModule,
        CdkSharedModule,
        MatIconModule,
        EventListModule,
    ],
    exports: [
        DateGroupComponent
    ],
    providers: []
})
export class DateGroupModule {
}
