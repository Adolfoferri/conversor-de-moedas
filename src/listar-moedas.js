import React from 'react';

function ListarMoedas() {

    const MOEDAS = [
        {"sigla": "AUD", "descricao": "Dólar australiano" },
        {"sigla": "BNG", "descricao": "Lev búlgaro" },
        {"sigla": "BRL", "descricao": "Real brasileiro" },
        {"sigla": "CAD", "descricao": "Dólar canadense" },
        {"sigla": "CHF", "descricao": "Franco suíço" },
        {"sigla": "CNY", "descricao": "Yuan chinês" },
        {"sigla": "CZK", "descricao": "Coroa República Tcheca" },
        {"sigla": "Dkk", "descricao": "Coroa dinamarquesa" },
        {"sigla": "EUR", "descricao": "Euro" },
        {"sigla": "GBP", "descricao": "Libra Esterlina" },
        {"sigla": "HKD", "descricao": "Dólar de Hong Kong" },
        {"sigla": "HRK", "descricao": "Coroa Croácia" },
        {"sigla": "HUF", "descricao": "Florim húngaro" },
        {"sigla": "IDR", "descricao": "Rupia Indonésia" },
        {"sigla": "ILS", "descricao": "Novo shekel israelense" },
        {"sigla": "INR", "descricao": "Rupia Indiana" },
        {"sigla": "JPY", "descricao": "Iene japonês" },
        {"sigla": "KRW", "descricao": "Won sul-coreano" },
        {"sigla": "MXN", "descricao": "Peso mexicano" },
        {"sigla": "NOK", "descricao": "Coroa Noruega" },
        {"sigla": "NZD", "descricao": "Dólar da Nova Zelândia" },
        {"sigla": "PHP", "descricao": "Peso filipino" },
        {"sigla": "PLN", "descricao": "Ztoty Polónia" },
        {"sigla": "RON", "descricao": "Leo Romeno" },
        {"sigla": "RUB", "descricao": "Belarus Ruble" },
        {"sigla": "SEK", "descricao": "Coroa Suécia" },
        {"sigla": "SGD", "descricao": "Dólar de singapura" },
        {"sigla": "THB", "descricao": "Baht Tailândia" },
        {"sigla": "TRY", "descricao": "Lira turca" },
        {"sigla": "USD", "descricao": "Dólar do Estados Unidos" },
        {"sigla": "ZAR", "descricao": "Rand África do sul" }
        
        ];

            function compare(moeda1, moeda2){
                if(moeda1.descricao < moeda2.descricao){
                    return -1;
                }else  if( moeda1.descricao > moeda2.descricao){
                    return 1;
                }
                return 0;
            }

        return MOEDAS.sort(compare).map( moeda=> 
            <option value={moeda.sigla} key={moeda.sigla}>
                {moeda.descricao}
            </option>

        );

}

export default ListarMoedas;