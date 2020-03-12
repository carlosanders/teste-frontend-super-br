import {Component, OnInit} from '@angular/core';
import {RouterStateUrl} from '../../../../store/reducers';

@Component({
    selector: 'app-criar-data-prevista-transicao',
    templateUrl: './criar-data-prevista-transicao.component.html',
    styleUrls: ['./criar-data-prevista-transicao.component.scss']
})
export class CriarDataPrevistaTransicaoComponent implements OnInit {



    processoId: number;

    private routerState: RouterStateUrl;

    constructor() {
    }

    ngOnInit(): void {
    }

}
