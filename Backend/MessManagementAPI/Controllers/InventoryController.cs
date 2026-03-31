using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace MessManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private static List<InventoryItem> items = new List<InventoryItem>();

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(items);
        }

        [HttpPost]
        public IActionResult Add(InventoryItem item)
        {
            item.Id = items.Count + 1;
            items.Add(item);
            return Ok(item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, InventoryItem updated)
        {
            var item = items.FirstOrDefault(x => x.Id == id);
            if (item == null) return NotFound();

            item.ItemName = updated.ItemName;
            item.Quantity = updated.Quantity;
            item.Unit = updated.Unit;

            return Ok(item);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = items.FirstOrDefault(x => x.Id == id);
            if (item == null) return NotFound();

            items.Remove(item);
            return Ok();
        }
    }

    public class InventoryItem
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public int Quantity { get; set; }
        public string Unit { get; set; }
    }
}