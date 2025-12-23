import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, useLoaderData } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState } from "react";
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
  const [config, profile, resume, projects2] = await Promise.all(endpoints);
  return {
    config,
    profile,
    resume,
    projects: projects2
  };
}
async function postContact(formData) {
  const res = await fetch(`${API_BASE}/api/v1/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });
  if (!res.ok) throw new Error("Failed to send contact");
  return res.json();
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
async function loader$1() {
  const data = await getPortfolioData();
  return data;
}
const home = UNSAFE_withComponentProps(function Home() {
  const {
    config,
    profile,
    resume,
    projects: projects2
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
          children: projects2?.map((project) => /* @__PURE__ */ jsxs("div", {
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
  loader: loader$1,
  meta
}, Symbol.toStringTag, { value: "Module" }));
async function loader() {
  const res = await fetch("http://localhost:8000/api/v1/projects/");
  if (!res.ok) return {
    projects: []
  };
  const projects2 = await res.json();
  return {
    projects: projects2
  };
}
const projects = UNSAFE_withComponentProps(function Projects() {
  const {
    projects: projects2
  } = useLoaderData();
  return /* @__PURE__ */ jsx("main", {
    className: "min-h-screen py-12 px-6",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-4xl mx-auto",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-3xl font-bold mb-8",
        children: "Các dự án"
      }), /* @__PURE__ */ jsx("div", {
        className: "grid md:grid-cols-2 gap-6",
        children: projects2?.map((p) => /* @__PURE__ */ jsxs("article", {
          className: "border rounded-lg overflow-hidden",
          children: [p.thumbnail && /* @__PURE__ */ jsx("img", {
            src: p.thumbnail,
            alt: p.title,
            className: "w-full h-40 object-cover"
          }), /* @__PURE__ */ jsxs("div", {
            className: "p-4",
            children: [/* @__PURE__ */ jsx("h2", {
              className: "font-semibold text-lg",
              children: p.title
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-gray-600 mt-2",
              children: p.short_description
            }), /* @__PURE__ */ jsxs("div", {
              className: "mt-4 flex gap-2",
              children: [p.demo_url && /* @__PURE__ */ jsx("a", {
                href: p.demo_url,
                className: "text-sm text-blue-600",
                children: "Live ↗"
              }), p.repo_url && /* @__PURE__ */ jsx("a", {
                href: p.repo_url,
                className: "text-sm text-blue-600",
                children: "Repo ↗"
              })]
            })]
          })]
        }, p.id))
      })]
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: projects,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const contact = UNSAFE_withComponentProps(function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      await postContact({
        name,
        email,
        message
      });
      setStatus("ok");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
    }
  }
  return /* @__PURE__ */ jsx("main", {
    className: "min-h-screen py-12 px-6",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-2xl mx-auto",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-3xl font-bold mb-6",
        children: "Liên hệ"
      }), /* @__PURE__ */ jsxs("form", {
        onSubmit: handleSubmit,
        className: "space-y-4",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            className: "block text-sm font-medium",
            children: "Tên"
          }), /* @__PURE__ */ jsx("input", {
            value: name,
            onChange: (e) => setName(e.target.value),
            className: "mt-1 block w-full border rounded px-3 py-2"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            className: "block text-sm font-medium",
            children: "Email"
          }), /* @__PURE__ */ jsx("input", {
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: "mt-1 block w-full border rounded px-3 py-2"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("label", {
            className: "block text-sm font-medium",
            children: "Nội dung"
          }), /* @__PURE__ */ jsx("textarea", {
            value: message,
            onChange: (e) => setMessage(e.target.value),
            className: "mt-1 block w-full border rounded px-3 py-2",
            rows: 6
          })]
        }), /* @__PURE__ */ jsx("div", {
          children: /* @__PURE__ */ jsx("button", {
            type: "submit",
            className: "bg-black text-white px-4 py-2 rounded",
            children: "Gửi"
          })
        }), status === "ok" && /* @__PURE__ */ jsx("p", {
          className: "text-green-600",
          children: "Gửi thành công."
        }), status === "error" && /* @__PURE__ */ jsx("p", {
          className: "text-red-600",
          children: "Gửi thất bại, thử lại sau."
        })]
      })]
    })
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: contact
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CvDEkRgE.js", "imports": ["/assets/chunk-WWGJGFF6-BV3SjWWZ.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-CK6PM2Jj.js", "imports": ["/assets/chunk-WWGJGFF6-BV3SjWWZ.js"], "css": ["/assets/root-pzKmqBSr.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-ClIXZaso.js", "imports": ["/assets/chunk-WWGJGFF6-BV3SjWWZ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/projects": { "id": "routes/projects", "parentId": "root", "path": "/projects", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/projects-Cu68hJR9.js", "imports": ["/assets/chunk-WWGJGFF6-BV3SjWWZ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/contact": { "id": "routes/contact", "parentId": "root", "path": "/contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/contact-D2nsEsC6.js", "imports": ["/assets/chunk-WWGJGFF6-BV3SjWWZ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-26330aeb.js", "version": "26330aeb", "sri": void 0 };
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
  },
  "routes/projects": {
    id: "routes/projects",
    parentId: "root",
    path: "/projects",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "/contact",
    index: void 0,
    caseSensitive: void 0,
    module: route3
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
