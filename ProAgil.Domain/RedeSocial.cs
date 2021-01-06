namespace ProAgil.Domain
{
    public class RedeSocial
    {
        public int Id { get; set; } 
        public string Nome { get; set; }
        public string URL { get; set; } 
        public int? EventoId { get; set; }
        public Evento Evento { get; set; } //Pertence a 1 evento
        public int? PalestranteId { get; set; }
        public Palestrante Palestrante { get; set; } //Pertence a 1 palestrante
    }
}