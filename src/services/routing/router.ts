import { ROUTES, ROUTE_PATH } from "../../config/route.config";

let prevActiveLink: HTMLAnchorElement | null = null;

export const bootRouting = (
  nav: HTMLElement,
  app: HTMLDivElement,
  callBack: Function
) => {
  renderNavLinks(nav);
  registerNavLinks(nav, app, callBack);
  registerBrowserBackAndForth(app, callBack);
  renderInitialPage(app, callBack);
};

const renderNavLinks = (nav: HTMLElement) => {
  const navFragment = document.createDocumentFragment();
  Object.entries(ROUTES).forEach(([route, { linkLabel }]) => {
    const linkElement = document.createElement("a");
    linkElement.href = route;
    linkElement.textContent = linkLabel;
    linkElement.className =
      "text-black hover:border-b-2 hover:border-gray-500 mx-2 py-1";
    navFragment.appendChild(linkElement);
  });
  nav.appendChild(navFragment);
};

const registerNavLinks = (
  nav: HTMLElement,
  app: HTMLDivElement,
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

const navigate = (app: HTMLDivElement, e: MouseEvent, callback: Function) => {
  if (e.target instanceof HTMLAnchorElement) {
    const route = e.target.pathname as ROUTE_PATH;
    history.pushState({}, "", route);
    renderContent(app, route, callback);
  }
};

const renderContent = (
  app: HTMLDivElement,
  route: ROUTE_PATH,
  callBack: Function
) => {
  if (!ROUTES[route]) {
    console.error(`Route ${route} not found`);
    return;
  }
  app.innerHTML = ROUTES[route].content;
  callBack(route);
  if (prevActiveLink) {
    prevActiveLink.classList.remove("border-b-2", "border-black");
  }
  const activeLink = document.querySelector(
    `a[href="${route}"]`
  ) as HTMLAnchorElement;
  prevActiveLink = activeLink;
  activeLink?.classList.add("border-b-2", "border-black");
};

const registerBrowserBackAndForth = (
  app: HTMLDivElement,
  callBack: Function
) => {
  window.onpopstate = () => {
    const route = location.pathname;
    renderContent(app, route as ROUTE_PATH, callBack);
  };
};

const renderInitialPage = (app: HTMLDivElement, callBack: Function) => {
  const route = location.pathname as ROUTE_PATH;
  renderContent(app, route, callBack);
};
