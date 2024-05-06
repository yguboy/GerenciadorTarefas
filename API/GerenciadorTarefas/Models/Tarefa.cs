using System.ComponentModel.DataAnnotations;

namespace GerenciadorTarefas.Models;

public class Tarefa
{
    public Tarefa(string nome, string descricao, double prazo, string categoria)
    {
        Id = Guid.NewGuid().ToString();
        Nome = nome;
        Descricao = descricao;
        Prazo = prazo;
        Categoria = categoria
    }

    public string Id { get; set; }
    public string? Nome { get; set; }
    public string? Descricao { get; set; }
    public double Prazo { get; set; }
    public string? Categoria { get; set; }
}