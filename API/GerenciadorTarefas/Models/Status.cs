using System;
using System.ComponentModel.DataAnnotations;

namespace GerenciadorTarefas.Models
{
    public class Status
    {
        public Status(string nome, string tarefaId)
        {
            Id = Guid.NewGuid().ToString();
            Nome = nome;
            TarefaId = tarefaId;
        }

        public string Id { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O campo TarefaId é obrigatório.")]
        public string TarefaId { get; set; }
    }
}
