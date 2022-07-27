import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {
    MatButtonModule,
    MatProgressSpinnerModule,
} from '@cdk/angular/material';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@cdk/angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {EventDialogComponent} from './event-dialog.component';
import {TarefaDetailsModule} from '../tarefa-details/tarefa-details.module';
import {EventItemDefaultModule} from './event-item-default/event-item-default.module';
import {PortalModule} from '@angular/cdk/portal';
import {EventItemAtividadeModule} from './event-item-atividade/event-item-atividade.module';

@NgModule({
    declarations: [
        EventDialogComponent
    ],
    imports: [

        HttpClientModule,

        MatButtonModule,
        MatProgressBarModule,
        CdkSharedModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatTooltipModule,
        MatIconModule,
        TarefaDetailsModule,
        EventItemDefaultModule,
        EventItemAtividadeModule,
        PortalModule
    ],
    providers: []
})
export class EventDialogModule {
}
