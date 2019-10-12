using System;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using Newtonsoft.Json.Linq;
using Services.Interfaces;
using Xunit;
using Handlers.Documents;
using Messages.Commands;
using Repositories.Interfaces;
using Models;
using Services.Exceptions;

namespace Controllers
{
    public class CreateDocumentHandlerTests
    {
        [Fact]
        public async Task HandleAsync_TemplateNotFound_ThrowsException()
        {
            var command = new CreateDocument() { 
                TemplateId = Guid.Parse("e28d59e8-1805-478a-98dd-0f51a427daf6"),
                Id = Guid.Parse("1c3d42b5-7bcc-4b14-8f62-722b4b9d2931"),
                UserId = "auth0|5c81a3686d3d732e6aa9e88f",
                Content = JObject.Parse("{\"foo\" : \"bar\"}")
            };
            var documentServiceMock = new Mock<IDocumentService>();
            var templateRepositoryMock = new Mock<ITemplateRepository>();
            templateRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(value: null);

            var createDocumentHandler = new CreateDocumentHandler(templateRepositoryMock.Object, documentServiceMock.Object);

            var exception = await Assert.ThrowsAsync<ServiceException>(() => createDocumentHandler.HandleAsync(command));
            exception.Code.Should().Be("template_not_found");
        }

        [Fact]
        public async Task HandleAsync_TemplateFoundButVersionIsOutOfDate_ThrowsException()
        {
            var templateId = Guid.Parse("e28d59e8-1805-478a-98dd-0f51a427daf6");
            var command = new CreateDocument() { 
                TemplateId = templateId,
                Id = Guid.Parse("1c3d42b5-7bcc-4b14-8f62-722b4b9d2931"), // old/bad version is given
                UserId = "auth0|5c81a3686d3d732e6aa9e88f",
                Content = JObject.Parse("{\"foo\" : \"bar\"}")
            };
            var documentServiceMock = new Mock<IDocumentService>();
            var templateRepositoryMock = new Mock<ITemplateRepository>();
            templateRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new Template(templateId, Guid.Parse("a84a4ff8-76ec-4222-ae5a-a111b33a82e0"))); //current version

            var createDocumentHandler = new CreateDocumentHandler(templateRepositoryMock.Object, documentServiceMock.Object);

            var exception = await Assert.ThrowsAsync<ServiceException>(() => createDocumentHandler.HandleAsync(command));
            exception.Code.Should().Be("template_out_of_date");
        }

        [Theory]
        [InlineData("00000000-0000-0000-0000-000000000000", 1)]
        [InlineData("ae674f86-1175-4699-b5b9-702e1ef64d79", 0)]
        public async Task HandleAsync_CheckDocumentIdIsItEmpty_MethodReturnOne(string id, int expectedResult)
        {
            var templateId = Guid.Parse("e28d59e8-1805-478a-98dd-0f51a427daf6");
            var command = new CreateDocument() { 
                TemplateId = templateId,
                Id = Guid.Parse(id),
                UserId = "auth0|5c81a3686d3d732e6aa9e88f",
                Content = JObject.Parse("{\"foo\" : \"bar\"}")
            };
            var documentServiceMock = new Mock<IDocumentService>();
            var templateRepositoryMock = new Mock<ITemplateRepository>();
            templateRepositoryMock.Setup(x => x.GetAsync(It.IsAny<Guid>()))
                .ReturnsAsync(new Template() { Id = templateId });
            var createDocumentHandler = new CreateDocumentHandler(templateRepositoryMock.Object, documentServiceMock.Object);

            var result = await createDocumentHandler.HandleAsync(command);

            result.Should().Be(expectedResult);
        }
    }
}