using Blog.Post.DataAccess.Data;
using Blog.Post.DataAccess.IRepository;
using Blog.Post.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Post.DataAccess.Repository
{
    public class PostRepository : IPostRepository
    {
        private readonly ApplicationDbContext _context;

        public PostRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PostM>> GetPostsAsync()
        {
            return await _context.Posts.Include(p => p.Category).ToListAsync();
        }

        public async Task<PostM> GetPostByIdAsync(int id)
        {
            return await _context.Posts.Include(p => p.Category)
                                       .FirstOrDefaultAsync(p => p.PostID == id);
        }

        public async Task<PostM> AddPostAsync(PostM post)
        {
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return post;
        }

        public async Task UpdatePostAsync(PostM post)
        {
            _context.Entry(post).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeletePostAsync(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post != null)
            {
                _context.Posts.Remove(post);
                await _context.SaveChangesAsync();
            }
        }
    }

}
