using Microsoft.AspNetCore.Mvc;
using MessManagementAPI.Data;
using MessManagementAPI.Models;

namespace MessManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealMenusController : ControllerBase
    {
        private readonly MessDbContext _context;

        public MealMenusController(MessDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetMenus()
        {
            return Ok(_context.MealMenus.ToList());
        }

        [HttpPost]
        public IActionResult AddMenu(MealMenu menu)
        {
            _context.MealMenus.Add(menu);
            _context.SaveChanges();
            return Ok(menu);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateMenu(int id, MealMenu menu)
        {
            var m = _context.MealMenus.Find(id);

            if (m == null)
                return NotFound();

            m.Day = menu.Day;
            m.Breakfast = menu.Breakfast;
            m.Lunch = menu.Lunch;
            m.Dinner = menu.Dinner;

            _context.SaveChanges();

            return Ok(m);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMenu(int id)
        {
            var m = _context.MealMenus.Find(id);

            if (m == null)
                return NotFound();

            _context.MealMenus.Remove(m);
            _context.SaveChanges();

            return Ok();
        }
    }
}