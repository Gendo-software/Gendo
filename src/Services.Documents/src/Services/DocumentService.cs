using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Repositories.Interfaces;
using DTO.Documents;
using Services.Exceptions;
using Services.Interfaces;

namespace Services
{
    public class DocumentService : IDocumentService, IService
    {
        private readonly IDocumentRepository _documentRepository;
        private readonly IMapper _mapper;

        public DocumentService(IDocumentRepository documentRepository, IMapper mapper)
        {
            _documentRepository = documentRepository;
            _mapper = mapper;
        }

        public async Task<int> CreateAsync(Guid id, Guid templateVersionId, Guid currentVersion, string name, string userId, string content)
        {
            var document = new Document(id, templateVersionId, currentVersion, name, userId, content);
            await _documentRepository.AddAsync(document);
            return 0;
        }

        public async Task<int> UpdateAsync(Guid id, Guid currentVersion, string name, string userId, string content)
        {
            var document = await GetOrFailAsync(id);
            document.CurrentVersion = currentVersion;
            document.SetUserId(userId);
            document.SetName(name);
            document.SetContent(content);
            await _documentRepository.UpdateAsync(document);
            return 0;
        }

        public async Task<IEnumerable<DocumentDto>> GetAsync()
        {
            var documents = await _documentRepository.GetAsync();
            return _mapper.Map<IEnumerable<Document>,IEnumerable<DocumentDto>>(documents);
        }

        public async Task<DocumentDetailsDto> GetAsync(Guid id)
        {
            var document = await GetOrFailAsync(id);
            return _mapper.Map<Document,DocumentDetailsDto>(document);
        }

        public async Task<int> DeleteAsync(Guid id)
        {
            var document = await GetOrFailAsync(id);
            await _documentRepository.DeleteAsync(id);
            return 0;
        }

        private async Task<Document> GetOrFailAsync(Guid documentId)
        {
            var document = await _documentRepository.GetAsync(documentId);
            if(document == null)
            {
                throw new ServiceException(ErrorCodes.DocumentNotFound, 
                    $"Document with id: '{documentId}' was not found.");
            }
            return document;            
        }
    }
}