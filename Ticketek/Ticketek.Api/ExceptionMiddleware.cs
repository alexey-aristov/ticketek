using System.Text.Json;

public class ExceptionMiddleware
{

    private readonly RequestDelegate _next;


    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context, ILogger<ExceptionMiddleware> logger)
    {
        try
        {
            await _next(context);
        }
        catch (Exception exception)
        {
            var message = JsonSerializer.Serialize(new
            {
                Message = exception.ToString()
            });

            logger.LogError(exception, "error");
            context.Response.StatusCode = 200;
            await context.Response.WriteAsync(message);

        }
    }
}