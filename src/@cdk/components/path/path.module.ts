import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PathComponent} from './path.component';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [PathComponent],
    exports: [
        PathComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule
    ]
})
export class PathModule {
}
