import {NgModule} from '@angular/core';
import {AjudaComponent} from './ajuda.component';
import {FuseSharedModule} from '../@fuse/shared.module';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTooltipModule} from '@cdk/angular/material';

@NgModule({
    declarations: [
        AjudaComponent
    ],
    imports: [
        FuseSharedModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
    ],
    exports: [
        AjudaComponent
    ],
    providers: []
})
export class AjudaModule {
}
