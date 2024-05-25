import { CommonPage } from "../CommonPage";

export function HomePageContent() {
  return /*html*/ `
        <div class="bg-gray-100 grow flex flex-col justify-center">
            <div class="container">
                <h1 class="text-black uppercase text-center text-9xl">Home Page</h1>
            </div>
        </div>
    `;
}

export class HomePage implements CommonPage {
  constructor() {}

  onDestroy() {}
}
