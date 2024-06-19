using Microsoft.AspNetCore.Mvc;
using GerenciadorTarefas.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
var app = builder.Build();

// Usuarios
app.MapPost("/api/usuarios/cadastrar", ([FromBody] Usuario usuario,
                                         [FromServices] AppDataContext context) =>
{
    var erros = new List<ValidationResult>();
    if (!Validator.TryValidateObject(usuario, new ValidationContext(usuario), erros, true))
    {
        return Results.BadRequest(erros);
    }

    context.Usuarios.Add(usuario);
    context.SaveChanges();
    return Results.Created($"Usuario {usuario.Nome} cadastrado com sucesso", usuario);

});

app.MapGet("/api/usuarios/listar", ([FromServices] AppDataContext context) =>
{
    var usuarios = context.Usuarios.ToList();
    return usuarios.Count > 0 ? Results.Ok(usuarios) : Results.NotFound("Não há usuarios cadastrados!!");
});

app.MapGet("/api/usuarios/buscar/{id}", ([FromRoute] Guid id,[FromServices] AppDataContext context) =>
{
    var usuarioId = id.ToString(); 
    var usuario = context.Usuarios.Find(usuarioId); 
    return usuario != null ? Results.Ok(usuario) : Results.NotFound("Usuario não encontrado!!");
});


app.MapDelete("/api/usuarios/deletar/{id}", ([FromRoute] string id, [FromServices] AppDataContext context) =>
{
    var usuario = context.Usuarios.Find(id);
    if (usuario == null)
        return Results.NotFound("Usuario não encontrado!");

    context.Usuarios.Remove(usuario);
    context.SaveChanges();
    return Results.Ok($"Usuario {usuario.Nome} deletado com sucesso!!");
});


app.MapPut("/api/usuarios/alterar/{id}", ([FromRoute] string id, [FromBody] Usuario usuarioAtualizado,
[FromServices] AppDataContext context) =>
{
    var usuario = context.Usuarios.Find(id);
    if (usuario == null)
        return Results.NotFound("Usuario não encontrado.");

    usuario.Nome = usuarioAtualizado.Nome;
    usuario.Idade = usuarioAtualizado.Idade;

    context.SaveChanges();
    return Results.Ok($"Usuario {usuario.Nome} alterado com sucesso.");
});


// Tarefas
app.MapPost("/api/tarefas/cadastrar/{usuarioId}", ([FromBody] Tarefa tarefa, string usuarioId, [FromServices] AppDataContext context) =>
{
    var erros = new List<ValidationResult>();
    if (!Validator.TryValidateObject(tarefa, new ValidationContext(tarefa), erros, true))
    {
        return Results.BadRequest(erros);
    }

    var usuario = context.Usuarios.Find(usuarioId);
    if (usuario == null)
    {
        return Results.NotFound($"Usuário com ID {usuarioId} não encontrado.");
    }

    tarefa.UsuarioId = usuarioId;

    context.Tarefas.Add(tarefa);
    context.SaveChanges();
    return Results.Created($"Tarefa '{tarefa.Nome}' cadastrada com sucesso", tarefa);
});

app.MapGet("/api/tarefas/listar", ([FromServices] AppDataContext context) =>
{
    var tarefas = context.Tarefas.ToList();
    return tarefas.Count > 0 ? Results.Ok(tarefas) : Results.NotFound("Não há tarefas cadastradas.");
});


app.MapGet("/api/tarefas/buscar/{id}", ([FromRoute] string id, [FromServices] AppDataContext context) =>
{
    var tarefa = context.Tarefas.Find(id);
    return tarefa != null ? Results.Ok(tarefa) : Results.NotFound("Tarefa não encontrada.");
});

app.MapDelete("/api/tarefas/remover/{id}", ([FromRoute] Guid id,[FromServices] AppDataContext context) =>
{
    var tarefa = context.Tarefas.Find(id);
    if (tarefa == null)
        return Results.NotFound("Tarefa não encontrada.");

    context.Tarefas.Remove(tarefa);
    context.SaveChanges();
    return Results.Ok($"Tarefa '{tarefa.Nome}' deletada com sucesso.");
});

app.MapDelete("/api/tarefas/deletar/{id}", ([FromRoute] string id, [FromServices] AppDataContext context) =>
{
    var tarefa = context.Tarefas.Find(id);
    if (tarefa == null)
        return Results.NotFound("Tarefa não encontrada.");

    context.Tarefas.Remove(tarefa);
    context.SaveChanges();
    return Results.Ok($"Tarefa '{tarefa.Nome}' deletada com sucesso.");
});

app.MapPut("/api/tarefas/alterar/{id}", ([FromRoute] string id, [FromBody] Tarefa tarefaAtualizada,
[FromServices] AppDataContext context) =>
{
    var tarefa = context.Tarefas.Find(id.ToString());
    if (tarefa == null)
        return Results.NotFound("Tarefa não encontrada.");

    tarefa.Nome = tarefaAtualizada.Nome;
    tarefa.Descricao = tarefaAtualizada.Descricao;
    tarefa.Prazo = tarefaAtualizada.Prazo;
    tarefa.Categoria = tarefaAtualizada.Categoria;

    context.SaveChanges();
    return Results.Ok($"Tarefa '{tarefa.Nome}' alterada com sucesso.");
});

// Status
app.MapPost("/api/status/cadastrar", ([FromBody] Status status, [FromServices] AppDataContext context) =>
{
    var erros = new List<ValidationResult>();
    if (!Validator.TryValidateObject(status, new ValidationContext(status), erros, true))
    {
        return Results.BadRequest(erros);
    }

    var tarefa = context.Tarefas.Find(status.TarefaId);
    if (tarefa == null)
    {
        return Results.NotFound($"Tarefa com ID {status.TarefaId} não encontrada.");
    }

    context.Status.Add(status);
    context.SaveChanges();
    return Results.Created($"Status '{status.Nome}' cadastrado com sucesso", status);
});

app.MapGet("/api/status/listar", ([FromServices] AppDataContext context) =>
{
    var statusList = context.Status.ToList();
    return statusList.Count > 0 ? Results.Ok(statusList) : Results.NotFound("Não há status cadastrados.");
});

app.MapGet("/api/status/buscar/{id}", ([FromRoute] string id, [FromServices] AppDataContext context) =>
{
    var status = context.Status.Find(id);
    return status != null ? Results.Ok(status) : Results.NotFound("Status não encontrado.");
});

app.MapDelete("/api/status/deletar/{id}", ([FromRoute] string id, [FromServices] AppDataContext context) =>
{
    var status = context.Status.Find(id);
    if (status == null)
        return Results.NotFound("Status não encontrado.");

    context.Status.Remove(status);
    context.SaveChanges();
    return Results.Ok($"Status '{status.Nome}' deletado com sucesso.");
});

app.MapPut("/api/status/alterar/{id}", ([FromRoute] string id, [FromBody] Status statusAtualizado, [FromServices] AppDataContext context) =>
{
    var status = context.Status.Find(id);
    if (status == null)
        return Results.NotFound("Status não encontrado.");

    status.Nome = statusAtualizado.Nome;
    status.TarefaId = statusAtualizado.TarefaId;

    context.SaveChanges();
    return Results.Ok($"Status '{status.Nome}' alterado com sucesso.");
});

// Prioridades
app.MapPost("/api/prioridades/cadastrar", ([FromBody] Prioridade prioridade, [FromServices] AppDataContext context) =>
{
    var erros = new List<ValidationResult>();
    if (!Validator.TryValidateObject(prioridade, new ValidationContext(prioridade), erros, true))
    {
        return Results.BadRequest(erros);
    }

    var tarefa = context.Tarefas.Find(prioridade.TarefaId);
    if (tarefa == null)
    {
        return Results.NotFound($"Tarefa com ID {prioridade.TarefaId} não encontrada.");
    }

    context.Prioridades.Add(prioridade);
    context.SaveChanges();
    return Results.Created($"Prioridade '{prioridade.Nome}' cadastrada com sucesso", prioridade);
});

app.MapGet("/api/prioridades/listar", ([FromServices] AppDataContext context) =>
{
    var prioridades = context.Prioridades.ToList();
    return prioridades.Count > 0 ? Results.Ok(prioridades) : Results.NotFound("Não há prioridades cadastradas.");
});

app.MapGet("/api/prioridades/buscar/{id}", ([FromRoute] string id, [FromServices] AppDataContext context) =>
{
    var prioridade = context.Prioridades.Find(id);
    return prioridade != null ? Results.Ok(prioridade) : Results.NotFound("Prioridade não encontrada.");
});

app.MapDelete("/api/prioridades/deletar/{id}", ([FromRoute] string id, [FromServices] AppDataContext context) =>
{
    var prioridade = context.Prioridades.Find(id);
    if (prioridade == null)
        return Results.NotFound("Prioridade não encontrada.");

    context.Prioridades.Remove(prioridade);
    context.SaveChanges();
    return Results.Ok($"Prioridade '{prioridade.Nome}' deletada com sucesso.");
});

app.MapPut("/api/prioridades/alterar/{id}", ([FromRoute] string id, [FromBody] Prioridade prioridadeAtualizada, [FromServices] AppDataContext context) =>
{
    var prioridade = context.Prioridades.Find(id);
    if (prioridade == null)
        return Results.NotFound("Prioridade não encontrada.");

    prioridade.Nome = prioridadeAtualizada.Nome;
    prioridade.TarefaId = prioridadeAtualizada.TarefaId;

    context.SaveChanges();
    return Results.Ok($"Prioridade '{prioridade.Nome}' alterada com sucesso.");
});

app.Run();
