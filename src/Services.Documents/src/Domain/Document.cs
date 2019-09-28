using System;
using Domain.Exceptions;

namespace Domain
{
    public class Document
    {
        public Guid Id { get; set; }
        public Guid TemplateVersionId { get; set; }
        public Guid CurrentVersion { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public bool Deleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Content { get; set; }

        public Document() { }

        public Document(Guid id, Guid templateVersionId, Guid currentVersion, string name, string userId, string content) 
        {
            Id = id;
            TemplateVersionId = templateVersionId;
            CurrentVersion = currentVersion;
            UserId = userId;
            SetContent(content);
            SetName(name);
            Deleted = false;
            CreatedAt = DateTime.UtcNow;
        }

        public void SetName(string name)
        {
            if(String.IsNullOrEmpty(name))
            {
                throw new DomainException(ErrorCodes.InvalidName, 
                    "Name of document is invalid.");
            }
            Name = name;
        }

        public void SetContent(string content)
        {
            if(String.IsNullOrEmpty(content))
            {
                throw new DomainException(ErrorCodes.EmptyContent, 
                    "Content of document is empty");
            }
            Content = content;
        }
    }
}