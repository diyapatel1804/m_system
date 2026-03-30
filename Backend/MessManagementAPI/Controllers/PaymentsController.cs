using Microsoft.AspNetCore.Mvc;
using MessManagementAPI.Data;
using MessManagementAPI.Models;

namespace MessManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly MessDbContext _context;

        public PaymentsController(MessDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetPayments()
        {
            return Ok(_context.Payments.ToList());
        }

        [HttpPost]
        public IActionResult AddPayment(Payment payment)
        {
            _context.Payments.Add(payment);
            _context.SaveChanges();

            return Ok(payment);
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePayment(int id)
        {
            var p = _context.Payments.Find(id);

            if (p == null)
                return NotFound();

            _context.Payments.Remove(p);
            _context.SaveChanges();

            return Ok();
        }
    }
}