using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BlogPost.Utils.Common
{
    public class ResponseModel<T>
    {
        public HttpStatusCode Status { get; set; }
        public T? Data { get; set; }
        public string? Message { get; set; }
    }
}
