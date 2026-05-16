using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SorveteriaApi.Data;
using SorveteriaApi.Models;

namespace SorveteriaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FornecedorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FornecedorController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/fornecedor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fornecedor>>> Get()
        {
            return await _context.Fornecedores.ToListAsync();
        }

        // POST: api/fornecedor
        [HttpPost]
        public async Task<ActionResult> Post(Fornecedor fornecedor)
        {
            _context.Fornecedores.Add(fornecedor);
            await _context.SaveChangesAsync();
            return Ok(fornecedor);
        }

        // PUT: api/fornecedor/{codigo}
        [HttpPut("{codigo}")]
        public async Task<ActionResult> Put(int codigo, Fornecedor fornecedor)
        {
            var fornecedorBanco = await _context.Fornecedores.FindAsync(codigo);
            if (fornecedorBanco == null)
            {
                return NotFound();
            }

            fornecedorBanco.Nome = fornecedor.Nome;
            fornecedorBanco.Cnpj = fornecedor.Cnpj;
            fornecedorBanco.Email = fornecedor.Email;
            fornecedorBanco.Telefone = fornecedor.Telefone;

            await _context.SaveChangesAsync();
            return Ok(fornecedorBanco);
        }

        // DELETE: api/fornecedor/{codigo}
        [HttpDelete("{codigo}")]
        public async Task<ActionResult> Delete(int codigo)
        {
            var sampleFornecedor = await _context.Fornecedores.FindAsync(codigo);
            if (sampleFornecedor == null)
            {
                return NotFound();
            }

            _context.Fornecedores.Remove(sampleFornecedor);
            await _context.SaveChangesAsync();
            return Ok();
        }
        // GET: api/fornecedor/nome/{nome}
        [HttpGet("nome/{nome}")]
        public async Task<ActionResult<IEnumerable<Fornecedor>>> GetByNome(string nome)
        {
            // O Where filtra a lista e o Contains procura o texto dentro do nome
            return await _context.Fornecedores
                .Where(f => f.Nome.Contains(nome))
                .ToListAsync();
        }
    }
}