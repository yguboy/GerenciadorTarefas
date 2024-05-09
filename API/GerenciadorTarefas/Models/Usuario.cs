using System.ComponentModel.DataAnnotations;

namespace GerenciadorTarefas.Models // Alterado para corresponder ao namespace usado no contexto do banco de dados
{
    public class Usuario
    {
        public Usuario(string nome, int idade)
        {
            Id = Guid.NewGuid().ToString();
            Nome = nome;
            Idade = idade;
        }

        public string Id { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        public string Nome { get; set; }

        [Range(0, 100, ErrorMessage = "A idade deve estar entre 0 e 100.")]
        public int Idade { get; set; }
    }
}
