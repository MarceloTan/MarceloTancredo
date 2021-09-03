const ordem = 3;
const matriz = Array(ordem);
for (let i=0; i<matriz.length; i++) {
    matriz[i] = Array(ordem);
}
const somaNumeros = 15;

document.addEventListener('DOMContentLoaded', () => {
    insereTabela();
});

function insereTabela() {
    const tabela = document.createElement('table');
    tabela.id = 'quadradomagico';
    document.body.append(tabela);
    for (let i=0; i<ordem; i++) {
        const linha = document.createElement('tr');
        tabela.append(linha);
        for (let j=0; j<ordem; j++) {
            const celula = document.createElement('td');
            linha.append(celula);
            celula.id = `lin${i}col${j}`;
            insereInput(celula);
        }
    }
}

function getLinhaColuna(celula) {
    const [linha,coluna] = celula.id.split('col');
    return [linha.split('lin')[1], coluna];
}

function insereInput(celula) {
    const input = document.createElement('input');
    celula.append(input);
    input.addEventListener('change', () => {
        const valor = parseInt(input.value);
        const [linha,coluna] = getLinhaColuna(celula);
        matriz[linha][coluna] = valor;
        const quadradoCompleto = verificaMatriz();
        if (quadradoCompleto) {
            document.querySelector('#quadradomagico').classList.add('vitoria');
        } else {
            document.querySelector('#quadradomagico').classList.remove('vitoria');
        }
    });
}

function verificaMatriz() {
    const numerosRepetidos = verificaNumerosRepetidos();
    const numerosForaDosLimites = verificaNumerosForaDosLimites();
    const somasOK = verificaSomas();
    return !numerosRepetidos && !numerosForaDosLimites && somasOK;
}

function verificaSomas() {
    const diagonalPrincipalOK = verificaSomaDiagonalPrincipal();
    const diagonalSecundariaOK = verificaSomaDiagonalSecundaria();
    const linhasOK = verificaSomaLinhas();
    const colunasOK = verificaSomaColunas()
    return diagonalPrincipalOK && diagonalSecundariaOK && linhasOK && colunasOK;
}

function verificaSomaColunas() {
    let colunasOK = true;
    for (let j=0; j<ordem; j++) {
        colunasOK &= verificaSomaColuna(j);
    }
    return colunasOK;
}

function verificaSomaColuna(j) {
    let soma = 0
    for (let i=0; i<ordem; i++) {
        if (matriz[i][j] == null) return false;
        soma += matriz [i][j];
    }
    if (soma != somaNumeros) {
        for (let i=0; i<ordem; i++) {
            atribuiClasseCelula('somaerradacoluna', i, j);
        }
        return false;
    } else {
        for (let i=0; i<ordem; i++) {
            removeClasseCelula('somaerradacoluna', i, j);
        }
    }
    return true;
}

function verificaSomaLinhas() {
    let linhasOK = true;
    for (let i=0; i<ordem; i++) {
        linhasOK &= verificaSomaLinha(i);
    }
    return linhasOK;
}

function verificaSomaLinha(i) {
    let soma = 0
    for (let j=0; j<ordem; j++) {
        if (matriz[i][j] == null) return false;
        soma += matriz [i][j];
    }
    if (soma != somaNumeros) {
        for (let j=0; j<ordem; j++) {
            atribuiClasseCelula('somaerradalinha', i, j);
        }
        return false;
    } else {
        for (let j=0; j<ordem; j++) {
            removeClasseCelula('somaerradalinha', i, j);
        }
    }
    return true;
}

function verificaSomaDiagonalSecundaria() {
    let soma = 0
    for (let i=0; i<ordem; i++) {
        if (matriz[i][ordem-i-1] == null) return false;
        soma += matriz [i][ordem-i-1];
    }
    if (soma != somaNumeros) {
        for (let i=0; i<ordem; i++) {
            atribuiClasseCelula('somaerradadiagonalsecundaria', i, ordem-i-1);
        }
        return false;
    } else {
        for (let i=0; i<ordem; i++) {
            removeClasseCelula('somaerradadiagonalsecundaria', i, ordem-i-1);
        }
    }
    return true;
}


function verificaSomaDiagonalPrincipal() {
    let soma = 0
    for (let i=0; i<ordem; i++) {
        if (matriz[i][i] == null) return false;
        soma += matriz [i][i];
    }
    if (soma != somaNumeros) {
        for (let i=0; i<ordem; i++) {
            atribuiClasseCelula('somaerradadiagonalprincipal', i, i);
        }
        return false;
    } else {
        for (let i=0; i<ordem; i++) {
            removeClasseCelula('somaerradadiagonalprincipal', i, i);
        }
    }
    return true;
}

function verificaNumerosForaDosLimites() {
    const minimo = 1;
    const maximo = ordem**2;
    let numerosForaDosLimites = false;
    for (i=0; i<ordem; i++) {
        for (j=0; j<ordem; j++) {
            const celula = document.querySelector(`#lin${i}col${j}`);
            if (matriz[i][j] < minimo || matriz[i][j] > maximo) {
                numerosForaDosLimites = true;
                atribuiClasseCelula('foradoslimites', i , j);
            } else {
                removeClasseCelula('foradoslimites', i , j);
            }
        }
    }
    return numerosForaDosLimites;
}

function verificaNumerosRepetidos() {
    const numeros = Array(ordem**2).fill(0);
    let numerosRepetidos = false;
    for (let i=0; i<ordem; i++){
        for (let j=0; j<ordem; j++) {
            const valor = matriz[i][j];
            if (!isNaN(valor)) {
                numeros[valor-1]++;
            }
        }
    }
    for (let i=0; i<ordem; i++) {
        for (let j=0; j<ordem; j++) {
            const valor = matriz[i][j];
            if (!isNaN(valor) && numeros[valor-1] > 1) {
                numerosRepetidos = true;
                atribuiClasseCelula('numerosrepetidos', i, j);
            } else {
                removeClasseCelula('numerosrepetidos', i, j);
            }
        }
    }
    return numerosRepetidos;
}

function atribuiClasseCelula(classe, i, j) {
    const celula = document.querySelector(`#lin${i}col${j}`);
    celula.classList.add(classe);
}

function removeClasseCelula(classe, i, j) {
    const celula = document.querySelector(`#lin${i}col${j}`);
    celula.classList.remove(classe);
}