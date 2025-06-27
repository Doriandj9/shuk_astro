import { f as createComponent, l as renderComponent, r as renderTemplate } from '../chunks/astro/server_DPEOJoPK.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CcRCzlW-.mjs';
export { renderers } from '../renderers.mjs';

const $$Test = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate`
test
` })}`;
}, "D:/Proyectos/Personal/astro_shuk/astro/src/pages/test.astro", void 0);

const $$file = "D:/Proyectos/Personal/astro_shuk/astro/src/pages/test.astro";
const $$url = "/test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Test,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
