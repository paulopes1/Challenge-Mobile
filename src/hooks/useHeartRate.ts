

import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

/**
 * Documentação do Hook (Versão Simulada):
 *
 * `useHeartRate`
 *
 * Objetivo: Simular o monitoramento de batimentos cardíacos em tempo real
 * para fins de desenvolvimento e teste, sem depender de hardware ou bibliotecas nativas.
 * Gera valores de batimentos aleatórios e simula picos de estresse para testar os alertas.
 *
 * @returns {{ heartRate: number; error: string | null; isMonitoring: boolean; }} -
 * Um objeto com a frequência cardíaca simulada, possíveis erros e o status do monitoramento.
 */


const LIMITE_BPM_ALERTA = 120;

export const useHeartRate = () => {
    const [heartRate, setHeartRate] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [isMonitoring, setIsMonitoring] = useState<boolean>(false);

    useEffect(() => {
        
        const initTimeout = setTimeout(() => {
            setIsMonitoring(true);
            console.log('[Mock Health] Monitoramento simulado iniciado.');
        }, 1500); 

        
        const intervalId = setInterval(() => {
            
            const shouldSpike = Math.random() < 0.2;

            let newHeartRate: number;

            if (shouldSpike) {
                
                newHeartRate = Math.floor(Math.random() * (135 - 121 + 1)) + 121;
                console.log(`[Mock Health] Pico de estresse simulado: ${newHeartRate} BPM`);

                
                Alert.alert(
                    'Acalme-se, Investidor!',
                    'Percebemos que seus batimentos estão elevados. Decisões tomadas sob estresse podem ser arriscadas. Que tal fazer uma pausa de 5 minutos?'
                );
            } else {
                
                newHeartRate = Math.floor(Math.random() * (85 - 65 + 1)) + 65;
            }

            setHeartRate(newHeartRate);

        }, 3000); 

        
        return () => {
            clearTimeout(initTimeout);
            clearInterval(intervalId);
        };
    }, []); 

    return { heartRate, error, isMonitoring };
};