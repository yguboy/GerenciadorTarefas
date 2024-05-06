using System.ComponentModel.DataAnnotations;

namespace GerenciadorTarefas.Models;

public class Usuario
{
    public Usuario(string nome, int idade)
    {
        Id = Guid.NewGuid().ToString();
        Nome = nome;
        Idade = idade;
    }

    public string Id { get; set; }
    public string? Nome { get; set; }
    public int Idade { get; set; }
}