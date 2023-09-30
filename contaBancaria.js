class contaBancaria {
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

class contaCorrente extends contaBancaria {
    constructor(agencia, numero, saldo, cartaoCredito) {
        super(agencia, numero,'Corrente', saldo); // Chama o construtor da classe mãe usando 'super'
        this._cartaoCredito = cartaoCredito;
    }

    get cartaoCredito() {
        return this._cartaoCredito;
    }
        
    set cartaoCredito(llimite) {
        if (limite > 0) {
            this._cartaoCredito = limite;
        } else {
            console.log('Limite de crédito inválido');
        }
    }
}

class contaPoupanca extends contaBancaria {
    constructor(agencia, numero, tipo, saldo) {
        super(agencia, numero, tipo, saldo);
    }
}

class contaUniversitaria extends contaBancaria {
    constructor(agencia, numero, tipo, saldo) {
        super(agencia, numero, tipo, saldo);
    }

    sacar(valor) {
        if (valor > 0 && valor < 500 && valor <= this._saldo) {
            this._saldo -= valor;
            console.log(`Saque de R$${valor} realizado com sucesso. Novo Saldo: R$${this._saldo}`);
        } else {
            console.log('Valor de saue inválido ou saldo insuficiente');
        }
    }
}







