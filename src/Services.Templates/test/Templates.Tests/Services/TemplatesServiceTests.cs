using System;
using System.Threading.Tasks;
using AutoMapper;
using FluentAssertions;
using Moq;
using Newtonsoft.Json.Linq;
using Templates.Core.Domain;
using Templates.Core.Domain.Exceptions;
using Templates.Core.Repositories;
using Templates.Infrastructure.DTO.Templates;
using Templates.Infrastructure.Services;
using Templates.Infrastructure.Services.Exceptions;
using Xunit;

namespace Templates.Tests.Controllers
{
    public class TemplatesServiceTests
    {
        [Fact]
        public async Task CreateAsync_TemplateNameIsEmpty_ThrowException()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var versionId = Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = Guid.Parse("d1c5463d-012a-4ab5-bdfc-f99ad37b5d00");
            var templateName = string.Empty;
            var content = "{\"foo\" : \"bar\"}";
            
            var templateRepositoryMock = new Mock<ITemplateRepository>();
            var mapperMock = new Mock<IMapper>();
            var templateService = new TemplateService(templateRepositoryMock.Object, mapperMock.Object);

            var exception = await Assert.ThrowsAsync<DomainException>(
                () => templateService.CreateAsync(id, versionId, userId,templateName,content));

            templateRepositoryMock.Verify(x => x.AddAsync(It.IsAny<Template>()), Times.Never);
            exception.Code.Should().Be("invalid_name");
        }

        [Fact]
        public async Task CreateAsync_TemplateContentIsEmpty_ThrowException()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var versionId = Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = Guid.Parse("d1c5463d-012a-4ab5-bdfc-f99ad37b5d00");
            var templateName = "Foo template";
            var content = string.Empty;
            
            var templateRepositoryMock = new Mock<ITemplateRepository>();
            var mapperMock = new Mock<IMapper>();
            var templateService = new TemplateService(templateRepositoryMock.Object, mapperMock.Object);

            var exception = await Assert.ThrowsAsync<DomainException>(
                () => templateService.CreateAsync(id, versionId, userId,templateName,content));

            templateRepositoryMock.Verify(x => x.AddAsync(It.IsAny<Template>()), Times.Never);
            exception.Code.Should().Be("empty_content");
        }

        [Fact]
        public async Task CreateAsync_TemplateParametersAreGood_ReturnsZero()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var versionId = Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = Guid.Parse("d1c5463d-012a-4ab5-bdfc-f99ad37b5d00");
            var templateName = "Foo template";
            var content = "{\"foo\" : \"bar\"}";
            
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
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var versionId = Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = Guid.Parse("d1c5463d-012a-4ab5-bdfc-f99ad37b5d00");
            var templateName = "Foo template";
            var content = "{\"foo\" : \"bar\"}";
            
            var templateRepositoryMock = new Mock<ITemplateRepository>();
            templateRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(value: null);
            var mapperMock = new Mock<IMapper>();
            var templateService = new TemplateService(templateRepositoryMock.Object, mapperMock.Object);

            var exception = await Assert.ThrowsAsync<ServiceException>(
                () => templateService.UpdateAsync(id, versionId, userId,templateName,content));

            templateRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<Template>()), Times.Never);
            exception.Code.Should().Be("template_not_found");
        }

        [Fact]
        public async Task UpdateAsync_TemplateNameIsEmpty_ThrowException()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var versionId = Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = Guid.Parse("d1c5463d-012a-4ab5-bdfc-f99ad37b5d00");
            var templateName = string.Empty;
            var content = "{\"foo\" : \"bar\"}";
            
            var templateRepositoryMock = new Mock<ITemplateRepository>();
            templateRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new Template());

            var mapperMock = new Mock<IMapper>();
            var templateService = new TemplateService(templateRepositoryMock.Object, mapperMock.Object);

            var exception = await Assert.ThrowsAsync<DomainException>(
                () => templateService.UpdateAsync(id, versionId, userId,templateName,content));

            templateRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<Template>()), Times.Never);
            exception.Code.Should().Be("invalid_name");
        }

        [Fact]
        public async Task UpdateAsync_TemplateContentIsEmpty_ThrowException()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var versionId = Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = Guid.Parse("d1c5463d-012a-4ab5-bdfc-f99ad37b5d00");
            var templateName = "Test template";
            var content = string.Empty;
            
            var templateRepositoryMock = new Mock<ITemplateRepository>();
            templateRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new Template());

            var mapperMock = new Mock<IMapper>();
            var templateService = new TemplateService(templateRepositoryMock.Object, mapperMock.Object);

            var exception = await Assert.ThrowsAsync<DomainException>(
                () => templateService.UpdateAsync(id, versionId, userId,templateName,content));

            templateRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<Template>()), Times.Never);
            exception.Code.Should().Be("empty_content");
        }

        [Fact]
        public async Task UpdateAsync_TemplateParametersAreGood_ReturnsZero()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var versionId = Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = Guid.Parse("d1c5463d-012a-4ab5-bdfc-f99ad37b5d00");
            var templateName = "Test template";
            var content = "{\"foo\" : \"bar\"}";
            
            var templateRepositoryMock = new Mock<ITemplateRepository>();
            templateRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new Template());

            var mapperMock = new Mock<IMapper>();
            var templateService = new TemplateService(templateRepositoryMock.Object, mapperMock.Object);

            var result = await templateService.UpdateAsync(id, versionId, userId,templateName,content);

            templateRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<Template>()), Times.Once);
            result.Should().Be(0);
        }

        [Fact]
        public async Task GetAsync_TemplateDoesNotExists_ThrowException()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            
            var templateRepositoryMock = new Mock<ITemplateRepository>();
            templateRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(value: null);

            var mapperMock = new Mock<IMapper>();
            var templateService = new TemplateService(templateRepositoryMock.Object, mapperMock.Object);

            var exception = await Assert.ThrowsAsync<ServiceException>(
                () => templateService.GetAsync(id));

            templateRepositoryMock.Verify(x => x.GetAsync(It.IsAny<Guid>()), Times.Once);
            exception.Code.Should().Be("template_not_found");
        }

        [Fact]
        public async Task GetAsync_TemplateExistsAndItShouldBeReturned_ReturnsDto()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");

            var templateRepositoryMock = new Mock<ITemplateRepository>();
            templateRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new Template() { Content = "{\"foo\" : \"bar\"}" });

            var config = new MapperConfiguration(opts =>
            {
                opts.CreateMap<Template, TemplateDetailsDto>()
                    .ForMember(x => x.Content, o => o.MapFrom(src => JObject.Parse(src.Content)));
            });
            var mapperMock = config.CreateMapper();

            var templateService = new TemplateService(templateRepositoryMock.Object, mapperMock);

            var result = await templateService.GetAsync(id);

            templateRepositoryMock.Verify(x => x.GetAsync(It.IsAny<Guid>()), Times.Once);
            result.Should().BeOfType<TemplateDetailsDto>();
            result.Content.Should().Equal(JObject.Parse("{\"foo\" : \"bar\"}"));
        }

        [Fact]
        public async Task DeleteAsync_TemplateDoesNotExists_ThrowsException()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            
            var mapperMock = new Mock<IMapper>();
            var templateRepositoryMock = new Mock<ITemplateRepository>();
            templateRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(value: null);

            var templateService = new TemplateService(templateRepositoryMock.Object, mapperMock.Object);

            var exception = await Assert.ThrowsAsync<ServiceException>(
                () => templateService.DeleteAsync(id));

            templateRepositoryMock.Verify(x => x.DeleteAsync(It.IsAny<Guid>()), Times.Never);
            exception.Code.Should().Be("template_not_found");
        }

        [Fact]
        public async Task DeleteAsync_TemplateWithGivenIdExistsAndItShouldBeDeleted_ReturnsZero()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");

            var mapperMock = new Mock<IMapper>();
            var templateRepositoryMock = new Mock<ITemplateRepository>();
            templateRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new Template());

            var templateService = new TemplateService(templateRepositoryMock.Object, mapperMock.Object);

            var result = await templateService.DeleteAsync(id);

            templateRepositoryMock.Verify(x => x.GetAsync(It.IsAny<Guid>()), Times.Once);
            result.Should().Be(0);
        }
    }
}