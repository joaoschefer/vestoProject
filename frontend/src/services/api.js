export const API_BASE = "http://localhost:8000/api/";
export const TRANSACOES_URL = API_BASE + "transacoes/";
export const INVESTIMENTOS_URL = API_BASE + "investimentos/";

async function http(method, url, body) {
    const opts = {
        method,
        headers: { "Content-Type": "application/json" },
    };
    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(url, opts);
    if (!res.ok) {
        const txt = await res.text();
        throw new Error(`HTTP ${res.status}: ${txt}`);
    }
    return res.json();
}

//transacoes
export const listarTransacoes = () => http("GET", TRANSACOES_URL);
export const criarTransacao = (data) => http("POST", TRANSACOES_URL, data);

//investimentos
export const listarInvestimentos = () => http("GET", INVESTIMENTOS_URL);
export const criarInvestimento = (data) => http("POST", INVESTIMENTOS_URL, data);
