using BlogPost.Utils.Constants;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Blog.Post.DataAccess.DTO.AccountDTO;

namespace Blog.Post.DataAccess.IRepository
{
    public interface IAccountRepository
    {
        Task<(RegisterEnum, IdentityError[])> Register(RegisterDTO registerDto);
        Task<(LoginEnum, LoginResponseDTO)> Login(LoginDTO loginDto);
    }
}
