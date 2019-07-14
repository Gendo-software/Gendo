using System;
using System.Collections.Generic;
using Templates.Infrastructure.DTO.Templates;

namespace Templates.Tests
{
    public class TestData
    {
        public static IEnumerable<object[]> TemplatesDto()
        {
            yield return new object[]
            {
                new List<TemplateDto>() {
                    new TemplateDto() { 
                        Id = System.Guid.Parse("ae674f86-1175-4699-b5b9-702e1ef64d79"),
                        UserId = System.Guid.Parse("d1c5463d-012a-4ab5-bdfc-f99ad37b5d00"),
                        Name = "Test template",
                        DuringEditing = false,
                        CreatedAt = new DateTime(2019,7,14,15,49,0)
                    },
                    new TemplateDto() { 
                        Id = System.Guid.Parse("08663273-4482-4712-94b1-1b1d3f2b051e"),
                        UserId = System.Guid.Parse("88b4be57-986b-41b5-8943-b858a8f2e602"),
                        Name = "Another template",
                        DuringEditing = false,
                        CreatedAt = new DateTime(2019,7,14,15,55,0)
                    }
                }
            };
        }
    }
}