using System.ComponentModel.DataAnnotations;

namespace GerenciadorTarefas.Models
{
    public class Tarefa
    {
        public Tarefa(string nome, string descricao, double prazo, string categoria)
        {
            Id = Guid.NewGuid().ToString();
            Nome = nome;
            Descricao = descricao;
            Prazo = prazo;
            Categoria = categoria;
        }

        public string Id { get; set; }
        public string UsuarioId { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        public string Nome { get; set; }

        public string Descricao { get; set; }

        [Required(ErrorMessage = "O campo Prazo é obrigatório.")]
        public double Prazo { get; set; }

        [Required(ErrorMessage = "O campo Categoria é obrigatório.")]
        public string Categoria { get; set; }
    }
}
