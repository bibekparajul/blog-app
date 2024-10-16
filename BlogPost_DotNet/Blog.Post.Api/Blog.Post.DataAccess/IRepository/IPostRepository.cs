using Blog.Post.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Post.DataAccess.IRepository
{
    public interface IPostRepository
    {
        Task<IEnumerable<PostM>> GetPostsAsync();
        Task<PostM> GetPostByIdAsync(int id);
        Task<PostM> AddPostAsync(PostM post);
        Task UpdatePostAsync(PostM post);
        Task DeletePostAsync(int id);
    }
}
