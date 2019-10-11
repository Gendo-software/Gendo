using System.Threading.Tasks;
using RabbitMq;

namespace Messages
{
    public interface IEventHandler<in TEvent> where TEvent : IEvent
    {
        Task HandleAsync(TEvent @event);
    }
}