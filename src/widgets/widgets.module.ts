import {NgModule} from '@angular/core';
import {WidgetsComponent} from './widgets.component';

import {CdkSharedModule} from '../@cdk/shared.module';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule
} from '@cdk/angular/material';

@NgModule({
    declarations: [
        WidgetsComponent
    ],
    imports: [
        CdkSharedModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
    ],
    exports: [
        WidgetsComponent
    ],
    providers: []
})
export class WidgetsModule {
}
