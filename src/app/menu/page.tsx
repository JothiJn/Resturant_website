import React from "react";
import MenuClient from "./MenuClient";
import { getMenuItems } from "../actions/admin";

export default async function MenuPage() {
  const { data: initialDishes } = await getMenuItems();

  return <MenuClient initialDishes={initialDishes} />;
}
