using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Domain;
using ProAgil.Repository;

namespace ProAgil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        // INJECAO DE DEPENDENCIA - INJETA O REPOSITÓRIO
        public readonly IProAgilRepository _repo;
        public EventoController(IProAgilRepository repo)
        {
            _repo = repo;
        }

        // --------------------- GET ----------------------

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
               var results = await _repo.GetAllEventoAsync(true); //Retorna todos os eventos
               return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
            
        }

        // RETORNA APENAS EVENTO COM ID
        [HttpGet("{EventoId}")]
        public async Task<IActionResult> Get(int EventoId)
        {
            try
            {
               var results = await _repo.GetEventoAsyncById(EventoId, true);
               return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
        }

        // RETORNA APENAS EVENTOS COM AQUELE TEMA
        [HttpGet("getByTema/{tema}")]
        public async Task<IActionResult> Get(string tema)
        {
            try
            {
               var results = await _repo.GetAllEventoAsyncByTema(tema, true);
               return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
        }

        // --------------------- POST ----------------------

        // CADASTRA EVENTO
        [HttpPost]
        public async Task<IActionResult> Post(Evento model)
        {
            try
            {
               _repo.Add(model);

               if(await _repo.SaveChangeASync()){ //Precisa ser assincrono pra salvar a mudança de estado
                    return Created($"/api/evento/{model.Id}", model);
               }
               
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

            return BadRequest();
        }

        // --------------------- PUT ----------------------

        // ATUALIZA O EVENTO
        [HttpPut]
        public async Task<IActionResult> Put(int EventoId, Evento model)
        {
            try
            {
                //VERIFICA SE EXISTE
                var evento = await _repo.GetEventoAsyncById(EventoId, false);
                if(evento == null) return NotFound();

               _repo.Update(model);

               if(await _repo.SaveChangeASync()){ //Precisa ser assincrono pra salvar a mudança de estado
                    return Created($"/api/evento/{model}", model);
               }
               
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

            return BadRequest();
        }

    

        // --------------------- DELETE ----------------------

        [HttpDelete]
        public async Task<IActionResult> Delete(int EventoId)
        {
            try
            {
                //VERIFICA SE EXISTE
                var evento = await _repo.GetEventoAsyncById(EventoId, false);
                if(evento == null) return NotFound();

               _repo.Update(evento);

               if(await _repo.SaveChangeASync()){ //Precisa ser assincrono pra salvar a mudança de estado
                    return Ok();
               }
               
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

            return BadRequest();
        }
    }
}