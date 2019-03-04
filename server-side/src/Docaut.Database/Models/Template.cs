﻿using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Docaut.Database.Models
{
    public partial class Template
    {
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }
        [BsonRepresentation(BsonType.String)]
        public Guid CurrentVersion { get; set; }
        [BsonRepresentation(BsonType.String)]
        public Guid UserId { get; set; }
        public bool Deleted { get; set; }
        public string Name { get; set; }
        public bool DuringEditing { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? LastUpdate { get; set; }
    }
}
