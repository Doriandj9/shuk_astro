import { e as createAstro, f as createComponent, h as addAttribute, k as renderHead, l as renderComponent, r as renderTemplate } from '../../../chunks/astro/server_DPEOJoPK.mjs';
import 'kleur/colors';
import axios from 'axios';
export { renderers } from '../../../renderers.mjs';

const host = "https://api.shuk.ec";
const versionApp = "v1";
const endPointApi = "/api";
const apiWhatsAppHost = "https://api.whatsapp.com/send";
const shareFacebookHost = "https://www.facebook.com/sharer/sharer.php";
const idFacebook = "1896772931078211";
const idGoogle = "688681171370-3vstsdcqqni44798pbstcbik4fr5n6ta.apps.googleusercontent.com";
const hostApp = "https://shuk.ec";
const emailContact = "shuk@email.com";
const app = {
  server: `${host}${endPointApi}/`,
  base_server: host,
  colors: {
    primary: "#232C56",
    secondary: "#F6A605",
    ternary: "#E42823"
  },
  environment: "local",
  oAuthIdGoogle: idGoogle,
  oAuthIdFacebook: idFacebook,
  apiV: versionApp,
  socialProviders: {
    google: 1,
    facebook: 2,
    whatsapp: 3
  },
  apiWhatsAppHost,
  host: hostApp,
  shareFacebookHost,
  timeRefetchInterval: 1e3 * 30,
  emailContact
};
const api = axios.create({
  baseURL: app.server + app.apiV,
  transformResponse: [function(data) {
    try {
      const response = JSON.parse(data);
      if (app.environment !== "prod" && !response.status) {
        return { ...response, _error: response.message, message: response._error };
      }
      return response;
    } catch (e) {
      {
        console.error(e);
      }
      return data;
    }
  }],
  headers: {
    "Accept": "application/json"
    // 'X-lang': localStorage.getItem('languageApp') ?? 'es'
  }
});

const webRoutes = {
  view_posts: {
    path: "/view/posts/:id"}};

const appLoadImage = (pathImage) => {
  const path = `${app.base_server}${pathImage}`;
  return path;
};

const serializeText = (text) => {
  const result = decodeHTMLEntities(
    text.replaceAll(/<br>/g, "\n\r").replaceAll(/(<)(\w+)(>)/g, "").replaceAll(/(<\/)(\w+)(>)/g, "")
  );
  return result;
};
const decodeHTMLEntities = (text) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
};

const $$Astro = createAstro("https://shuk.ec");
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  let errorApi = null;
  let post = null;
  try {
    const response = await api.get(`post/${id}`);
    const data = await response.data;
    post = data.data;
  } catch (error) {
    if (typeof error === "object" && error && Reflect.has(error, "name") && Reflect.has(error, "message")) {
      errorApi = {
        name: Reflect.get(error, "name") || "Server",
        message: Reflect.get(error, "message") || "Not found"
      };
    } else {
      errorApi = {
        name: "Server",
        message: "Not found"
      };
    }
  }
  return renderTemplate`<html lang="es"> <head><meta property="og:url"${addAttribute(`${app.host}${webRoutes.view_posts.path.replace(":id", String(post?.id))}`, "content")}><meta property="og:type" content="article"><meta property="og:title"${addAttribute(`${serializeText(post?.description || post?.title || "")}`, "content")}><meta property="og:description"${addAttribute(`${serializeText(post?.description || post?.title || "")}`, "content")}><meta property="og:image"${addAttribute(`${appLoadImage(post?.img?.path || "")}`, "content")}><meta property="og:image:alt"${addAttribute(`${serializeText(post?.description ?? "")}`, "content")}><meta property="fb:app_id"${addAttribute(`${app.oAuthIdFacebook}`, "content")}><meta charset="utf-8"><title>${post?.description}</title>${renderHead()}</head> <body> ${renderComponent($$result, "PostWrapper", null, { "client:only": "react", "post": post, "error": errorApi, "client:component-hydration": "only", "client:component-path": "@/wrapers/PostWrapper", "client:component-export": "PostWrapper" })} </body></html>`;
}, "D:/Proyectos/Personal/astro_shuk/astro/src/pages/view/posts/[id].astro", void 0);

const $$file = "D:/Proyectos/Personal/astro_shuk/astro/src/pages/view/posts/[id].astro";
const $$url = "/view/posts/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
