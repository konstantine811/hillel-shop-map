import { Component } from "./common";
import { createElement, Heart, ShoppingCart } from "lucide";

const heartIcon = createElement(Heart); // Returns HTMLElement (svg)
const shoppingCartIcon = createElement(ShoppingCart); // Returns HTMLElement (svg)
export function homePageContent() {
  return /*html*/ `
      <main class="bg-gray-100">
        <div class="container flex justify-center">
            <h1 class="text-9xl uppercase py-32">Products</h1>
        </div>
      </main>
      <section class="bg-gray-100 grow">
        <div class="container">
            <div class="grid grid-cols-3 gap-3">
                <div class="bg-white p-4 shadow-md rounded-lg">
                  <header class="flex items-center justify-between">
                    <h2 class="text-lg">Product 1</h2>
                    <div class="flex gap-3">
                        <button class="w-10 h-10 bg-slate-100 hover:bg-slate-50 hover:text-green-300 transition-all flex items-center justify-center rounded-full">
                          ${heartIcon.outerHTML}
                          </button>
                        <button class="w-10 h-10 bg-slate-100 hover:bg-slate-50 hover:text-green-300 transition-all flex items-center justify-center rounded-full">${shoppingCartIcon.outerHTML}</button>
                    </div>
                  </header>
                </div>
                <div class="bg-white p-4 shadow-md rounded-lg">Product 2</div>
                <div class="bg-white p-4 shadow-md rounded-lg">Product 3</div>
                <div class="bg-white p-4 shadow-md rounded-lg">Product 4</div>
                <div class="bg-white p-4 shadow-md rounded-lg">Product 5</div>
                <div class="bg-white p-4 shadow-md rounded-lg">Product 6</div>
            </div>
        </div>
      </section>
      `;
}

export class HomePage implements Component {
  constructor() {
    this.onInit();
  }

  onInit() {
    console.log("Home page initialized");
  }

  onDestroy() {
    console.log("Home page destroyed");
  }
}
