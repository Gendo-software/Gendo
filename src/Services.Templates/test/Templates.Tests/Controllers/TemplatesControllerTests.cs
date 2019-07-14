using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Templates.Api.Controllers;
using Templates.Infrastructure.Commands;
using Templates.Infrastructure.Commands.Templates;
using Templates.Infrastructure.DTO.Templates;
using Templates.Infrastructure.Services.Exceptions;
using Templates.Infrastructure.Services.Interfaces;
using Xunit;

namespace Templates.Tests.Controllers
{
    public class TemplatesControllerTests
    {
        [Fact]
        public async Task Post_TemplateDoesNotExistsAndItShouldBeCreated_MethodReturn201()
        {
            var command = new CreateTemplate() { };
            var templateServiceMock = new Mock<ITemplateService>();
            var commandDispatcherMock = new Mock<ICommandDispatcher>();

            var templatesController = new TemplatesController(commandDispatcherMock.Object, templateServiceMock.Object);

            var response = await templatesController.Post(command);

            response.Should().NotBeNull();
            response.Should().BeOfType<CreatedResult>();
            (response as ObjectResult).StatusCode.Should().Be(201);
        }

        [Theory]
        [MemberData(nameof(TestData.TemplatesDto), MemberType = typeof(TestData))]
        public async Task Get_TemplateExistsAndShouldBeReturned_MethodReturnJson(List<TemplateDto> data)
        {
            var command = new CreateTemplate() { };
            var templateServiceMock = new Mock<ITemplateService>();
            templateServiceMock.Setup(x => x.GetAsync())
                .ReturnsAsync(data);
            var commandDispatcherMock = new Mock<ICommandDispatcher>();

            var templatesController = new TemplatesController(commandDispatcherMock.Object, templateServiceMock.Object);

            var response = await templatesController.Get();

            response.Should().NotBeNull();
            response.Should().BeOfType<JsonResult>();
        }

        [Fact]
        public async Task Delete_TemplateDoesNotExists_ThrowException()
        {
            var id = Guid.Parse("cc846e51-132c-4a6a-bc96-c032491e383c");
            var templateServiceMock = new Mock<ITemplateService>();
            var commandDispatcherMock = new Mock<ICommandDispatcher>();
            commandDispatcherMock.Setup(x => x.DispatchAsync<ICommand>(It.IsAny<ICommand>()))
                .Throws(new ServiceException(ErrorCodes.TemplateNotFound));

            var templatesController = new TemplatesController(commandDispatcherMock.Object, templateServiceMock.Object);

            var exception = await Assert.ThrowsAsync<ServiceException>(() => templatesController.Delete(id));
            exception.Code.Should().Be("template_not_found");
        }
    }
}