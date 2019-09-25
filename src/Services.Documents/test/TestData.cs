using System;
using System.Collections.Generic;
using DTO.Documents;

namespace Documents.Tests
{
    public class TestData
    {
        public static IEnumerable<object[]> DocumentsDto()
        {
            yield return new object[]
            {
                new List<DocumentDto>() {
                    new DocumentDto() { 
                        Id = System.Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79"),
                        UserId = "auth0|5c81a3686d3d732e6aa9e88f",
                        CreatedAt = new DateTime(2019,7,14,15,49,0)
                    },
                    new DocumentDto() { 
                        Id = System.Guid.Parse("08663273-4482-4712-94b1-1b1d3f2b051e"),
                        UserId = "auth0|5c81a3686d3d732e6aa9e88x",
                        CreatedAt = new DateTime(2019,7,14,15,55,0)
                    }
                }
            };
        }
    }
}