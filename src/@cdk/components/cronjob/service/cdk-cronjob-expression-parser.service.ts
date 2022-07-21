import {Injectable} from '@angular/core';
import cronstrue from 'cronstrue/i18n'
import {Options} from 'cronstrue/dist/options';

@Injectable()
export class CdkCronjobExpressionParserService {

    private _customExpressionsAlias: CdkCronJobCustomExpression[] = [
        {
            alias: '@yearly',
            expression: '0 0 1 1 *'
        },
        {
            alias: '@annually',
            expression: '0 0 1 1 *'
        },
        {
            alias: '@monthly',
            expression: '0 0 1 * *'
        },
        {
            alias: '@weekly',
            expression: '0 0 * * 0'
        },
        {
            alias: '@daily',
            expression: '0 0 * * *'
        },
        {
            alias: '@midnight',
            expression: '0 0 * * *'
        },
        {
            alias: '@hourly',
            expression: '0 * * * *'
        },
        {
            alias: '@firstBunsinessDayOfMonth',
            expression: '@firstBunsinessDayOfMonth',
            customTranslation: 'Às 12:00 AM do primeiro dia útil do mês'
        },
        {
            alias: '@secondBunsinessDaysOfMonth',
            expression: '@secondBunsinessDaysOfMonth',
            customTranslation: 'Às 12:00 AM do segundo dia útil do mês'
        },
        {
            alias: '@thirdBunsinessDaysOfMonth',
            expression: '@thirdBunsinessDaysOfMonth',
            customTranslation: 'Às 12:00 AM do terceiro dia útil do mês'
        },
    ];

    private readonly _construeOptions: Options = {
        locale: 'pt_BR'
    };

    registerAlias(alias: string, expression?: string): void;
    registerAlias(alias: CdkCronJobCustomExpression): void;
    registerAlias(alias: string|CdkCronJobCustomExpression, expression?: string): void {
        if (typeof alias === 'string') {
            this.unregisterAlias(alias);
            this._customExpressionsAlias.push({
                alias: alias,
                expression: expression
            });
            return;
        }

        if (alias instanceof CdkCronJobCustomExpression) {
            this.unregisterAlias(alias.alias);
            this._customExpressionsAlias.push(alias);
            return;
        }

        throw new Error('Argumento inválido');
    }

    unregisterAlias(alias: string): void;
    unregisterAlias(alias: CdkCronJobCustomExpression): void;
    unregisterAlias(alias: string|CdkCronJobCustomExpression): void {
        if (typeof alias === 'string') {
            this._customExpressionsAlias = this._customExpressionsAlias
                .filter((expression) => expression.alias === alias);
            return;
        }
        if (alias instanceof CdkCronJobCustomExpression) {
            this._customExpressionsAlias = this._customExpressionsAlias
                .filter((expression) => expression.alias === alias.alias);
            return;
        }

        throw new Error('Argumento inválido');
    }

    parseExpressionToAlias(expression: string): string {
        return this._customExpressionsAlias
            .find((obj) => obj.expression === expression)?.alias || expression;
    }

    parseAliasToExpression(alias: string): string {
        return this._customExpressionsAlias
            .find((obj) => obj.alias === alias)?.expression || alias;
    }

    listCustomExpressions(): CdkCronJobCustomExpression[] {
        return this._customExpressionsAlias;
    }

    parseExpressionToLiteralString(expression: string): string {
        if (expression.indexOf('@') === 0) {
            const customExpression = this._customExpressionsAlias
                .find((obj) => obj.alias === expression);

            if (!customExpression) {
                throw new Error('Expressão não suportada ou inválida');
            }

            return customExpression.customTranslation ?? cronstrue
                .toString(customExpression.expression, this._construeOptions);
        }

        return cronstrue.toString(expression, this._construeOptions);
    }

    public static getInstance(): CdkCronjobExpressionParserService {
        return new CdkCronjobExpressionParserService();
    }

}


export class CdkCronJobCustomExpression {
    alias: string;
    expression: string;
    customTranslation?: string;

    constructor() {
        this.alias = null;
        this.expression = null;
        this.customTranslation = null;
    }
}
