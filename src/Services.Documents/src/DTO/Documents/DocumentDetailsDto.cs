using System;
using Newtonsoft.Json.Linq;

namespace DTO.Documents
{
    public class DocumentDetailsDto
    {
        public Guid Id { get; set; }
        public Guid TemplateVersionId { get; set; }
        public Guid TemplateId { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        public JObject Content { get; set; }
    }
}