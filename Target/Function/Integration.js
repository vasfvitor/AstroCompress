var x=(...[r={}])=>{Object.entries(r).forEach(([a,e])=>Object.defineProperty(r,a,{value:e===!0?d[a]:r[a]}));const{Path:o,Cache:s,Logger:w,Map:m,Exclude:h,Action:y,CSS:S,HTML:g,Image:j,JavaScript:b,SVG:A,Parser:l}=f(d,r),n=new Set;return typeof o<"u"&&(Array.isArray(o)||o instanceof Set)&&o.forEach(a=>n.add(a)),typeof l=="object"&&Object.entries(l).forEach(([a,e])=>Object.defineProperty(l,a,{value:Array.isArray(e)?e:[e]})),{name:"astro-compress",hooks:{"astro:build:done":async({dir:a})=>{if(typeof m=="object"){n.size||n.add(a),typeof s=="object"&&s.Search===P&&(s.Search=a);for(const[e,i]of Object.entries({CSS:S,HTML:g,Image:j,JavaScript:b,SVG:A})){if(!(i&&m[e])||typeof i!="object")return;p=f(y,f(y,{Wrote:async({Buffer:t,Input:c})=>{switch(e){case"CSS":return(await import("csso")).minify(t.toString(),i.csso).css;case"HTML":return await(await import("html-minifier-terser")).minify(t.toString(),i["html-minifier-terser"]);case"JavaScript":return(await(await import("terser")).minify(t.toString(),i.terser)).code??t;case"Image":return await(await import("../Function/Image/Writesharp.js")).default(i.sharp,{Buffer:t,Input:c});case"SVG":{const{data:T}=(await import("svgo")).optimize(t.toString(),i.svgo);return T??t}default:return t}},Fulfilled:async t=>t.Files>0?`Successfully compressed a total of ${t.Files} ${e} ${t.Files===1?"file":"files"} for ${await(await import("files-pipe/Target/Function/Bytes.js")).default(t.Info.Total)}.`:!1})),e==="Image"&&(p=f(p,{Read:async({Input:t})=>{const{format:c}=await u(t).metadata();return u(t,{failOn:"none",sequentialRead:!0,unlimited:!0,animated:c==="webp"||c==="gif"})}}));for(const t of n)await(await(await(await new(await import("files-pipe")).default(s,w).In(t)).By(m[e]??"**/*")).Not(h)).Pipe(p)}}}}}};const{default:d}=await import("../Variable/Option.js"),{default:{Cache:{Search:P}}}=await import("files-pipe/Target/Variable/Option.js"),{default:f}=await import("typescript-esbuild/Target/Function/Merge.js"),{default:u}=await import("sharp");let p;export{d as Default,u as Defaultsharp,f as Merge,P as Search,p as _Action,x as default};
