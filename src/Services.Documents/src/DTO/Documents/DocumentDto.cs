using System;

namespace DTO.Documents
{
    public class DocumentDto
    {
        public Guid Id { get; set; }
        public Guid TemplateVersionId { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}