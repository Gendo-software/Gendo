using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Templates.Core.Domain;
using Templates.Core.Repositories;
using Templates.Infrastructure.Repositories.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Templates.Infrastructure.Repositories
{
    public class TemplateRepository : ITemplateRepository, IMongoRepository
    {
        private readonly IMapper _mapper;
        private readonly IMongoDatabase _database;
        private IMongoCollection<Database.Models.Template> Templates => _database.GetCollection<Database.Models.Template>("templates");
        private IMongoCollection<Database.Models.TemplateVersion> TemplateVersions => _database.GetCollection<Database.Models.TemplateVersion>("template_versions");
        
        public TemplateRepository(IMongoDatabase database, IMapper mapper)
        {
            _database = database;
            _mapper = mapper;
        }

        public async Task AddAsync(Template template)
        {
            var _template = _mapper.Map<Template, Database.Models.Template>(template);
            using (var session = await _database.Client.StartSessionAsync())
            {
                session.StartTransaction(new TransactionOptions(readConcern: ReadConcern.Snapshot,
                    writeConcern: WriteConcern.WMajority));
                try
                {
                    await Templates.InsertOneAsync(_template);
                    await AddVersionAsync(template);
                }
                catch
                {
                    await session.AbortTransactionAsync();
                    throw;
                }
                await session.CommitTransactionAsync();
            }
        }

        public async Task UpdateAsync(Template template)
        {
            var _template = _mapper.Map<Template, Database.Models.Template>(template);
            using (var session = await _database.Client.StartSessionAsync())
            {
                session.StartTransaction(new TransactionOptions(readConcern: ReadConcern.Snapshot,
                    writeConcern: WriteConcern.WMajority));
                try
                {
                    var update = Builders<Database.Models.Template>.Update
                        .Set("userId", template.UserId)
                        .Set("name", template.Name)
                        .Set("currentVersionId", template.CurrentVersionId.ToString())
                        .CurrentDate("lastUpdate");
                    await Templates.UpdateOneAsync(x=>x.Id == template.Id, update);
                    await AddVersionAsync(template);
                }
                catch
                {
                    await session.AbortTransactionAsync();
                    throw;
                }
                await session.CommitTransactionAsync();
            }
        }

        public async Task<Template> GetAsync(Guid id)
        {
            var _template = await Templates.Find(x => x.Id == id && x.Deleted == false)
                .FirstOrDefaultAsync();
            var template = _mapper.Map<Database.Models.Template, Template>(_template);
            if(template != null)
            {
                var lastVersion = await TemplateVersions.Find(x => x.Id == template.CurrentVersionId)
                    .FirstOrDefaultAsync();
                template.Content = lastVersion.Content.ToString();
            }
            return template;
        }

        public async Task<IEnumerable<Template>> GetAsync()
        {
            var templates = await Templates.Find(x => x.Deleted == false).ToListAsync();
            return templates.Select(_mapper.Map<Database.Models.Template, Template>);
        }

        public async Task DeleteAsync(Guid id)
        {
            var update = Builders<Database.Models.Template>.Update
                .Set("deleted", true)
                .CurrentDate("lastUpdate");
            await Templates.UpdateOneAsync(x => x.Id == id, update);
        }

        private async Task AddVersionAsync(Template template)
        {
            var templateVersion = new Database.Models.TemplateVersion();
            templateVersion.Id = template.CurrentVersionId;
            templateVersion.TemplateId = template.Id;
            templateVersion.CreatedAt = DateTime.UtcNow;
            templateVersion.Name = template.Name;
            templateVersion.Content = BsonDocument.Parse(template.Content.ToString());
            await TemplateVersions.InsertOneAsync(templateVersion);
        }
    }
}