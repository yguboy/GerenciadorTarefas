using System;
using System.ComponentModel.DataAnnotations;

namespace GerenciadorTarefas.Models
{
    public class Tarefa
    {
        public Tarefa(string nome, string descricao, double prazo, string categoria, string usuarioId)
        {
            Id = Guid.NewGuid().ToString();
            Nome = nome;
            Descricao = descricao;
            Prazo = prazo;
            Categoria = categoria;
            UsuarioId = usuarioId; // Inicializa a propriedade UsuarioId
        }

        public string Id { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        public string Nome { get; set; }

        public string Descricao { get; set; }

        [Required(ErrorMessage = "O campo Prazo é obrigatório.")]
        public double Prazo { get; set; }

        [Required(ErrorMessage = "O campo Categoria é obrigatório.")]
        public string Categoria { get; set; }

        // armazena o ID do usuário
        public string UsuarioId { get; set; }
    }
}
