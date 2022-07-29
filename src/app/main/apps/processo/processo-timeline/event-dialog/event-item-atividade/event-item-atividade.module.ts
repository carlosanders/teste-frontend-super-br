import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {
    MatButtonModule,
} from '@cdk/angular/material';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@cdk/angular/material';
import {MatIconModule} from '@angular/material/icon';
import {EventItemAtividadeComponent} from './event-item-atividade.component';
import {EVENT_ITEM_DIALOG_DATA} from '../dialog-event-item';

@NgModule({
    declarations: [
        EventItemAtividadeComponent
    ],
    imports: [
        HttpClientModule,
        MatButtonModule,
        MatProgressBarModule,
        CdkSharedModule,
        MatIconModule,
    ],
    exports: [
        EventItemAtividadeComponent
    ],
    providers: [{provide: EVENT_ITEM_DIALOG_DATA, useValue: null}]
})
export class EventItemAtividadeModule {
}
