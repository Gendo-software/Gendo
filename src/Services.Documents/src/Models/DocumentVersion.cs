using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Models
{
    public partial class DocumentVersion
    {
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }
        [BsonRepresentation(BsonType.String)]
        public Guid DocumentId { get; set; }
        public DateTime CreatedAt { get; set; }
        public BsonDocument Content { get; set; }
    }
}
