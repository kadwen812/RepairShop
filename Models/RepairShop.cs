using Microsoft.EntityFrameworkCore;

namespace RepairShop.Models;

public class Invoice
{
    public int Id { get; set; }
    public string? CustomerName { get; set; }
    public string? CustomerPhone { get; set; }
    public bool? Paid { get; set; }
    public string? Service { get; set; }
    public string? Description { get; set; }
    public float? Price { get; set; }
    public string? Manufacturer { get; set; }
    public string? Make { get; set; }
    public string? Model { get; set; }
    public string? Identifier { get; set; }
    public string? Technician { get; set; }
}

public class Service
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public float? Price { get; set; }
    public string? Manufacturer { get; set; }
    public string? Make { get; set; }
    public string? Model { get; set; }
}
