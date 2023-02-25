import java.util.Scanner;

public class ControleEstoque {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.println("Controle de Estoque");
        
        // solicita o saldo inicial da peça
        System.out.print("Digite o saldo inicial da peça: ");
        int saldo = sc.nextInt();
        System.out.println("Saldo inicial: " + saldo);
        
        // executa operações enquanto o usuário quiser continuar
        int operacao = 0;
        while (operacao != 3) {
            System.out.println("\nSelecione a operação:");
            System.out.println("1 - Compra (entrada) de peças");
            System.out.println("2 - Venda (saída) de peças");
            System.out.println("3 - Encerrar o programa");
            System.out.print("Operação selecionada: ");
            operacao = sc.nextInt();
            
            if (operacao == 1) { // compra
                System.out.print("Digite a quantidade de peças compradas: ");
                int quantidade = sc.nextInt();
                saldo += quantidade;
                System.out.println("Saldo atualizado: " + saldo);
            } else if (operacao == 2) { // venda
                System.out.print("Digite a quantidade de peças vendidas: ");
                int quantidade = sc.nextInt();
                if (quantidade <= saldo) {
                    saldo -= quantidade;
                    System.out.println("Saldo atualizado: " + saldo);
                } else {
                    System.out.println("Saldo insuficiente para a venda!");
                }
            } else if (operacao == 3) { // encerrar
                System.out.println("Encerrando o programa...");
            } else { // operação inválida
                System.out.println("Operação inválida!");
            }
        }
        
        sc.close();
    }
}
