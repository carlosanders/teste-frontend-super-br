import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CookieService} from 'ngx-cookie-service';

import {CdkShortcutsComponent} from './shortcuts.component';

@NgModule({
    declarations: [
        CdkShortcutsComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        FlexLayoutModule,

        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        MatTooltipModule
    ],
    exports     : [
        CdkShortcutsComponent
    ],
    providers   : [
        CookieService
    ]
})
export class CdkShortcutsModule
{
}
