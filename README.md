# Gendo

The main purpose of the application is to learn about new tools and their practical use. The whole application acts as a **demo project**.

Gendo is a simple web application that is used to easily create documents using templates. The system allows you to define your own templates using the [markdown](https://guides.github.com/features/mastering-markdown/) editor. A big advantage of the feature is the ability to define your own dynamic fields that will be used to fill in documents. Templates can be used repeatedly, which reduces the time needed to create documents. The user creating the document only needs to complete the fields in the form where they are additionally validated, so the user does not have to worry about the correctness of filling out the form.

## Architecture

The system consists of [microservices](https://martinfowler.com/articles/microservices.html) that provide small, specific functionality. The web application uses microservices to support user functionality on the frontend (UI). The services operate independently of each other and use a message broker (``RabbitMQ`` in this case) to communicate with each other - for example, to send events. The services are designed in such a way that horizontal scaling is possible.
 
## What we use?
We used many tools and technologies to build the application. Among them can be mentioned:
- [RESTful API](https://restfulapi.net/) with [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-3.0)
- Integration with the [auth0](https://auth0.com/) service
- [JWT](https://jwt.io/) for authentication and authorization
- [CQRS](https://martinfowler.com/bliki/CQRS.html), Commands and Events handlers
- [Domain Driven Design](https://martinfowler.com/tags/domain%20driven%20design.html) approach
- [Grafana](https://www.app-metrics.io/) for monitoring applications health with [Influx](https://www.influxdata.com/)
- [Docker](https://www.docker.com/) to dockerize applications
- [RabbitMQ](https://www.rabbitmq.com/) as a message broker
- [MongoDB](https://www.mongodb.com/) for storing data
- System is defined using [docker-compose](https://docs.docker.com/compose)
- [Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html) with [xUnit](https://xunit.net/), [Moq](https://www.nuget.org/packages/Moq/) and [Fluent Assertions](https://fluentassertions.com/)

## Usage

You can use the installed services to prepare the environment or you can use a docker (recommended)

The ``docker-compose.yml`` file can be found [here](https://github.com/Gendo-sotfware/Gendo/blob/master/scripts/docker-compose.yml), which includes custom network and volumes. To start it, execute ``docker-compose up -d``(-d will run containers in the background).

Moreover, in the scripts directory, you can find [docker-build.ps1](https://github.com/Gendo-sotfware/Gendo/blob/master/scripts/docker-build.ps1), [docker-run.ps1](https://github.com/Gendo-sotfware/Gendo/blob/master/scripts/docker-run.ps1) or [docker-stop.ps1](https://github.com/Gendo-sotfware/Gendo/blob/master/scripts/docker-stop.ps1) scripts that might be helpful for the repeating tasks with docker containers.
