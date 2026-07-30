import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

abstract class Conta {
    private final int numero;
    private double saldo;

    public Conta(int numero, double saldoInicial) {
        this.numero = numero;
        if (saldoInicial < 0) {
            throw new IllegalArgumentException("Saldo inicial não pode ser negativo.");
        }
        this.saldo = saldoInicial;
    }

    public int getNumero() {
        return numero;
    }

    public double getSaldo() {
        return saldo;
    }

    protected void setSaldo(double saldo) {
        this.saldo = saldo;
    }

    public abstract void realizarSaque(double valor);

    public abstract void realizarDeposito(double valor);
}

class ContaCorrente extends Conta {

    public ContaCorrente(int numero, double saldoInicial) {
        super(numero, saldoInicial);
    }

    @Override
    public void realizarSaque(double valor) {
        if (valor <= 0) {
            System.out.println("Erro: o valor do saque deve ser maior que zero.");
            return;
        }

        if (valor > getSaldo()) {
            throw new SaldoInsuficienteException("Saldo insuficiente para sacar R$ " + valor);
        }

        setSaldo(getSaldo() - valor);
        System.out.println("Saque realizado com sucesso.");
    }

    @Override
    public void realizarDeposito(double valor) {
        if (valor <= 0) {
            System.out.println("Erro: o valor do depósito deve ser maior que zero.");
            return;
        }

        setSaldo(getSaldo() + valor);
        System.out.println("Depósito realizado com sucesso.");
    }
}

class SaldoInsuficienteException extends RuntimeException {
    public SaldoInsuficienteException(String mensagem) {
        super(mensagem);
    }
}

public class Banco {
    private static final List<ContaCorrente> contas = new ArrayList<>();
    private static int proximoNumeroConta = 1;

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int opcao;

        do {
            System.out.println("\n--- SISTEMA BANCÁRIO ---");
            System.out.println("1. Criar nova conta corrente");
            System.out.println("2. Listar contas");
            System.out.println("3. Depositar");
            System.out.println("4. Sacar");
            System.out.println("5. Sair");
            System.out.print("Escolha uma opção: ");

            while (!scanner.hasNextInt()) {
                System.out.println("Erro: digite um número válido.");
                scanner.next();
                System.out.print("Escolha uma opção: ");
            }

            opcao = scanner.nextInt();

            switch (opcao) {
                case 1 -> criarConta(scanner);
                case 2 -> listarContas();
                case 3 -> depositar(scanner);
                case 4 -> sacar(scanner);
                case 5 -> System.out.println("Saindo do sistema. Até logo!");
                default -> System.out.println("Opção inválida!");
            }
        } while (opcao != 5);

        scanner.close();
    }

    private static void criarConta(Scanner scanner) {
        System.out.print("Digite o saldo inicial: R$ ");
        while (!scanner.hasNextDouble()) {
            System.out.println("Erro: digite um valor válido.");
            scanner.next();
            System.out.print("Digite o saldo inicial: R$ ");
        }

        double saldoInicial = scanner.nextDouble();

        if (saldoInicial < 0) {
            System.out.println("Erro: saldo inicial não pode ser negativo.");
            return;
        }

        ContaCorrente conta = new ContaCorrente(proximoNumeroConta++, saldoInicial);
        contas.add(conta);
        System.out.println("Conta criada com sucesso. Número: " + conta.getNumero());
    }

    private static void listarContas() {
        if (contas.isEmpty()) {
            System.out.println("Nenhuma conta cadastrada.");
            return;
        }

        for (ContaCorrente conta : contas) {
            System.out.println("Conta #" + conta.getNumero() + " - Saldo: R$ " + conta.getSaldo());
        }
    }

    private static void depositar(Scanner scanner) {
        ContaCorrente conta = selecionarConta(scanner);
        if (conta == null) return;

        System.out.print("Digite o valor do depósito: R$ ");
        while (!scanner.hasNextDouble()) {
            System.out.println("Erro: digite um valor válido.");
            scanner.next();
            System.out.print("Digite o valor do depósito: R$ ");
        }

        double valor = scanner.nextDouble();
        conta.realizarDeposito(valor);
    }

    private static void sacar(Scanner scanner) {
        ContaCorrente conta = selecionarConta(scanner);
        if (conta == null) return;

        System.out.print("Digite o valor do saque: R$ ");
        while (!scanner.hasNextDouble()) {
            System.out.println("Erro: digite um valor válido.");
            scanner.next();
            System.out.print("Digite o valor do saque: R$ ");
        }

        double valor = scanner.nextDouble();

        try {
            conta.realizarSaque(valor);
        } catch (SaldoInsuficienteException e) {
            System.out.println("Erro: " + e.getMessage());
        }
    }

    private static ContaCorrente selecionarConta(Scanner scanner) {
        if (contas.isEmpty()) {
            System.out.println("Não há contas cadastradas.");
            return null;
        }

        listarContas();
        System.out.print("Digite o número da conta: ");

        while (!scanner.hasNextInt()) {
            System.out.println("Erro: digite um número válido.");
            scanner.next();
            System.out.print("Digite o número da conta: ");
        }

        int numero = scanner.nextInt();

        for (ContaCorrente conta : contas) {
            if (conta.getNumero() == numero) {
                return conta;
            }
        }

        System.out.println("Conta não encontrada.");
        return null;
    }
}