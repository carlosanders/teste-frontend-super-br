import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {
    MatButtonModule,
} from '@cdk/angular/material';
import {HttpClientModule} from '@angular/common/http';
import {MatProgressBarModule} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {TarefaDetailsComponent} from './tarefa-details.component';

@NgModule({
    declarations: [
        TarefaDetailsComponent
    ],
    imports: [
        HttpClientModule,

        MatButtonModule,
        MatProgressBarModule,
        CdkSharedModule,
        MatTooltipModule,
        MatIconModule,
    ],
    exports: [
        TarefaDetailsComponent
    ],
    providers: []
})
export class TarefaDetailsModule {
}
