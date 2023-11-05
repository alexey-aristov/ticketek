using Microsoft.EntityFrameworkCore;
using Ticketek.Api;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAWSLambdaHosting(LambdaEventSource.RestApi);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// For simplicity, Swagger is publicly exposed. This is acceptable only for development purposes.
app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.Migrate();
}

app.Run();
