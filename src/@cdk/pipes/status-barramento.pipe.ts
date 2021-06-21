import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'statusBarramento'})
export class StatusBarramentoPipe implements  PipeTransform {
    transform(status: number): string {
        switch (status) {
            case 1:
                return 'Aguardando envio de processos/documentos digitais';
            case 2:
                return 'Processos/documentos digitais recebidos pelo barramento';
            case 3:
                return 'Metadados recebidos pelo destinatário';
            case 4:
                return 'Processos/documentos digitais recebidos pelo destinatário';
            case 5:
                return 'Recibo de conclusão do trâmite recebido pelo barramento';
            case 6:
                return 'Recibo de conclusão do trâmite recebido pelo remetente';
            case 7:
                return 'Cancelado';
            case 8:
                return 'Aguardando Ciência';
            case 9:
                return 'Recusado pelo destinatário';
            default:
                return 'Documento Barramento status não atualizado.';

        }
    }
}
