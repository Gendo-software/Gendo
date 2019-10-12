using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Models
{
    public class Template
    {
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }
        [BsonRepresentation(BsonType.String)]
        public Guid CurrentVersionId { get; set; }

        public Template()
        {
        }

        public Template(Guid id, Guid currentVersionId)
        {
            Id = id;
            CurrentVersionId = currentVersionId;
        }
    }
}