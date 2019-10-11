using System;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using Newtonsoft.Json.Linq;
using Templates.Infrastructure.Handlers.Users;
using Templates.Infrastructure.Messages.Templates;
using Templates.Infrastructure.RabbitMq;
using Templates.Infrastructure.Services.Interfaces;
using Xunit;

namespace Templates.Tests.Controllers
{
    public class CreateTemplateHandlerTests
    {
        [Theory]
        [InlineData("00000000-0000-0000-0000-000000000000", 1)]
        [InlineData("ae674f86-1175-4699-b5b9-702e1ef64d79", 0)]
        public async Task HandleAsync_TemplateIdIsEmpty_MethodReturnOne(string id, int expectedResult)
        {
            var command = new CreateTemplate() { 
                Id = Guid.Parse(id),
                UserId = "auth0|5c81a3686d3d732e6aa9e88f",
                Name = "Foo template",
                Content = JObject.Parse("{\"foo\" : \"bar\"}")
            };
            var templateServiceMock = new Mock<ITemplateService>();
            var busPublisherMock = new Mock<IBusPublisher>();
            var createTemplateHandler = new CreateTemplateHandler(busPublisherMock.Object, templateServiceMock.Object);

            var result = await createTemplateHandler.HandleAsync(command);

            result.Should().Be(expectedResult);
        }
    }
}