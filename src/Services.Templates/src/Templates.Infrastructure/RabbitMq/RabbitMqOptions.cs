using RawRabbit.Configuration;

namespace Templates.Infrastructure.RabbitMq
{
    public class RabbitMqOptions : RawRabbitConfiguration
    {
        public string Namespace { get; set; }
    }
}