using System.Threading.Tasks;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public interface IProAgilRepository
    {
        // GERAL
         void Add<T>(T Entity) where T: class;
         void Update<T>(T Entity) where T: class;
         void Delete<T>(T Entity) where T: class;
         Task<bool> SaveChangeASync();

         //EVENTOS
         Task<Evento[]> GetAllEventoAsyncByTema(string Tema, bool includePalestrantes);
         Task<Evento[]> GetAllEventoAsync(bool includePalestrantes);
         Task<Evento> GetEventoAsyncById(int EventoId, bool includePalestrantes);
         
         //PALESTRANTES
         Task<Palestrante[]> GetAllPalestranteAsyncByName(string Name, bool includeEventos);

         Task<Palestrante> GetPalestranteAsyncById(int PalestranteId, bool includeEventos);
    }
}