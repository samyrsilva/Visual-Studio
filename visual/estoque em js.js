console.log("Controle de Estoque");

// solicita o saldo inicial da peça
let saldo = parseInt(prompt("Digite o saldo inicial da peça: "));
console.log("Saldo inicial: " + saldo);

// executa operações enquanto o usuário quiser continuar
let operacao = 0;
while (operacao != 3) {
    console.log("\nSelecione a operação:");
    console.log("1 - Compra (entrada) de peças");
    console.log("2 - Venda (saída) de peças");
    console.log("3 - Encerrar o programa");
    operacao = parseInt(prompt("Operação selecionada: "));
    
    if (operacao == 1) { // compra
        let quantidade = parseInt(prompt("Digite a quantidade de peças compradas: "));
        saldo += quantidade;
        console.log("Saldo atualizado: " + saldo);
    } else if (operacao == 2) { // venda
        let quantidade = parseInt(prompt("Digite a quantidade de peças vendidas: "));
        if (quantidade <= saldo) {
            saldo -= quantidade;
            console.log("Saldo atualizado: " + saldo);
        } else {
            console.log("Saldo insuficiente para a venda!");
        }
    } else if (operacao == 3) { // encerrar
        console.log("Encerrando o programa...");
    } else { // operação inválida
        console.log("Operação inválida!");
    }
}
