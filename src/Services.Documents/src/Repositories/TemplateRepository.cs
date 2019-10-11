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
using Models;

namespace Repositories
{
    public class TemplateRepository : ITemplateRepository, IMongoRepository
    {
        private readonly IMongoDatabase _database;
        private IMongoCollection<Template> _templates => _database.GetCollection<Template>("templates");
        
        public TemplateRepository(IMongoDatabase database)
        {
            _database = database;
        }

        public async Task AddAsync(Template template)
            => await _templates.InsertOneAsync(template);

        public async Task DeleteAsync(Guid id)
            => await _templates.DeleteOneAsync(x => x.Id == id);
    }
}