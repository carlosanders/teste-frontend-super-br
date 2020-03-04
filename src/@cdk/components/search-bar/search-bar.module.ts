import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@cdk/angular/material';
import { MatIconModule } from '@cdk/angular/material';

import { CdkSearchBarComponent } from './search-bar.component';

@NgModule({
    declarations: [
        CdkSearchBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        CdkSearchBarComponent
    ]
})
export class CdkSearchBarModule
{
}
