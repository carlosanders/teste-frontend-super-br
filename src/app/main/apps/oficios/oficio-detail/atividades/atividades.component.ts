import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

@Component({
    selector: 'oficio-atividades',
    templateUrl: './documento-avulso-atividade.component.html',
    styleUrls: ['./documento-avulso-atividade.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class Atividades {

}
