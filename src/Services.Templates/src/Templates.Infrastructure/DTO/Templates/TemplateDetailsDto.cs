using System;
using Newtonsoft.Json.Linq;

namespace Templates.Infrastructure.DTO.Templates
{
    public class TemplateDetailsDto
    {
        public Guid Id { get; set; }
        public Guid CurrentVersionId { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public bool DuringEditing { get; set; }
        public DateTime CreatedAt { get; set; }
        public JObject Content { get; set; }
    }
}