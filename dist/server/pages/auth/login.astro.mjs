import { f as createComponent, k as renderHead, l as renderComponent, r as renderTemplate } from '../../chunks/astro/server_DPEOJoPK.mjs';
import 'kleur/colors';
export { renderers } from '../../renderers.mjs';

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Login</title>${renderHead()}</head> <body> ${renderComponent($$result, "LoginWrapper", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "@/wrapers/LoginWrapper", "client:component-export": "LoginWrapper" })} </body></html>`;
}, "D:/Proyectos/Personal/astro_shuk/astro/src/pages/auth/login.astro", void 0);

const $$file = "D:/Proyectos/Personal/astro_shuk/astro/src/pages/auth/login.astro";
const $$url = "/auth/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Login,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
