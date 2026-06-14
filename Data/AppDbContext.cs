using Microsoft.EntityFrameworkCore;
using SorveteriaApi.Models;

namespace SorveteriaApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Fornecedor> Fornecedores { get; set; }
        public DbSet<Vendedor> Vendedores { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
    }
}