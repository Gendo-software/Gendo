using System.Threading.Tasks;
using Messages;

namespace RabbitMq
{
    public interface IBusPublisher
    {
        Task PublishAsync<TEvent>(TEvent @event) where TEvent : IEvent;
    }
}