using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Controllers;
using Commands;
using Commands.Documents;
using DTO.Documents;
using Services.Exceptions;
using Services.Interfaces;
using Xunit;
using Documents.Tests;

namespace Controllers
{
    public class DocumentsControllerTests
    {
        [Fact]
        public async Task Post_DocumentDoesNotExistsAndItShouldBeCreated_MethodReturn201()
        {
            var command = new CreateDocument() { };
            var DocumentserviceMock = new Mock<IDocumentService>();
            var commandDispatcherMock = new Mock<ICommandDispatcher>();

            var DocumentsController = new DocumentsController(commandDispatcherMock.Object, DocumentserviceMock.Object);

            var response = await DocumentsController.Post(command);

            response.Should().NotBeNull();
            response.Should().BeOfType<CreatedResult>();
            (response as ObjectResult).StatusCode.Should().Be(201);
        }

        [Theory]
        [MemberData(nameof(TestData.DocumentsDto), MemberType = typeof(TestData))]
        public async Task Get_DocumentExistsAndShouldBeReturned_MethodReturnJson(List<DocumentDto> data)
        {
            var command = new CreateDocument() { };
            var DocumentserviceMock = new Mock<IDocumentService>();
            DocumentserviceMock.Setup(x => x.GetAsync())
                .ReturnsAsync(data);
            var commandDispatcherMock = new Mock<ICommandDispatcher>();

            var DocumentsController = new DocumentsController(commandDispatcherMock.Object, DocumentserviceMock.Object);

            var response = await DocumentsController.Get();

            response.Should().NotBeNull();
            response.Should().BeOfType<JsonResult>();
        }

        [Fact]
        public async Task Delete_DocumentDoesNotExists_ThrowException()
        {
            var id = Guid.Parse("cc846e51-132c-4a6a-bc96-c032491e383c");
            var DocumentserviceMock = new Mock<IDocumentService>();
            var commandDispatcherMock = new Mock<ICommandDispatcher>();
            commandDispatcherMock.Setup(x => x.DispatchAsync<ICommand>(It.IsAny<ICommand>()))
                .Throws(new ServiceException(ErrorCodes.DocumentNotFound));

            var DocumentsController = new DocumentsController(commandDispatcherMock.Object, DocumentserviceMock.Object);

            var exception = await Assert.ThrowsAsync<ServiceException>(() => DocumentsController.Delete(id));
            exception.Code.Should().Be("document_not_found");
        }
    }
}