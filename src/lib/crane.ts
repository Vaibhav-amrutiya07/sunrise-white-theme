export type Pos = { x: number; y: number };

/** Returns a function that moves the trolley, cable and hook block of a crane SVG. */
export function makeCraneDrawer(root: Element) {
  const trolley = root.querySelector(".h-trolley");
  const cable = root.querySelector(".h-cable");
  const block = root.querySelector(".h-block");
  return (p: Pos) => {
    trolley?.setAttribute("x", String(p.x - 9));
    cable?.setAttribute("x1", String(p.x));
    cable?.setAttribute("x2", String(p.x));
    cable?.setAttribute("y2", String(p.y));
    block?.setAttribute("transform", `translate(${p.x} ${p.y})`);
  };
}
