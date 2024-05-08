using Microsoft.AspNetCore.Mvc;
using API.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

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
    return Results.Created($"Usuário {usuario.Nome} cadastrado com sucesso", usuario);

});

app.MapGet("/api/usuarios/listar", ([FromServices] AppDataContext context) =>
{
    var usuarios = context.Usuarios.ToList();
    return usuarios.Count > 0 ? Results.Ok(usuarios) : Results.NotFound("Não há usuários cadastrados!!");
});

app.MapGet("/api/usuarios/buscar/{id}", ([FromRoute] Guid id,[FromServices] AppDataContext context) =>
{
    var usuario = context.Usuarios.Find(id);
    return usuario != null ? Results.Ok(usuario) : Results.NotFound("Usuário não encontrado!!");
});

app.MapDelete("/api/usuarios/deletar/{id}", ([FromRoute] Guid id,[FromServices] AppDataContext context) =>
{
    var usuario = context.Usuarios.Find(id);
    if (usuario == null)
        return Results.NotFound("Usuário não encontrado!");

    context.Usuarios.Remove(usuario);
    context.SaveChanges();
    return Results.Ok($"Usuário {usuario.Nome} deletado com sucesso!!");
});

app.MapPut("/api/usuarios/alterar/{id}", ([FromRoute] Guid id, [FromBody] Usuario usuarioAtualizado,
[FromServices] AppDataContext context) =>
{
    var usuario = context.Usuarios.Find(id);
    if (usuario == null)
        return Results.NotFound("Usuário não encontrado.");

    usuario.Nome = usuarioAtualizado.Nome;
    usuario.Idade = usuarioAtualizado.Idade;

    context.SaveChanges();
    return Results.Ok($"Usuário {usuario.Nome} alterado com sucesso.");
});

// Tarefas
app.MapPost("/api/tarefas/cadastrar", ([FromBody] Tarefa tarefa,[FromServices] AppDataContext context) =>
{
    var erros = new List<ValidationResult>();
    if (!Validator.TryValidateObject(tarefa, new ValidationContext(tarefa), erros, true))
    {
        return Results.BadRequest(erros);
    }

    context.Tarefas.Add(tarefa);
    context.SaveChanges();
    return Results.Created($"Tarefa '{tarefa.Nome}' cadastrada com sucesso", tarefa);
});

app.MapGet("/api/tarefas/listar", ([FromServices] AppDataContext context) =>
{
    var tarefas = context.Tarefas.ToList();
    return tarefas.Count > 0 ? Results.Ok(tarefas) : Results.NotFound("Não há tarefas cadastradas.");
});

app.MapGet("/api/tarefas/buscar/{id}", ([FromRoute] Guid id,[FromServices] AppDataContext context) =>
{
    var tarefa = context.Tarefas.Find(id);
    return tarefa != null ? Results.Ok(tarefa) : Results.NotFound("Tarefa não encontrada.");
});

app.MapDelete("/api/tarefas/deletar/{id}", ([FromRoute] Guid id,[FromServices] AppDataContext context) =>
{
    var tarefa = context.Tarefas.Find(id);
    if (tarefa == null)
        return Results.NotFound("Tarefa não encontrada.");

    context.Tarefas.Remove(tarefa);
    context.SaveChanges();
    return Results.Ok($"Tarefa '{tarefa.Nome}' deletada com sucesso.");
});

app.MapPut("/api/tarefas/alterar/{id}", ([FromRoute] Guid id,[FromBody] Tarefa tarefaAtualizada,
[FromServices] AppDataContext context) =>
{
    var tarefa = context.Tarefas.Find(id);
    if (tarefa == null)
        return Results.NotFound("Tarefa não encontrada.");

    tarefa.Nome = tarefaAtualizada.Nome;
    tarefa.Descricao = tarefaAtualizada.Descricao;
    tarefa.Prazo = tarefaAtualizada.Prazo;
    tarefa.Categoria = tarefaAtualizada.Categoria;
    tarefa.UsuarioId = tarefaAtualizada.UsuarioId;

    context.SaveChanges();
    return Results.Ok($"Tarefa '{tarefa.Nome}' alterada com sucesso.");
});

app.Run();
