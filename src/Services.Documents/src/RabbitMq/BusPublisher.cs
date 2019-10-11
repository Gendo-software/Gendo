using System.Threading.Tasks;
using Messages;
using RawRabbit;
using RawRabbit.Enrichers.MessageContext;

namespace RabbitMq
{
    public class BusPublisher : IBusPublisher
    {
        private readonly IBusClient _busClient;

        public BusPublisher(IBusClient busClient)
        {
            _busClient = busClient;
        }

        public async Task PublishAsync<TEvent>(TEvent @event) where TEvent : IEvent
            => await _busClient.PublishAsync(@event);
    }
}