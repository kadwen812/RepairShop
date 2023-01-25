using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RepairShop.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Invoice",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CustomerName = table.Column<string>(type: "text", nullable: true),
                    CustomerPhone = table.Column<string>(type: "text", nullable: true),
                    Paid = table.Column<bool>(type: "boolean", nullable: true),
                    Service = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Price = table.Column<float>(type: "real", nullable: true),
                    Manufacturer = table.Column<string>(type: "text", nullable: true),
                    Make = table.Column<string>(type: "text", nullable: true),
                    Model = table.Column<string>(type: "text", nullable: true),
                    Identifier = table.Column<string>(type: "text", nullable: true),
                    Technician = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoice", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Service",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Price = table.Column<float>(type: "real", nullable: true),
                    Manufacturer = table.Column<string>(type: "text", nullable: true),
                    Make = table.Column<string>(type: "text", nullable: true),
                    Model = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Service", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Invoice",
                columns: new[] { "Id", "CustomerName", "CustomerPhone", "Description", "Identifier", "Make", "Manufacturer", "Model", "Paid", "Price", "Service", "Technician" },
                values: new object[,]
                {
                    { 1, "John Smith", "555-555-5555", "Replace the screen on your device", "1234567890", "iPhone", "Apple", "14 Pro Max", false, 299.99f, "New Screen Replacement", "John Doe" },
                    { 2, "Jane Doe", "555-555-5555", "Replace the screen on your device", "0987654321", "iPhone", "Apple", "14 Pro Max", false, 149.99f, "Used Screen Replacement", "John Doe" }
                });

            migrationBuilder.InsertData(
                table: "Service",
                columns: new[] { "Id", "Description", "Make", "Manufacturer", "Model", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "Replace the screen on your device", "iPhone", "Apple", "14 Pro Max", "New Screen Replacement", 299.99f },
                    { 2, "Replace the screen on your device", "iPhone", "Apple", "14 Pro Max", "Used Screen Replacement", 149.99f }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Invoice");

            migrationBuilder.DropTable(
                name: "Service");
        }
    }
}
