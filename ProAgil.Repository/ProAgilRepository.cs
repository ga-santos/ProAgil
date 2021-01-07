using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public class ProAgilRepository : IProAgilRepository
    {
        //ADICIONANDO O CONTEXTO
        public readonly ProAgilContext _context;
        public ProAgilRepository(ProAgilContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking; // NAO TRAVA OS RECURSOS NO ENTITY
        }

        //MÉTODOS GERAIS
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<bool> SaveChangeASync()
        {
           //se salvou retorna true
           return (await _context.SaveChangesAsync()) > 0;
        }

        //EVENTO
        public async Task<Evento[]> GetAllEventoAsync(bool includePalestrantes = false) //valor padrao
        {
            //MONTANDO QUERY NO BANCO DE DADOS
            IQueryable<Evento> query = _context.Eventos
                //INCLUI MAIS CAMPOS NA QUERY
                .Include(c => c.Lotes)
                .Include(c => c.RedesSociais);

            //VERIFICA PARAMETRO
            if(includePalestrantes){
                query = query
                    //INCLUI MAIS CAMPOS NA QUERY
                    .Include(pe => pe.PalestranteEventos)
                    .ThenInclude(p => p.Palestrante);
            }

            query = query.AsNoTracking()
                .OrderByDescending(c => c.DataEvento);


            return await query.ToArrayAsync();
        }

        public async Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrantes)
        {
            //MONTANDO QUERY NO BANCO DE DADOS
            IQueryable<Evento> query = _context.Eventos
                //INCLUI MAIS CAMPOS NA QUERY
                .Include(c => c.Lotes)
                .Include(c => c.RedesSociais);

            //VERIFICA PARAMETRO
            if(includePalestrantes){
                query = query
                    //INCLUI MAIS CAMPOS NA QUERY
                    .Include(pe => pe.PalestranteEventos)
                    .ThenInclude(p => p.Palestrante);
            }

            query = query.AsNoTracking()
                .OrderByDescending(c => c.DataEvento)
                .Where(c => c.Tema.ToLower().Contains(tema.ToLower()));

            return await query.ToArrayAsync();
        }
        
        public async Task<Evento> GetEventoAsyncById(int EventoId, bool includePalestrantes)
        {
            //MONTANDO QUERY NO BANCO DE DADOS
            IQueryable<Evento> query = _context.Eventos
                //INCLUI MAIS CAMPOS NA QUERY
                .Include(c => c.Lotes)
                .Include(c => c.RedesSociais);

            //VERIFICA PARAMETRO
            if(includePalestrantes){
                query = query
                    //INCLUI MAIS CAMPOS NA QUERY
                    .Include(pe => pe.PalestranteEventos)
                    .ThenInclude(p => p.Palestrante);
            }

            query = query.AsNoTracking()
                .OrderByDescending(c => c.DataEvento)
                .Where(c => c.Id == EventoId);

            return await query.FirstOrDefaultAsync();
        }

        //PALESTRANTE
        public async Task<Palestrante[]> GetAllPalestranteAsyncByName(string Name, bool includeEventos = false)
        {
            //MONTANDO QUERY NO BANCO DE DADOS
            IQueryable<Palestrante> query = _context.Palestrantes //CONSULTA NOS PALESTRANTES
                //INCLUI MAIS CAMPOS NA QUERY
                .Include(c => c.RedesSociais);

            //VERIFICA PARAMETRO
            if(includeEventos){
                query = query
                    //INCLUI MAIS CAMPOS NA QUERY
                    .Include(pe => pe.PalestranteEventos)
                    .ThenInclude(e => e.Evento);
            }

            query = query.AsNoTracking()
                //.OrderBy(p => p.Nome)
                .Where(p => p.Nome.ToLower().Contains(Name.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante> GetPalestranteAsyncById(int PalestranteId, bool includeEventos = false)
        {
            //MONTANDO QUERY NO BANCO DE DADOS
            IQueryable<Palestrante> query = _context.Palestrantes //CONSULTA NOS PALESTRANTES
                //INCLUI MAIS CAMPOS NA QUERY
                .Include(c => c.RedesSociais);

            //VERIFICA PARAMETRO
            if(includeEventos){
                query = query
                    //INCLUI MAIS CAMPOS NA QUERY
                    .Include(pe => pe.PalestranteEventos)
                    .ThenInclude(e => e.Evento);
            }

            query = query.AsNoTracking()
                //.OrderBy(p => p.Nome)
                .Where(p => p.Id == PalestranteId);

            return await query.FirstOrDefaultAsync();
        }

    }
}