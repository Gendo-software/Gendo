using System;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using Domain.Exceptions;
using Services;
using FluentAssertions;
using Moq;
using Newtonsoft.Json.Linq;
using Repositories.Interfaces;
using Xunit;
using Services.Exceptions;
using DTO.Documents;

namespace Documents.Tests.Controllers
{
    public class DocumentsServiceTests
    {
        [Fact]
        public async Task CreateAsync_DocumentNameIsEmpty_ThrowException()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var templateVersionId = Guid.Parse("32aab85e-b7cd-492d-b550-58f38575912b");
            var versionId = Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = "auth0|5c81a3686d3d732e6aa9e88f";
            var documentName = string.Empty;
            var content = "{\"foo\" : \"bar\"}";
            
            var documentRepositoryMock = new Mock<IDocumentRepository>();
            var mapperMock = new Mock<IMapper>();
            var documentService = new DocumentService(documentRepositoryMock.Object, mapperMock.Object);

            var exception = await Assert.ThrowsAsync<DomainException>(
                () => documentService.CreateAsync(id, templateVersionId, versionId, documentName, userId, content));

            documentRepositoryMock.Verify(x => x.AddAsync(It.IsAny<Document>()), Times.Never);
            exception.Code.Should().Be("invalid_name");
        }

        [Fact]
        public async Task CreateAsync_DocumentContentIsEmpty_ThrowException()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var templateVersionId = Guid.Parse("32aab85e-b7cd-492d-b550-58f38575912b");
            var versionId = Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = "auth0|5c81a3686d3d732e6aa9e88f";
            var documentName = "Foo Document";
            var content = string.Empty;
            
            var documentRepositoryMock = new Mock<IDocumentRepository>();
            var mapperMock = new Mock<IMapper>();
            var documentService = new DocumentService(documentRepositoryMock.Object, mapperMock.Object);

            var exception = await Assert.ThrowsAsync<DomainException>(
                () => documentService.CreateAsync(id, templateVersionId, versionId, documentName, userId, content));

            documentRepositoryMock.Verify(x => x.AddAsync(It.IsAny<Document>()), Times.Never);
            exception.Code.Should().Be("empty_content");
        }

        [Fact]
        public async Task CreateAsync_UserIdIsEmpty_ThrowException()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var templateVersionId = Guid.Parse("32aab85e-b7cd-492d-b550-58f38575912b");
            var versionId = Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = string.Empty;
            var documentName = "Foo Document";
            var content = "{\"foo\" : \"bar\"}";
            
            var documentRepositoryMock = new Mock<IDocumentRepository>();
            var mapperMock = new Mock<IMapper>();
            var documentService = new DocumentService(documentRepositoryMock.Object, mapperMock.Object);

            var exception = await Assert.ThrowsAsync<DomainException>(
                () => documentService.CreateAsync(id, templateVersionId, versionId, documentName, userId, content));

            documentRepositoryMock.Verify(x => x.AddAsync(It.IsAny<Document>()), Times.Never);
            exception.Code.Should().Be("empty_user_id");
        }

        [Fact]
        public async Task CreateAsync_DocumentParametersAreGood_ReturnsZero()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var templateVersionId = Guid.Parse("32aab85e-b7cd-492d-b550-58f38575912b");
            var versionId = Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = "auth0|5c81a3686d3d732e6aa9e88f";
            var documentName = "Foo Document";
            var content = "{\"foo\" : \"bar\"}";
            
            var documentRepositoryMock = new Mock<IDocumentRepository>();
            var mapperMock = new Mock<IMapper>();
            var documentService = new DocumentService(documentRepositoryMock.Object, mapperMock.Object);

            var result = await documentService.CreateAsync(id, templateVersionId, versionId, documentName, userId, content);
            documentRepositoryMock.Verify(x => x.AddAsync(It.IsAny<Document>()), Times.Once);
            result.Should().Be(0);
        }

        [Fact]
        public async Task UpdateAsync_DocumentWithGivenIdDoesNotExists_ThrowException()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var templateVersionId = Guid.Parse("32aab85e-b7cd-492d-b550-58f38575912b");
            var versionId = Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = "auth0|5c81a3686d3d732e6aa9e88f";
            var documentName = "Foo Document";
            var content = "{\"foo\" : \"bar\"}";
            
            var documentRepositoryMock = new Mock<IDocumentRepository>();
            documentRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(value: null);
            var mapperMock = new Mock<IMapper>();
            var documentService = new DocumentService(documentRepositoryMock.Object, mapperMock.Object);

            var exception = await Assert.ThrowsAsync<ServiceException>(
                () => documentService.UpdateAsync(id, versionId, userId, documentName, content));

            documentRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<Document>()), Times.Never);
            exception.Code.Should().Be("document_not_found");
        }

        [Fact]
        public async Task UpdateAsync_DocumentNameIsEmpty_ThrowException()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var templateVersionId = Guid.Parse("32aab85e-b7cd-492d-b550-58f38575912b");
            var versionId = Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = "auth0|5c81a3686d3d732e6aa9e88f";
            var documentName = string.Empty;
            var content = "{\"foo\" : \"bar\"}";
            
            var documentRepositoryMock = new Mock<IDocumentRepository>();
            documentRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new Document());

            var mapperMock = new Mock<IMapper>();
            var documentService = new DocumentService(documentRepositoryMock.Object, mapperMock.Object);

            var exception = await Assert.ThrowsAsync<DomainException>(
                () => documentService.UpdateAsync(id, versionId, documentName, userId, content));

            documentRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<Document>()), Times.Never);
            exception.Code.Should().Be("invalid_name");
        }

        [Fact]
        public async Task UpdateAsync_DocumentContentIsEmpty_ThrowException()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var templateVersionId = Guid.Parse("32aab85e-b7cd-492d-b550-58f38575912b");
            var versionId = Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = "auth0|5c81a3686d3d732e6aa9e88f";
            var documentName = "Test Document";
            var content = string.Empty;
            
            var documentRepositoryMock = new Mock<IDocumentRepository>();
            documentRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new Document());

            var mapperMock = new Mock<IMapper>();
            var documentService = new DocumentService(documentRepositoryMock.Object, mapperMock.Object);

            var exception = await Assert.ThrowsAsync<DomainException>(
                () => documentService.UpdateAsync(id, versionId, documentName, userId, content));

            documentRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<Document>()), Times.Never);
            exception.Code.Should().Be("empty_content");
        }

        [Fact]
        public async Task UpdateAsync_UserIdIsEmpty_ThrowException()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var templateVersionId = Guid.Parse("32aab85e-b7cd-492d-b550-58f38575912b");
            var versionId = Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = string.Empty;
            var documentName = "Test Document";
            var content = "{\"foo\" : \"bar\"}";
            
            var documentRepositoryMock = new Mock<IDocumentRepository>();
            documentRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new Document());

            var mapperMock = new Mock<IMapper>();
            var documentService = new DocumentService(documentRepositoryMock.Object, mapperMock.Object);

            var exception = await Assert.ThrowsAsync<DomainException>(
                () => documentService.UpdateAsync(id, versionId, documentName, userId, content));

            documentRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<Document>()), Times.Never);
            exception.Code.Should().Be("empty_user_id");
        }

        [Fact]
        public async Task UpdateAsync_DocumentParametersAreGood_ReturnsZero()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            var templateVersionId = Guid.Parse("32aab85e-b7cd-492d-b550-58f38575912b");
            var versionId = Guid.Parse("3103f442-ccbe-437e-9eac-52798b60d340");
            var userId = "auth0|5c81a3686d3d732e6aa9e88f";
            var documentName = "Test Document";
            var content = "{\"foo\" : \"bar\"}";
            
            var documentRepositoryMock = new Mock<IDocumentRepository>();
            documentRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new Document());

            var mapperMock = new Mock<IMapper>();
            var documentService = new DocumentService(documentRepositoryMock.Object, mapperMock.Object);

            var result = await documentService.UpdateAsync(id, versionId, documentName, userId, content);

            documentRepositoryMock.Verify(x => x.UpdateAsync(It.IsAny<Document>()), Times.Once);
            result.Should().Be(0);
        }

        [Fact]
        public async Task GetAsync_DocumentDoesNotExists_ThrowException()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            
            var documentRepositoryMock = new Mock<IDocumentRepository>();
            documentRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(value: null);

            var mapperMock = new Mock<IMapper>();
            var documentService = new DocumentService(documentRepositoryMock.Object, mapperMock.Object);

            var exception = await Assert.ThrowsAsync<ServiceException>(
                () => documentService.GetAsync(id));

            documentRepositoryMock.Verify(x => x.GetAsync(It.IsAny<Guid>()), Times.Once);
            exception.Code.Should().Be("document_not_found");
        }

        [Fact]
        public async Task GetAsync_DocumentExistsAndItShouldBeReturned_ReturnsDto()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");

            var documentRepositoryMock = new Mock<IDocumentRepository>();
            documentRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new Document() { Content = "{\"foo\" : \"bar\"}" });

            var config = new MapperConfiguration(opts =>
            {
                opts.CreateMap<Document, DocumentDetailsDto>()
                    .ForMember(x => x.Content, o => o.MapFrom(src => JObject.Parse(src.Content)));
            });
            var mapperMock = config.CreateMapper();

            var documentService = new DocumentService(documentRepositoryMock.Object, mapperMock);

            var result = await documentService.GetAsync(id);

            documentRepositoryMock.Verify(x => x.GetAsync(It.IsAny<Guid>()), Times.Once);
            result.Should().BeOfType<DocumentDetailsDto>();
            result.Content.Should().Equal(JObject.Parse("{\"foo\" : \"bar\"}"));
        }

        [Fact]
        public async Task DeleteAsync_DocumentDoesNotExists_ThrowsException()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");
            
            var mapperMock = new Mock<IMapper>();
            var documentRepositoryMock = new Mock<IDocumentRepository>();
            documentRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(value: null);

            var documentService = new DocumentService(documentRepositoryMock.Object, mapperMock.Object);

            var exception = await Assert.ThrowsAsync<ServiceException>(
                () => documentService.DeleteAsync(id));

            documentRepositoryMock.Verify(x => x.DeleteAsync(It.IsAny<Guid>()), Times.Never);
            exception.Code.Should().Be("document_not_found");
        }

        [Fact]
        public async Task DeleteAsync_DocumentWithGivenIdExistsAndItShouldBeDeleted_ReturnsZero()
        {
            var id = Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79");

            var mapperMock = new Mock<IMapper>();
            var documentRepositoryMock = new Mock<IDocumentRepository>();
            documentRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new Document());

            var documentService = new DocumentService(documentRepositoryMock.Object, mapperMock.Object);

            var result = await documentService.DeleteAsync(id);

            documentRepositoryMock.Verify(x => x.GetAsync(It.IsAny<Guid>()), Times.Once);
            result.Should().Be(0);
        }
    }
}