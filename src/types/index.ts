

export interface Transaction {
    id: string;
    valor: number;
    destinatario: string;
    data: string;
}

export interface InvestmentSuggestion {
    nome: string;
    tipo: string;
    risco: 'Baixo' | 'Moderado' | 'Alto';
    descricao: string;
}

export interface PixAnalysisResult {
    riscoDetectado: boolean;
    mensagem?: string;
    sugestao?: InvestmentSuggestion;
}