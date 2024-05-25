function addRandomShapes(app: HTMLDivElement) {
  const arryRandomWidth = [];
  const arryRandomHight = [];
  const count = 100;
  const { height, width } = app.getBoundingClientRect();
  for (let i = 0; i < count; i++) {
    arryRandomWidth.push(Math.random() * width);
    arryRandomHight.push(Math.random() * height);
  }

  const fragment = document.createDocumentFragment();
  const elementWrap = document.createElement("div");
  elementWrap.className = "absolute w-full";

  for (let i = 0; i < count; i++) {
    const div = document.createElement("div");
    div.style.backgroundColor = `rgb(${Math.random() * 255},${
      Math.random() * 255
    },${Math.random() * 255})`;
    div.style.position = "absolute";
    div.className = "rounded-full";
    div.style.width = "10px";
    div.style.height = "10px";
    div.style.left = `${arryRandomWidth[i] - 5}px`;
    div.style.top = `${arryRandomHight[i] - 10}px`;
    elementWrap.appendChild(div);
  }
  fragment.appendChild(elementWrap);

  app?.appendChild(fragment);
}
