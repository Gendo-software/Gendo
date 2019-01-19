using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Docaut.Core.Domain;
using Docaut.Core.Repositories;
using Docaut.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Docaut.Infrastructure.Repositories
{
    public class TemplateRepository : ITemplateRepository, IRepository
    {
        private Database.Models.DocautContext _context;
        private readonly IMapper _mapper;

        public TemplateRepository(Database.Models.DocautContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddAsync(Template template)
        {
            var _template = _mapper.Map<Template, Database.Models.Template>(template);
            await _context.Template.AddAsync(_template);
            await AddVersionAsync(template);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Template template)
        {
            var _template = _mapper.Map<Template, Database.Models.Template>(template);
            await AddVersionAsync(template);
            _context.Entry(_template).State = EntityState.Modified;
            _context.Entry(_template).Property(x => x.CreatedAt).IsModified = false;
            await _context.SaveChangesAsync();
        }

        public async Task<Template> GetAsync(Guid id)
        {
            return await _context.Template.Where(x => x.Id == id && x.Deleted == false)
                .Join(_context.TemplateVersion,
                    t => t.CurrentVersion,
                    v => v.Id,
                    (t, v) => new Template(t.Id, t.CurrentVersion, t.UserId, v.Name, v.Content))
            .SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<Template>> GetAsync()
        {
            return await _context.Template.Where(x => x.Deleted == false)
                .Join(_context.TemplateVersion,
                    t => t.CurrentVersion,
                    v => v.Id,
                    (t, v) => new Template(t.Id, t.CurrentVersion, t.UserId, v.Name, v.Content))
                .ToListAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var template = new Database.Models.Template { Id = id };
            _context.Template.Attach(template);
            template.Deleted = true;
            await _context.SaveChangesAsync();
        }

        private async Task AddVersionAsync(Template template)
        {
            var _templateVersion = _mapper.Map<Template, Database.Models.TemplateVersion>(template);
            _templateVersion.Id = template.CurrentVersion;
            _templateVersion.TemplateId = template.Id;
            await _context.TemplateVersion.AddAsync(_templateVersion);
        }
    }
}