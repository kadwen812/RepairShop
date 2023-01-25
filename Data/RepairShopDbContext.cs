using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using RepairShop.Models;

    public class RepairShopDbContext : DbContext
    {
        public RepairShopDbContext (DbContextOptions<RepairShopDbContext> options)
            : base(options)
        {
        }

        public DbSet<RepairShop.Models.Service> Service { get; set; } = default!;
        public DbSet<RepairShop.Models.Invoice> Invoice { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Service>().ToTable("Service");
            modelBuilder.Entity<Invoice>().ToTable("Invoice");

            modelBuilder.Entity<Service>()
            .HasData(
                new Service
                {
                    Id = 1,
                    Name = "New Screen Replacement",
                    Description = "Replace the screen on your device",
                    Price = (float)299.99,
                    Manufacturer = "Apple",
                    Make = "iPhone",
                    Model = "14 Pro Max"
                },
                new Service
                {
                    Id = 2,
                    Name = "Used Screen Replacement",
                    Description = "Replace the screen on your device",
                    Price = (float)149.99,
                    Manufacturer = "Apple",
                    Make = "iPhone",
                    Model = "14 Pro Max"
                }
            );

            modelBuilder.Entity<Invoice>()
            .HasData(
                new Invoice
                {
                    Id = 1,
                    CustomerName = "John Smith",
                    CustomerPhone = "555-555-5555",
                    Paid = false,
                    Service = "New Screen Replacement",
                    Description = "Replace the screen on your device",
                    Price = (float)299.99,
                    Manufacturer = "Apple",
                    Make = "iPhone",
                    Model = "14 Pro Max",
                    Identifier = "1234567890",
                    Technician = "John Doe"
                },
                new Invoice
                {
                    Id = 2,
                    CustomerName = "Jane Doe",
                    CustomerPhone = "555-555-5555",
                    Paid = false,
                    Service = "Used Screen Replacement",
                    Description = "Replace the screen on your device",
                    Price = (float)149.99,
                    Manufacturer = "Apple",
                    Make = "iPhone",
                    Model = "14 Pro Max",
                    Identifier = "0987654321",
                    Technician = "John Doe"
                }
            );
        }
    }
