using Blog.Post.DataAccess.DTO;
using Blog.Post.DataAccess.IRepository;
using Blog.Post.DataAccess.Models;
using BlogPost.Utils.Constants;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static Blog.Post.DataAccess.DTO.AccountDTO;

namespace Blog.Post.DataAccess.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        public AccountRepository(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }


        public async Task<(RegisterEnum, IdentityError[])> Register(RegisterDTO registerDTO)
        {
            if (registerDTO.Email == null || registerDTO.Password == null)
            {
                return (RegisterEnum.MissingEmailOrPassword, []);
            }

            var user = new User
            {
                UserName = registerDTO.UserName,
                Email = registerDTO.Email,
                //FirstName = registerDTO.FirstName,
                //LastName = registerDTO.LastName,
            };

            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if (!result.Succeeded)
            {
                return (RegisterEnum.Failed, result.Errors.ToArray());
            }

            return (RegisterEnum.Succeeded, []);
        }

        public async Task<(LoginEnum, LoginResponseDTO)> Login(LoginDTO loginDto)
        {
            if (loginDto.Email == null || loginDto.Password == null)
            {
                return (LoginEnum.EmailOrPasswordRequired, null);
            }

            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                return (LoginEnum.LoginFailed, null);
            }

            var signInResult = await _signInManager.PasswordSignInAsync(user, loginDto.Password, loginDto.RememberMe, false);

            if (!signInResult.Succeeded)
            {
                return (LoginEnum.LoginFailed, null);
            }

            LoginResponseDTO loginResponseDTO = new LoginResponseDTO
            {
                Id = user.Id,
                //FirstName = user.FirstName,
                //LastName = user.LastName,
                Email = user.Email,
                UserName = user.UserName
            };

            var jwtToken = generateJwtToken(user);
            loginResponseDTO.Token = jwtToken;

            return (LoginEnum.LoginSuccess, loginResponseDTO);
            //return (LoginEnum.LoginFailed, null);
        }

        private string generateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

