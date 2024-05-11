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

app.Run();
