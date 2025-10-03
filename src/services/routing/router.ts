import { ROUTES, ROUTES_PATH } from "../../config/route.config";
let prevActiveLink: Element | null = null;

export const renderNavLinks = (nav: HTMLElement) => {
  const navFragment = document.createDocumentFragment();
  Object.entries(ROUTES).forEach(([key, data]) => {
    const linkElement = document.createElement("a");
    linkElement.href = key;
    linkElement.textContent = data.linkLabel;
    linkElement.className =
      "nav-link text-black-100 hover:border-b-2 hover:border-gray-500 mx-2 py-1 drop-shadow-text";
    navFragment.appendChild(linkElement);
  });
  nav.append(navFragment);
};

// funciton to register click handlers
export const registerNavLinks = (
  app: HTMLElement,
  nav: HTMLElement,
  callback: Function
) => {
  nav.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target instanceof HTMLAnchorElement) {
      const { href } = e.target;
      history.pushState({}, "", href);
      navigate(app, e, callback);
    }
  });
};

const renderContent = (
  app: HTMLElement,
  route: ROUTES_PATH,
  callback: Function
) => {
  app.innerHTML = ROUTES[route].content;
  const activeLink = document.querySelector(`a[href="${route}"]`);
  if (prevActiveLink)
    prevActiveLink.classList.remove("border-b-2", "border-black-100");
  if (activeLink) {
    activeLink.classList.add("border-b-2", "border-black-100");
    prevActiveLink = activeLink;
  }
  callback(route);
};
const navigate = (app: HTMLElement, e: MouseEvent, callback: Function) => {
  if (e.target instanceof HTMLAnchorElement) {
    const route = e.target.pathname;
    history.pushState({}, "", route);
    renderContent(app, route as ROUTES_PATH, callback);
  }
};

export const registerBrowserBackAndForth = (
  app: HTMLElement,
  callback: Function
) => {
  window.onpopstate = function () {
    const route = location.pathname.split("#")[0];
    renderContent(app, route as ROUTES_PATH, callback);
  };
};

export const renderIntialPage = (app: HTMLElement, callback: Function) => {
  const route = location.pathname;
  renderContent(app, route as ROUTES_PATH, callback);
};
