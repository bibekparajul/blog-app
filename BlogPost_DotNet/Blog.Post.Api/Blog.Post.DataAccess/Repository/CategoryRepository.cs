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
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _db;
        public CategoryRepository(ApplicationDbContext db)
        {
            _db = db;
        }
        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            return await _db.Categories.ToListAsync();
        }

        public async Task<Category> GetCategories(int id)
        {
            return await _db.Categories.FirstOrDefaultAsync(x=> x.Id == id);
        }
    }
}
