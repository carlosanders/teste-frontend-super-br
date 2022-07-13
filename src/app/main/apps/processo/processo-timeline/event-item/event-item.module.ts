import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {
    MatButtonModule,
} from '@cdk/angular/material';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {EventItemComponent} from './event-item.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
    declarations: [
        EventItemComponent
    ],
    imports: [
        HttpClientModule,

        MatButtonModule,
        MatProgressBarModule,
        CdkSharedModule,
        MatTooltipModule,
        MatIconModule,
        MatBadgeModule,
    ],
    exports: [
        EventItemComponent
    ],
    providers: []
})
export class EventItemModule {
}
