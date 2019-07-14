using System;
using System.Threading.Tasks;
using AutoMapper;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Templates.Api.Controllers;
using Templates.Core.Domain;
using Templates.Core.Domain.Exceptions;
using Templates.Core.Repositories;
using Templates.Infrastructure.Commands;
using Templates.Infrastructure.Commands.Templates;
using Templates.Infrastructure.Services;
using Templates.Infrastructure.Services.Exceptions;
using Templates.Infrastructure.Services.Interfaces;
using Xunit;

namespace Templates.Tests.Controllers
{
    public class TemplatesServiceTests
    {
        [Fact]
        public async Task CreateAsync_TemplateNameIsEmpty_ThrowException()
        {
            var id = System.Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var versionId = System.Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = System.Guid.Parse("d1c5463d-012a-4ab5-bdfc-f99ad37b5d00");
            var templateName = string.Empty;
            var content = "{\"some\" : \"value\"}";
            
            var templateRepositoryMock = new Mock<ITemplateRepository>();
            var mapperMock = new Mock<IMapper>();
            var templateService = new TemplateService(templateRepositoryMock.Object, mapperMock.Object);

            var exception = await Assert.ThrowsAsync<DomainException>(
                () => templateService.CreateAsync(id, versionId, userId,templateName,content));

            exception.Code.Should().Be("invalid_name");
        }

        [Fact]
        public async Task CreateAsync_ParametersAreGood_ReturnsZero()
        {
            var id = System.Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var versionId = System.Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = System.Guid.Parse("d1c5463d-012a-4ab5-bdfc-f99ad37b5d00");
            var templateName = "Test template";
            var content = "{\"some\" : \"value\"}";
            
            var templateRepositoryMock = new Mock<ITemplateRepository>();
            var mapperMock = new Mock<IMapper>();
            var templateService = new TemplateService(templateRepositoryMock.Object, mapperMock.Object);

            var result = await templateService.CreateAsync(id, versionId, userId,templateName,content);
            templateRepositoryMock.Verify(x => x.AddAsync(It.IsAny<Template>()), Times.Once);
            result.Should().Be(0);
        }

        [Fact]
        public async Task UpdateAsync_TemplateWithGivenIdDoesNotExists_ThrowException()
        {
            var id = System.Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var versionId = System.Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = System.Guid.Parse("d1c5463d-012a-4ab5-bdfc-f99ad37b5d00");
            var templateName = "Test template";
            var content = "{\"some\" : \"value\"}";
            
            var templateRepositoryMock = new Mock<ITemplateRepository>();
            templateRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(value: null);
            var mapperMock = new Mock<IMapper>();
            var templateService = new TemplateService(templateRepositoryMock.Object, mapperMock.Object);

            var exception = await Assert.ThrowsAsync<ServiceException>(
                () => templateService.UpdateAsync(id, versionId, userId,templateName,content));

            exception.Code.Should().Be("template_not_found");
        }

        [Fact]
        public async Task UpdateAsync_TemplateWithGivenIdExists_ReturnsZero()
        {
            var id = System.Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var versionId = System.Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = System.Guid.Parse("d1c5463d-012a-4ab5-bdfc-f99ad37b5d00");
            var templateName = "Test template";
            var content = "{\"some\" : \"value\"}";
            
            var templateRepositoryMock = new Mock<ITemplateRepository>();
            templateRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new Template());

            var mapperMock = new Mock<IMapper>();
            var templateService = new TemplateService(templateRepositoryMock.Object, mapperMock.Object);

            var result = await templateService.UpdateAsync(id, versionId, userId,templateName,content);
            result.Should().Be(0);
        }
    }
}