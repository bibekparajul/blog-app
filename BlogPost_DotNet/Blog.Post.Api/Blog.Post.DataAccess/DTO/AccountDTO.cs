using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Post.DataAccess.DTO
{
    public class AccountDTO
    {
        public class LoginDTO
        {
            public string Email { get; set; }
            public string Password { get; set; }
            public bool RememberMe { get; set; }
        }

        public class LoginResponseDTO
        {
            public Guid Id { get; set; }
            public string Email { get; set; }
            public string UserName { get; set; }
            public string Token { get; set; }
        }

        public class RegisterDTO
        {
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }

        }
    }
}
