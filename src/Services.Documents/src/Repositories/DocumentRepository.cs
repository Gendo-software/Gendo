using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Repositories;
using Repositories.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Repositories
{
    public class DocumentRepository : IDocumentRepository, IMongoRepository
    {
        private readonly IMapper _mapper;
        private readonly IMongoDatabase _database;
        private IMongoCollection<Models.Document> _documents => _database.GetCollection<Models.Document>("documents");
        private IMongoCollection<Models.DocumentVersion> _documentVersions => _database.GetCollection<Models.DocumentVersion>("document_versions");
        
        public DocumentRepository(IMongoDatabase database, IMapper mapper)
        {
            _database = database;
            _mapper = mapper;
        }

        public async Task AddAsync(Document document)
        {
            var _document = _mapper.Map<Document, Models.Document>(document);
            using (var session = await _database.Client.StartSessionAsync())
            {
                session.StartTransaction(new TransactionOptions(readConcern: ReadConcern.Snapshot,
                    writeConcern: WriteConcern.WMajority));
                try
                {
                    await _documents.InsertOneAsync(_document);
                    await AddVersionAsync(document);
                }
                catch
                {
                    await session.AbortTransactionAsync();
                    throw;
                }
                await session.CommitTransactionAsync();
            }
        }

        public async Task UpdateAsync(Document document)
        {
            var _document = _mapper.Map<Document, Models.Document>(document);
            using (var session = await _database.Client.StartSessionAsync())
            {
                session.StartTransaction(new TransactionOptions(readConcern: ReadConcern.Snapshot,
                    writeConcern: WriteConcern.WMajority));
                try
                {
                    var update = Builders<Models.Document>.Update
                        .Set("name", document.Name)
                        .Set("currentVersion", document.CurrentVersion.ToString())
                        .CurrentDate("lastUpdate");
                    await _documents.UpdateOneAsync(x => x.Id == document.Id, update);
                    await AddVersionAsync(document);
                }
                catch
                {
                    await session.AbortTransactionAsync();
                    throw;
                }
                await session.CommitTransactionAsync();
            }
        }

        public async Task<Document> GetAsync(Guid id)
        {
            var _document = await _documents.Find(x => x.Id == id && x.Deleted == false)
                .FirstOrDefaultAsync();
            var document = _mapper.Map<Models.Document, Document>(_document);
            if(document != null)
            {
                var lastVersion = await _documentVersions.Find(x => x.Id == document.CurrentVersion)
                    .FirstOrDefaultAsync();
                document.Content = lastVersion.Content.ToString();
            }
            return document;
        }

        public async Task<IEnumerable<Document>> GetAsync()
        {
            var documents = await _documents.Find(x => x.Deleted == false).ToListAsync();
            return documents.Select(_mapper.Map<Models.Document, Document>);
        }

        public async Task DeleteAsync(Guid id)
        {
            var update = Builders<Models.Document>.Update
                .Set("deleted", true)
                .CurrentDate("lastUpdate");
            await _documents.UpdateOneAsync(x => x.Id == id, update);
        }

        private async Task AddVersionAsync(Document document)
        {
            var documentVersion = new Models.DocumentVersion();
            documentVersion.Id = document.CurrentVersion;
            documentVersion.DocumentId = document.Id;
            documentVersion.CreatedAt = DateTime.UtcNow;
            documentVersion.Name = document.Name;
            documentVersion.Content = BsonDocument.Parse(document.Content.ToString());
            await _documentVersions.InsertOneAsync(documentVersion);
        }
    }
}