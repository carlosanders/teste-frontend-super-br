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
import {MatGridListModule} from '@angular/material/grid-list';
import {DirectivesModule} from '../@cdk/directives/directives';

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
        MatGridListModule,
        DirectivesModule
    ],
    exports: [
        WidgetsComponent
    ],
    providers: []
})
export class WidgetsModule {
}
