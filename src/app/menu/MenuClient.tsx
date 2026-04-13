"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

type DietTag = "Veg" | "Non-Veg" | "Vegan" | "GF";

interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  diet: string[] | any;
  image: string;
  kcal?: number;
  allergens?: string[] | any;
}

const CATEGORIES = ["All", "Starters", "Mains", "Desserts", "Drinks"];
const DIETS: DietTag[] = ["Veg", "Non-Veg", "Vegan", "GF"];

export default function MenuClient({ initialDishes }: { initialDishes: any[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeDiets, setActiveDiets] = useState<DietTag[]>([]);

  const toggleDiet = (diet: DietTag) => {
    setActiveDiets(prev => 
      prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
    );
  };

  const filteredDishes = initialDishes.filter(dish => {
    const categoryMatch = activeCategory === "All" || dish.category === activeCategory;
    const dietMatch = activeDiets.length === 0 || activeDiets.every(d => (dish.diet || []).includes(d));
    return categoryMatch && dietMatch;
  });

  return (
    <main className="flex-1 bg-cream min-h-screen">
      {/* Menu Header */}
      <section className="bg-midnight text-cream py-20 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-serif text-gold mb-6">Our Menu</h1>
        <p className="text-lg font-sans max-w-2xl mx-auto text-cream/80">
          A carefully curated selection of local traditions and global inspirations, prepared with the finest seasonal ingredients.
        </p>
      </section>

      {/* Filters Section */}
      <section className="sticky top-20 z-40 bg-cream/95 backdrop-blur-md border-b border-midnight/10 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Categories */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar snap-x">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`snap-start whitespace-nowrap px-6 py-2 border rounded-full text-sm uppercase tracking-widest font-semibold transition-all ${
                  activeCategory === cat 
                    ? "bg-midnight border-midnight text-cream" 
                    : "bg-transparent border-midnight/20 text-midnight hover:border-midnight"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Diets */}
          <div className="flex gap-2 flex-wrap justify-center md:justify-end">
            {DIETS.map(diet => (
              <button
                key={diet}
                onClick={() => toggleDiet(diet)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                  activeDiets.includes(diet)
                    ? "bg-crimson text-cream"
                    : "bg-midnight/5 text-midnight/60 hover:bg-midnight/10"
                }`}
              >
                {diet}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dish Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDishes.map((dish) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={dish.id}
                className="group flex flex-col bg-white border border-midnight/5 hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Image Area */}
                <div className="relative aspect-[4/3] overflow-hidden bg-midnight/5">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" 
                    style={{ backgroundImage: `url('${dish.image}')` }} 
                  />
                  {/* Diet Tags Top Left */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {(dish.diet || []).map((d: string) => (
                      <span key={d} className="bg-cream/90 backdrop-blur-sm px-2 py-1 text-[10px] uppercase tracking-widest font-bold text-midnight shadow-sm">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif text-midnight">{dish.name}</h3>
                    <span className="text-crimson font-bold font-sans">₹{dish.price}</span>
                  </div>
                  <p className="text-sm text-midnight/70 font-sans leading-relaxed flex-1 mb-4">
                    {dish.description}
                  </p>
                  
                  {/* Nutritional Info */}
                  <div className="flex items-center gap-4 mb-6 py-2 border-y border-midnight/5">
                    <div className="text-[10px] text-midnight/50 uppercase tracking-widest">
                       <span className="font-bold text-midnight">{dish.kcal || 'N/A'}</span> kcal
                    </div>
                    <div className="text-[10px] text-midnight/50 uppercase tracking-widest border-l border-midnight/10 pl-4">
                       Allergens: <span className="font-bold text-midnight">{(dish.allergens || []).join(", ") || 'None'}</span>
                    </div>
                  </div>
                  
                  <button className="w-full flex items-center justify-center gap-2 py-3 border border-midnight text-midnight font-bold uppercase tracking-widest text-xs hover:bg-midnight hover:text-cream transition-colors group/btn">
                    <Plus size={16} className="group-hover/btn:rotate-90 transition-transform" />
                    Add to Order
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredDishes.length === 0 && (
          <div className="text-center py-24 text-midnight/50">
            <h3 className="text-2xl font-serif mb-2">No dishes found</h3>
            <p className="font-sans">Try adjusting your category or diet filters.</p>
          </div>
        )}
      </section>

    </main>
  );
}
