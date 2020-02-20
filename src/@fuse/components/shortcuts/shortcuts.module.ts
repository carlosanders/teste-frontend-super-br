import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@cdk/angular/material';
import { MatDividerModule } from '@cdk/angular/material';
import { MatFormFieldModule } from '@cdk/angular/material';
import { MatIconModule } from '@cdk/angular/material';
import { MatInputModule } from '@cdk/angular/material';
import { MatListModule } from '@cdk/angular/material';
import { MatMenuModule } from '@cdk/angular/material';
import { MatTooltipModule } from '@cdk/angular/material';
import { CookieService } from 'ngx-cookie-service';

import { FuseShortcutsComponent } from './shortcuts.component';

@NgModule({
    declarations: [
        FuseShortcutsComponent
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
        FuseShortcutsComponent
    ],
    providers   : [
        CookieService
    ]
})
export class FuseShortcutsModule
{
}
