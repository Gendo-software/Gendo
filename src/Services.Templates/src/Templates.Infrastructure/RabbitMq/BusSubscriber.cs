using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using RawRabbit;
using RawRabbit.Common;
using Templates.Infrastructure.Messages;

namespace Templates.Infrastructure.RabbitMq
{
    public class BusSubscriber : IBusSubscriber
    {
        private readonly IBusClient _busClient;
        private readonly IServiceProvider _serviceProvider;        

        public BusSubscriber(IApplicationBuilder app)
        {
            _serviceProvider = app.ApplicationServices.GetService<IServiceProvider>();
            _busClient = _serviceProvider.GetService<IBusClient>();
            var options = _serviceProvider.GetService<RabbitMqOptions>();
        }

        public IBusSubscriber SubscribeEvent<TEvent>() where TEvent : IEvent
        {
            _busClient.SubscribeAsync<TEvent>(async (@event) =>
            {
                var eventHandler = _serviceProvider.GetService<IEventHandler<TEvent>>();
                return await TryHandleAsync(@event, () => eventHandler.HandleAsync(@event));
            });
            return this;
        }

        private async Task<Acknowledgement> TryHandleAsync<TMessage>(TMessage message, Func<Task> handle)
        {
            try
            {
                await handle();
                return new Ack();
            }
            catch(Exception ex)
            {
                var messageName = message.GetType().Name;
                throw new Exception($"Unable to handle a message: '{messageName}'");
            }
        }
    }
}