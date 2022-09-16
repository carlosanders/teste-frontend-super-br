import {
    ChangeDetectionStrategy,
    Component,
    Input, OnChanges,
    OnInit, SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '../../animations';

@Component({
    selector: 'path',
    templateUrl: './path.component.html',
    styleUrls: ['./path.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class PathComponent implements OnInit, OnChanges {

    @Input()
    icone: string;

    @Input()
    caminhoAbsoluto: string;

    @Input()
    inicioCaminho: string;

    linkCaminhos: Array<Record<string, string>> = [{}];

    mapaNome = new Map();

    constructor() {
    }

    ngOnInit(): void {
        this.carregarNomes();
        this.carregarCaminho();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['caminhoAbsoluto'] && this.caminhoAbsoluto) {
            this.carregarCaminho();
        }
    }


    carregarCaminho(): void {
        this.linkCaminhos = [{}];
        let caminhoAux = '';
        let caminhoAnterior = '';
        let chave = '';
        let valor = '';
        const posicao = this.caminhoAbsoluto.search(this.inicioCaminho);
        const raiz = this.caminhoAbsoluto.slice(0, posicao-1);
        this.caminhoAbsoluto = this.caminhoAbsoluto.slice(posicao, this.caminhoAbsoluto.length);
        const arrayCaminho = this.caminhoAbsoluto.split('/');
        arrayCaminho.forEach((c: string) => {
            const urlLimpa = this.limparUrl(c);
            if (urlLimpa === 'dados-basicos' || urlLimpa === 'default') { } //Não adiciona no link, para resolver despadronizacoes
            else if (urlLimpa === 'visualizar') {
                caminhoAux += '/' + urlLimpa;
                chave = `${raiz}${caminhoAux}`;
                valor = this.mapaNome.has(urlLimpa) ? this.mapaNome.get(urlLimpa) : urlLimpa;
                caminhoAnterior = urlLimpa;
                this.linkCaminhos.push({link: chave, label: this.limparUrl(valor)});
            }
            else if (urlLimpa === 'arvore') { //Entra se for arvore
                chave = `${raiz}${caminhoAux}/${urlLimpa}`;
                valor = this.mapaNome.has(urlLimpa) ? this.mapaNome.get(urlLimpa) : urlLimpa;
                this.linkCaminhos.push({link: chave, label: this.limparUrl(valor)});
            }
            else if (urlLimpa === 'acoes' || urlLimpa === 'regras') {
                caminhoAux += '/' + urlLimpa;
                chave = `${raiz}${caminhoAux}` + '/listar';
                valor = this.mapaNome.has(urlLimpa) ? this.mapaNome.get(urlLimpa) : urlLimpa;
                caminhoAnterior = urlLimpa;
                this.linkCaminhos.push({link: chave, label: this.limparUrl(valor)});
            }
            else if(!Number(urlLimpa) && urlLimpa !=='editar' && urlLimpa !=='listar' && urlLimpa !=='criar') { //Entra se for para listar
                caminhoAux += '/' + urlLimpa;
                chave = `${raiz}${caminhoAux}/listar`;
                valor = this.mapaNome.has(urlLimpa) ? this.mapaNome.get(urlLimpa) : urlLimpa;
                caminhoAnterior = urlLimpa;
                this.linkCaminhos.push({link: chave, label: this.limparUrl(valor)});
            }
            else if(urlLimpa !== 'editar' && urlLimpa !=='listar') { //Entra se for numero ou criar
                chave = `${raiz}${caminhoAux}/editar/${urlLimpa}`;
                caminhoAux += '/editar/' + urlLimpa;
                valor = this.mapaNome.has(caminhoAnterior) ? this.mapaNome.get(caminhoAnterior) : caminhoAnterior;
                valor = this.pluralParaSigular(valor);
                valor = valor + urlLimpa;
                this.linkCaminhos.push({link: chave, label: this.limparUrl(valor)});
            }
        });
        this.linkCaminhos.shift();
    }

    carregarNomes(): void { //Adicionar nomes compostos, que tenha acento e ç
        this.mapaNome.set('acoes', 'ações');
        this.mapaNome.set('arvore', 'árvore');
        this.mapaNome.set('avisos', 'avisos');
        this.mapaNome.set('classificacoes', 'classificações');
        this.mapaNome.set('especie-atividades', 'espécie atividades');
        this.mapaNome.set('especies-processo', 'espécie processos');
        this.mapaNome.set('especie-relevancias', 'espécie relevâncias');
        this.mapaNome.set('especie-setor', 'espécie setores');
        this.mapaNome.set('especie-tarefas', 'espécie tarefas');
        this.mapaNome.set('lotacoes', 'lotações');
        this.mapaNome.set('modalidade-acao-etiqueta', 'modalidade ações etiquetas');
        this.mapaNome.set('modalidade-orgao-central', 'modalidade orgãos centrais');
        this.mapaNome.set('municipios', 'municípios');
        this.mapaNome.set('notificacoes', 'notificações');
        this.mapaNome.set('tipos-relatorios', 'tipos de relatórios');
        this.mapaNome.set('transicoes', 'transições');
        this.mapaNome.set('seguranca', 'seguranças');
        this.mapaNome.set('usuarios', 'usuários');
        this.mapaNome.set('validacoes', 'validações');
        this.mapaNome.set('vinculacao-pessoa-usuario', 'usuários externos');
    }

    pluralParaSigular(palavra): string {
        let palavraSingular = '';
        const arrayPalavras = palavra.split(' ');
        arrayPalavras.forEach((valor) => {
            const tamanho = valor.length;
            if(valor.substr(tamanho-3, tamanho)==='res' || valor.substr(tamanho-3, tamanho)==='res') {
                palavraSingular += valor.substr(0, tamanho-2) + ' ';
            }
            else if(valor.substr(tamanho-3, tamanho)==='ões' || valor.substr(tamanho-3, tamanho)==='ãos') {
                palavraSingular += valor.substr(0, tamanho-3) + 'ão' + ' ';
            }
            else if(valor.substr(tamanho-3, tamanho)==='ais') {
                palavraSingular += valor.substr(0, tamanho-2) + 'l' + ' ';
            }
            else if(valor.substr(tamanho-1, tamanho)==='s') {
                palavraSingular += valor.substr(0, tamanho-1) + ' ';
            }
            else {
                palavraSingular += valor + ' ';
            }
        });
        return palavraSingular;
    }

    /**
     * Remove o fragmet e query parameters da url
     * @param url
     * @private
     */
    private limparUrl(url: string): string
    {
        return url.split('#')[0].split('?')[0];
    }
}
