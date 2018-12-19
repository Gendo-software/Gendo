using System;
using System.Threading.Tasks;
using AutoMapper;
using Docaut.Core.Domain;
using Docaut.Core.Repositories;
using Docaut.Infrastructure.DTO;
using Docaut.Infrastructure.Services;
using Docaut.Infrastructure.Services.Interfaces;
using FluentAssertions;
using Moq;
using Xunit;
using Xunit.Extensions;

namespace Docaut.Tests.Services
{
    public class UserServiceTests
    {
        [Fact]
        public async Task CreateUser_UserShouldBeCreated_TestPassed()
        {
            var userRepository = new Mock<IUserRepository>();
            var mapper = new Mock<IMapper>();
            var encrypter = new Mock<IEncrypter>();
            var userService = new UserService(userRepository.Object, mapper.Object, encrypter.Object);

            await userService.CreateAsync(new Guid("0b214bc2-0f6e-4c25-978f-a056c1aaadf3"), "email@email.com", "secret", "John", "Doe");

            userRepository.Verify(x => x.GetAsync(It.IsAny<string>()), Times.Once);
            userRepository.Verify(x => x.AddAsync(It.IsAny<User>()), Times.Once);
        }

        [Fact]
        public async Task CreateUser_UserWithPassedEmailAlreadyExists_ThrowsException()
        {
            string existingEmail = "email@email.com";
            var existingUser = new User(new Guid("0b214bc2-0f6e-4c25-978f-a056c1aaadf3"), existingEmail, "secret", "John", "Doe");
            var userRepository = new Mock<IUserRepository>();
            userRepository.Setup(x => x.GetAsync(existingEmail))
                .ReturnsAsync(existingUser);

            var mapper = new Mock<IMapper>();
            var encrypter = new Mock<IEncrypter>();
            var userService = new UserService(userRepository.Object, mapper.Object, encrypter.Object);
            
            await Assert.ThrowsAsync<Exception>(() => userService.CreateAsync(new Guid("8c3910f4-11fa-44b3-b691-2e5e517768f9"), existingEmail, "secret", "John", "Kowalski")); 
            userRepository.Verify(x => x.AddAsync(It.IsAny<User>()), Times.Never);
        }

        [Fact]
        public async Task GetUser_UserWithEmailExists_TestPassed()
        {
            string email = "email@email.com";
            var existingUser = new User(new Guid("0b214bc2-0f6e-4c25-978f-a056c1aaadf3"), email, "secret", "John", "Doe");  
            var userDto = new UserDto() 
            { 
                Id = new Guid("0b214bc2-0f6e-4c25-978f-a056c1aaadf3"),
                Email = "email@email.com",
                Password = "secret",
                Name = "John",
                Surname = "Doe"
            };

            var userRepository = new Mock<IUserRepository>();
            userRepository.Setup(x => x.GetAsync(email))
                .ReturnsAsync(existingUser);

            var mapper = new Mock<IMapper>();
            mapper.Setup(x => x.Map<User, UserDto>(It.IsAny<User>()))
                .Returns(userDto); 

            var encrypter = new Mock<IEncrypter>();
            var userService = new UserService(userRepository.Object, mapper.Object, encrypter.Object);
            var result = await userService.GetAsync(email);

            result.Should().NotBeNull();
            result.Should().BeOfType<UserDto>();
            userRepository.Verify(x=> x.GetAsync(It.IsAny<string>()), Times.Once);
            mapper.Verify(x => x.Map<User, UserDto>(It.IsAny<User>()), Times.Once);
        }
    }
}