using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Models
{
    public partial class Document
    {
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }
        [BsonRepresentation(BsonType.String)]
        public Guid TemplateVersionId { get; set; }
        [BsonRepresentation(BsonType.String)]
        public Guid CurrentVersion { get; set; }
        [BsonRepresentation(BsonType.String)]
        public string UserId { get; set; }
        public string Name { get; set; }
        public bool Deleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? LastUpdate { get; set; }
    }
}
