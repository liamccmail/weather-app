var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddUserSecrets<Program>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Add services to the container.

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable CORS from any origin
app.UseCors(x => x
  .AllowAnyMethod()
  .AllowAnyHeader()
  .AllowCredentials()
  .SetIsOriginAllowed(origin => true));

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
