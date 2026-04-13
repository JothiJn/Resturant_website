import React from "react";
import { getMenuItems } from "../../actions/admin";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

export default async function AdminMenuPage() {
  const { data: menuItems } = await getMenuItems();

  return (
    <div className="flex-1 bg-cream min-h-screen p-8 pt-24 md:pt-32 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-crimson font-bold tracking-widest uppercase text-xs mb-2 block">Management Portal</span>
            <h1 className="text-4xl font-serif text-midnight">Menu Management</h1>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-midnight text-cream font-bold tracking-widest uppercase text-sm hover:bg-midnight/90 transition-colors">
            <Plus size={18} /> Add New Item
          </button>
        </div>

        <div className="bg-white border border-midnight/10 shadow-sm overflow-hidden">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-midnight/5">
              <tr className="text-midnight/60 border-b border-midnight/10">
                <th className="font-semibold px-6 py-4">Dish</th>
                <th className="font-semibold px-6 py-4">Category</th>
                <th className="font-semibold px-6 py-4">Price</th>
                <th className="font-semibold px-6 py-4">Status</th>
                <th className="font-semibold px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-midnight/5">
              {menuItems.map((item: any) => (
                <tr key={item.id} className="hover:bg-cream/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 bg-cover bg-center rounded-sm" 
                        style={{ backgroundImage: `url('${item.image}')` }}
                      />
                      <div>
                        <div className="font-medium text-midnight">{item.name}</div>
                        <div className="text-xs text-midnight/50 truncate max-w-xs">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-midnight/70">{item.category}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-midnight">₹{item.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-bold uppercase tracking-wider rounded-sm ${item.is_available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {item.is_available ? "Available" : "Sold Out"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button className="p-2 text-midnight/60 hover:text-midnight hover:bg-midnight/5 rounded-full transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-crimson/60 hover:text-crimson hover:bg-crimson/5 rounded-full transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
