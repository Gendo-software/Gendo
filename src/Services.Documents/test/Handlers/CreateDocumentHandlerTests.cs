using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Newtonsoft.Json.Linq;
using Controllers;
using Commands;
using Commands.Documents;
using DTO.Documents;
using Services.Exceptions;
using Services.Interfaces;
using Xunit;
using Handlers.Documents;

namespace Controllers
{
    public class CreateDocumentHandlerTests
    {
        [Theory]
        [InlineData("00000000-0000-0000-0000-000000000000", 1)]
        [InlineData("ae674f86-1175-4699-b5b9-702e1ef64d79", 0)]
        public async Task HandleAsync_DocumentIdIsEmpty_MethodReturnOne(string id, int expectedResult)
        {
            var command = new CreateDocument() { 
                Id = Guid.Parse(id),
                UserId = "auth0|5c81a3686d3d732e6aa9e88f",
                Content = JObject.Parse("{\"foo\" : \"bar\"}")
            };
            var DocumentserviceMock = new Mock<IDocumentService>();
            var createDocumentHandler = new CreateDocumentHandler(DocumentserviceMock.Object);

            var result = await createDocumentHandler.HandleAsync(command);

            result.Should().Be(expectedResult);
        }
    }
}