import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';

@Component({
    selector: 'processo-acesso-negado',
    templateUrl: './processo-acesso-negado.component.html',
    styleUrls: ['./processo-acesso-negado.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProcessoAcessoNegadoComponent {

}
