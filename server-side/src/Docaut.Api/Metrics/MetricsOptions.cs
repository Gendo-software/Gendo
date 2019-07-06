using System.Collections.Generic;

namespace Docaut.Api.Metrics
{
    public class MetricsOptions
    {
        public bool Enabled { get; set; }
        public bool InfluxEnabled { get; set; }
        public string InfluxUrl { get; set; }
        public string Database { get; set; }
        public int Interval { get; set; }
    }
}