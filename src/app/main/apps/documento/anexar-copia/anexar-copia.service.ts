import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ComponenteDigital} from '@cdk/models';

export interface ComponenteDigitalSelecionado {
    id: number;
    hash: string;
    fileName: string;
    tamanho: number;
    mimetype: string;
    extensao: string;
}

@Injectable({
    providedIn: 'root'
})
export class AnexarCopiaService {
    private _guardaAtivado: Subject<boolean> = new Subject();
    private _componentesDigitaisSelecionados: ComponenteDigitalSelecionado[] = [];
    private _idsSelecionados: number[] = [];

    get guardaAtivado(): Subject<boolean> {
        return this._guardaAtivado;
    }

    set guardaAtivado(value: Subject<boolean>) {
        this._guardaAtivado = value;
    }

    get componentesDigitaisSelecionados(): ComponenteDigitalSelecionado[] {
        return this._componentesDigitaisSelecionados;
    }

    resetComponentesDigitaisSelecionados(): void {
        this._componentesDigitaisSelecionados = [];
    }

    toggleSelectComponenteDigital(componenteDigital: ComponenteDigital): void {
        const index = this._idsSelecionados.indexOf(componenteDigital.id);
        if (index === -1) {
            // Componente digital informado não está selecionado
            this._idsSelecionados.push(componenteDigital.id);
            const componenteDigitalSelecionado: ComponenteDigitalSelecionado = {
                id: componenteDigital.id,
                hash: componenteDigital.hash,
                fileName: componenteDigital.fileName,
                tamanho: componenteDigital.tamanho,
                mimetype: componenteDigital.mimetype,
                extensao: componenteDigital.extensao
            };
            this._componentesDigitaisSelecionados.push(componenteDigitalSelecionado);
        } else {
            this._idsSelecionados.splice(index, 1);
            this._componentesDigitaisSelecionados.splice(index, 1);
        }
    }

    isSelected(componenteDigitalId: number): boolean {
        return this._componentesDigitaisSelecionados.findIndex(cd => cd.id === componenteDigitalId) !== -1;
    }
}
