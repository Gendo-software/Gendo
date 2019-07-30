using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Templates.Database.Models
{
    public partial class TemplateVersion
    {
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }
        [BsonRepresentation(BsonType.String)]
        public Guid TemplateId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Name { get; set; }
        public BsonDocument Content { get; set; }
    }
}
