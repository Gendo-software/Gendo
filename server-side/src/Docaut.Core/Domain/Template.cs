using System;
using System.Collections.Generic;

namespace Docaut.Core.Domain
{
    public class Template
    {
        public Guid Id { get; set; }
        public Guid CurrentVersion { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public bool Deleted { get; set; }
        public bool DuringEditing { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }

        protected Template() { }

        public Template(Guid id, Guid currentVersion, Guid userId, string name, string content) 
        {
            Id = id;
            CurrentVersion = currentVersion;
            UserId = userId;
            Name = name;
            Deleted = false; 
            DuringEditing = false;
            Content = content;
            CreatedAt = DateTime.UtcNow;
        }
    }
}