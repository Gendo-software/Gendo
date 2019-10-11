using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Models
{
    public class Template
    {
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }
    }
}