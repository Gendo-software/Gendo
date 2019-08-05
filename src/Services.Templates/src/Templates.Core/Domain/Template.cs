using System;
using Templates.Core.Domain.Exceptions;

namespace Templates.Core.Domain
{
    public class Template
    {
        public Guid Id { get; set; }
        public Guid CurrentVersion { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public bool Deleted { get; set; }
        public bool DuringEditing { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Content { get; set; }

        public Template() { }

        public Template(Guid id, Guid currentVersion, string userId, string name, string content) 
        {
            Id = id;
            CurrentVersion = currentVersion;
            UserId = userId;
            SetName(name);
            SetContent(content);
            Deleted = false; 
            DuringEditing = false;
            CreatedAt = DateTime.UtcNow;
        }

        public void SetName(string name)
        {
            if(String.IsNullOrEmpty(name))
            {
                throw new DomainException(ErrorCodes.InvalidName, 
                    "Name of template is invalid.");
            }
            Name = name;
        }

        public void SetContent(string content)
        {
            if(String.IsNullOrEmpty(content))
            {
                throw new DomainException(ErrorCodes.EmptyContent, 
                    "Content of template is empty");
            }
            Content = content;
        }
    }
}