

import { Transaction, PixAnalysisResult } from '../types';

/**
 * Documentação da Função:
 *
 * `analisarTransacoesPix`
 *
 * Objetivo: Analisar uma lista de transações para identificar padrões de gastos
 * com apostas e, caso um risco seja detectado, sugerir um investimento alternativo.
 *
 * @param {Transaction[]} transacoes - Um array de objetos de transação.
 * @returns {PixAnalysisResult} - Um objeto contendo o resultado da análise.
 */


const BLACKLIST_CHAVES_PIX: string[] = [
    'pix@casadeaposta1.com',
    'financeiro@superbet.com.br',
    'pagamentos@jogosonline.com',
    'suporte@betfacil.com',
];


const LIMITE_TRANSACOES_RISCO = 3;

export const analisarTransacoesPix = (transacoes: Transaction[]): PixAnalysisResult => {
    console.log('Iniciando análise de transações...');

    
    const gastosComApostas = transacoes.filter(t => BLACKLIST_CHAVES_PIX.includes(t.destinatario));

    
    if (gastosComApostas.length >= LIMITE_TRANSACOES_RISCO) {
        
        const totalGasto = gastosComApostas.reduce((acc, t) => acc + t.valor, 0);

        console.log(`Risco detectado: ${gastosComApostas.length} transações, totalizando R$ ${totalGasto.toFixed(2)}`);

        
        return {
            riscoDetectado: true,
            mensagem: `Detectamos que você gastou R$ ${totalGasto.toFixed(2)} em apostas recentemente. Que tal fazer seu dinheiro render de forma segura?`,
            sugestao: {
                nome: 'XP CDB Curto Prazo',
                tipo: 'Renda Fixa',
                risco: 'Baixo',
                descricao: 'Este investimento oferece segurança e liquidez diária, ideal para seus objetivos de curto prazo.'
            }
        };
    }

    console.log('Nenhum risco detectado.');
    
    return { riscoDetectado: false };
};