using System.Threading.Tasks;
using Templates.Infrastructure.Messages;

namespace Templates.Infrastructure.RabbitMq
{
    public interface IBusPublisher
    {
        Task PublishAsync<TEvent>(TEvent @event) where TEvent : IEvent;
    }
}