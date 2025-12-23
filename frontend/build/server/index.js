import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, useLoaderData } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const API_BASE = "http://localhost:8000";
async function fetchJson(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Accept": "application/json" },
    credentials: "include"
  });
  if (!res.ok) throw new Error(`Fetch error ${res.status} ${res.statusText}`);
  return res.json();
}
async function getPortfolioData() {
  const endpoints = [
    fetchJson("/api/v1/config/"),
    fetchJson("/api/v1/profile/"),
    fetchJson("/api/v1/resume/"),
    fetchJson("/api/v1/projects/")
  ];
  const [config, profile, resume, projects] = await Promise.all(endpoints);
  return {
    config,
    profile,
    resume,
    projects
  };
}
function meta({
  data
}) {
  return [{
    title: data?.profile?.full_name || "My Portfolio"
  }, {
    name: "description",
    content: data?.profile?.headline || "Welcome to my portfolio"
  }];
}
async function loader() {
  const data = await getPortfolioData();
  return data;
}
const home = UNSAFE_withComponentProps(function Home() {
  const {
    config,
    profile,
    resume,
    projects
  } = useLoaderData();
  if (!profile) {
    return /* @__PURE__ */ jsxs("div", {
      className: "min-h-screen flex items-center justify-center",
      children: [/* @__PURE__ */ jsx("p", {
        className: "text-xl",
        children: "Đang tải dữ liệu từ Backend..."
      }), /* @__PURE__ */ jsx("p", {
        className: "text-sm text-gray-500 mt-2",
        children: "(Hãy đảm bảo Django server đang chạy tại port 8000)"
      })]
    });
  }
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-white text-black font-sans",
    children: [/* @__PURE__ */ jsxs("header", {
      className: "max-w-4xl mx-auto py-20 px-6 text-center space-y-6",
      children: [profile.avatar_url && /* @__PURE__ */ jsx("img", {
        src: profile.avatar_url,
        alt: profile.full_name,
        className: "w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-100 shadow-lg"
      }), /* @__PURE__ */ jsx("h1", {
        className: "text-4xl font-bold tracking-tight",
        children: profile.full_name
      }), /* @__PURE__ */ jsx("p", {
        className: "text-xl text-gray-600",
        children: profile.headline
      }), /* @__PURE__ */ jsx("p", {
        className: "max-w-2xl mx-auto text-gray-500 leading-relaxed",
        children: profile.bio
      }), /* @__PURE__ */ jsxs("div", {
        className: "flex justify-center gap-4 pt-4",
        children: [profile.cv_pdf_url && /* @__PURE__ */ jsx("a", {
          href: profile.cv_pdf_url,
          target: "_blank",
          rel: "noreferrer",
          className: "bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition",
          children: "Tải CV"
        }), /* @__PURE__ */ jsx("a", {
          href: "#contact",
          className: "border border-black px-6 py-2 rounded-full hover:bg-gray-50 transition",
          children: "Liên hệ"
        })]
      })]
    }), /* @__PURE__ */ jsx("section", {
      className: "bg-gray-50 py-16 px-6",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-4xl mx-auto",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-8 text-center",
          children: "Kỹ năng chuyên môn"
        }), /* @__PURE__ */ jsx("div", {
          className: "grid md:grid-cols-2 gap-8",
          children: resume?.skills?.map((category, idx) => /* @__PURE__ */ jsxs("div", {
            className: "bg-white p-6 rounded-xl shadow-sm",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "font-semibold mb-4 text-lg border-b pb-2",
              children: category.name
            }), /* @__PURE__ */ jsx("div", {
              className: "flex flex-wrap gap-2",
              children: category.skills.map((skill, sIdx) => /* @__PURE__ */ jsx("span", {
                className: "bg-gray-100 px-3 py-1 rounded-md text-sm",
                children: skill.name
              }, sIdx))
            })]
          }, idx))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-16 px-6",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-4xl mx-auto",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-8 text-center",
          children: "Dự án nổi bật"
        }), /* @__PURE__ */ jsx("div", {
          className: "grid md:grid-cols-2 gap-6",
          children: projects?.map((project) => /* @__PURE__ */ jsxs("div", {
            className: "border rounded-xl overflow-hidden hover:shadow-lg transition group",
            children: [project.thumbnail && /* @__PURE__ */ jsx("div", {
              className: "h-48 overflow-hidden",
              children: /* @__PURE__ */ jsx("img", {
                src: project.thumbnail,
                alt: project.title,
                className: "w-full h-full object-cover group-hover:scale-105 transition duration-500"
              })
            }), /* @__PURE__ */ jsxs("div", {
              className: "p-6",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "font-bold text-xl mb-2",
                children: project.title
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 text-sm mb-4 line-clamp-2",
                children: project.short_description
              }), /* @__PURE__ */ jsx("div", {
                className: "flex flex-wrap gap-2 mb-4",
                children: project.tags.map((tag, tIdx) => /* @__PURE__ */ jsx("span", {
                  className: "text-xs px-2 py-1 rounded bg-blue-50 text-blue-600 font-medium",
                  children: tag.name
                }, tIdx))
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex gap-4 text-sm font-medium",
                children: [project.demo_url && /* @__PURE__ */ jsx("a", {
                  href: project.demo_url,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "hover:underline",
                  children: "Live Demo ↗"
                }), project.repo_url && /* @__PURE__ */ jsx("a", {
                  href: project.repo_url,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "hover:underline",
                  children: "GitHub ↗"
                })]
              })]
            })]
          }, project.id))
        })]
      })
    }), /* @__PURE__ */ jsx("footer", {
      className: "border-t py-8 text-center text-sm text-gray-500",
      id: "contact",
      children: /* @__PURE__ */ jsx("p", {
        children: config?.footer_text || "© 2024 Built with React Router & Django"
      })
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CvDEkRgE.js", "imports": ["/assets/chunk-WWGJGFF6-BV3SjWWZ.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-ZxnSTEwG.js", "imports": ["/assets/chunk-WWGJGFF6-BV3SjWWZ.js"], "css": ["/assets/root-D40sVkuK.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-ClIXZaso.js", "imports": ["/assets/chunk-WWGJGFF6-BV3SjWWZ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-cbeb4c23.js", "version": "cbeb4c23", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_optimizeDeps": false, "unstable_subResourceIntegrity": false, "v8_middleware": false, "v8_splitRouteModules": false, "v8_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
