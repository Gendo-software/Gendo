using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using DTO.Documents;
using Services.Exceptions;
using Services.Interfaces;
using Xunit;
using Documents.Tests;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Messages.Commands;
using Messages;

namespace Controllers
{
    public class DocumentsControllerTests
    {
        [Fact]
        public async Task Post_DocumentDoesNotExistsAndItShouldBeCreated_MethodReturn201()
        {
            var command = new CreateDocument() { };
            var documentserviceMock = new Mock<IDocumentService>();
            var commandDispatcherMock = new Mock<ICommandDispatcher>();

            var documentsController = new DocumentsController(commandDispatcherMock.Object, documentserviceMock.Object);

            var response = await documentsController.Post(command);

            response.Should().NotBeNull();
            response.Should().BeOfType<CreatedResult>();
            (response as ObjectResult).StatusCode.Should().Be(201);
        }

        [Theory]
        [MemberData(nameof(TestData.DocumentsDto), MemberType = typeof(TestData))]
        public async Task GetByUserId_DocumentExistsAndShouldBeReturned_MethodReturnJson(List<DocumentDto> data)
        {
            IList<Claim> claimCollection = new List<Claim>
            {
                new Claim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier", 
                    "auth0|d732e6aa9e88f5c81a3686d3")
            };
            var identityMock = new Mock<ClaimsIdentity>();
            identityMock.Setup(x => x.Claims)
                .Returns(claimCollection);

            var moqContext = new Mock<HttpContext>();
            moqContext.Setup(x=>x.User.Identity).Returns(identityMock.Object);

            var userId = "auth0|d732e6aa9e88f5c81a3686d3";
            var command = new CreateDocument() { };
            var documentserviceMock = new Mock<IDocumentService>();
            documentserviceMock.Setup(x => x.GetAsync(userId))
                .ReturnsAsync(data);
            var commandDispatcherMock = new Mock<ICommandDispatcher>();

            var documentsController = new DocumentsController(commandDispatcherMock.Object, documentserviceMock.Object);

            documentsController.ControllerContext.HttpContext = moqContext.Object;
            
            var response = await documentsController.GetByUserId(userId);

            response.Should().NotBeNull();
            response.Should().BeOfType<JsonResult>();
        }

        [Fact]
        public async Task GetByUserId_UserIdFromTokenAndParameterAreDifferent_MethodReturn403()
        {
            IList<Claim> claimCollection = new List<Claim>
            {
                new Claim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier", 
                    "auth0|d732e6aa9e88f5c81a3686d3")
            };
            var identityMock = new Mock<ClaimsIdentity>();
            identityMock.Setup(x => x.Claims)
                .Returns(claimCollection);

            var moqContext = new Mock<HttpContext>();
            moqContext.Setup(x=>x.User.Identity).Returns(identityMock.Object);

            var userId = "auth0|e88f5c81a3686d3d732e6aa9";
            var command = new CreateDocument() { };
            var documentserviceMock = new Mock<IDocumentService>();
  
            var commandDispatcherMock = new Mock<ICommandDispatcher>();

            var documentsController = new DocumentsController(commandDispatcherMock.Object, documentserviceMock.Object);

            documentsController.ControllerContext.HttpContext = moqContext.Object;

            var response = await documentsController.GetByUserId(userId);

            response.Should().NotBeNull();
            response.Should().BeOfType<ForbidResult>();
        }

        [Fact]
        public async Task Delete_DocumentDoesNotExists_ThrowException()
        {
            var id = Guid.Parse("cc846e51-132c-4a6a-bc96-c032491e383c");
            var documentserviceMock = new Mock<IDocumentService>();
            var commandDispatcherMock = new Mock<ICommandDispatcher>();
            commandDispatcherMock.Setup(x => x.DispatchAsync<ICommand>(It.IsAny<ICommand>()))
                .Throws(new ServiceException(ErrorCodes.DocumentNotFound));

            var documentsController = new DocumentsController(commandDispatcherMock.Object, documentserviceMock.Object);

            var exception = await Assert.ThrowsAsync<ServiceException>(() => documentsController.Delete(id));
            exception.Code.Should().Be("document_not_found");
        }
    }
}