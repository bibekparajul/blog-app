using Blog.Post.DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Post.DataAccess.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {

        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<PostM> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }

        // Seeding the data into the categories
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, CategoryName = "Sports" },
                new Category { Id = 2, CategoryName = "Politics" },
                new Category { Id = 3, CategoryName = "Entertainment" },
                new Category { Id = 4, CategoryName = "Music" },
                new Category { Id = 5, CategoryName = "Random" }
            );

            base.OnModelCreating(modelBuilder);
            
        }
    }
}
