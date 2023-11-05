using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Ticketek.Api;
using static System.Net.WebRequestMethods;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAWSLambdaHosting(LambdaEventSource.RestApi);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.SetIsOriginAllowed(origin =>
        new Uri(origin).Host == "localhost"
        || new Uri(origin).Host == "ticketek-static.s3-website-ap-southeast-2.amazonaws.com");
    });
});

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
app.UseCors();

app.Run();
