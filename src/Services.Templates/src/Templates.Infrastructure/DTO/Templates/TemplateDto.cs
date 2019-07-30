using System;

namespace Templates.Infrastructure.DTO.Templates
{
    public class TemplateDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public bool DuringEditing { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}