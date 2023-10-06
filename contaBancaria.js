// ... Seu código anterior ...

class ContaBancaria {
    constructor(agencia, numero, tipo, saldo) {
        this.agencia = agencia;
        this.numero = numero;
        this.tipo = tipo;
        this._saldo = saldo;
    }

    get saldo() {
        return this._saldo;
    }

    set saldo(novoSaldo) {
        if (novoSaldo >= 0) {
            this._saldo = novoSaldo;
        } else {
            console.log("O saldo não pode ser negativo.");
        }
    }

    sacar(valor) {
        if (valor > 0 && valor <= this._saldo) {
            this._saldo -= valor;
            console.log(`Saque de R$${valor} realizado com sucesso. Novo Saldo R$${this._saldo}`);
        } else {
            console.log("Valor de saque inválido ou saldo insuficiente.");
        }
    }

    depositar(valor) {
        if (valor > 0) {
            this._saldo += valor;
            console.log(`Depósito de R$${valor} realizado com sucesso.`);
        } else {
            console.log('Valor de depósito inválido.');
        }
    }
}

class ContaCorrente extends ContaBancaria {
    constructor(agencia, numero, saldo, cartaoCredito) {
        super(agencia, numero, 'Conta Corrente', saldo);
        this._cartaoCredito = cartaoCredito;
    }

    get cartaoCredito() {
        return this._cartaoCredito;
    }

    set cartaoCredito(limite) {
        if (limite > 0) {
            this._cartaoCredito = limite;
        } else {
            console.log('Limite de crédito inválido');
        }
    }
}

class ContaPoupanca extends ContaBancaria {
    constructor(agencia, numero, saldo) {
        super(agencia, numero, 'Conta Poupança', saldo);
    }
}

class ContaUniversitaria extends ContaBancaria {
    constructor(agencia, numero, saldo) {
        super(agencia, numero, 'Conta Universitária', saldo);
    }

    sacar(valor) {
        if (valor > 0 && valor <= 500 && valor <= this._saldo) {
            this._saldo -= valor;
            console.log(`Saque de R$${valor} realizado com sucesso. Novo Saldo: R$${this._saldo}`);
        } else {
            console.log('Valor de saque inválido ou saldo insuficiente');
        }
    }
}

const form = document.querySelector('form');
const contasContainer = document.querySelector('.contas');
const visualizarContas = document.getElementById('visualizarContas');
const contas = []; // lista para armazenar contas existentes

function exibirContas() {
    contasContainer.innerHTML = '';
    let saldoTotal = 0;

    for (const conta of contas) {
        saldoTotal += conta.saldo;
        contasContainer.innerHTML += `
            <p>Agência: ${conta.agencia} Número: ${conta.numero} Tipo: ${conta.tipo} Saldo: ${conta.saldo}</p>
            <button class="botaoDeletar" onclick="deletarConta('${conta.numero}')">Deletar</button>
        `;
    }

    contasContainer.innerHTML += `<p>Saldo Total: R$${saldoTotal.toFixed(2)}</p>`;
}

function adicionarConta(evento) {
    evento.preventDefault();
    const agencia = form.querySelector('.agencia').value;
    const numero = form.querySelector('.numero').value;
    const tipo = form.querySelector('.tipo').value;
    const saldo = parseFloat(form.querySelector('.saldo').value);

    let novaConta;

    if (tipo === 'Conta Corrente') {
        const cartaoCredito = parseFloat(form.querySelector('.cartaoCredito').value);
        novaConta = new ContaCorrente(agencia, numero, saldo, cartaoCredito);
    } else if (tipo === 'Conta Poupança') {
        novaConta = new ContaPoupanca(agencia, numero, saldo);
    } else if (tipo === 'Conta Universitária') {
        novaConta = new ContaUniversitaria(agencia, numero, saldo);
    } else {
        console.log('Tipo de conta inválido.');
        return;
    }

    contas.push(novaConta);
    form.reset();
    exibirContas();
}

function deletarConta(numeroConta) {
    const indice = contas.findIndex(conta => conta.numero === numeroConta);
    if (indice !== -1) {
        contas.splice(indice, 1);
        exibirContas();
    }
}

form.addEventListener('submit', adicionarConta);
visualizarContas.addEventListener('click', exibirContas);
