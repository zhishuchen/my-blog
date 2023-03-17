import{_ as s,c as n,o as a,N as p}from"./chunks/framework.0711c8a0.js";const D=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/组件库环境搭建.md"}'),l={name:"articles/组件库环境搭建.md"},e=p(`<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>随着前端技术的发展，业界涌现出了许多的UI组件库。例如我们熟知的ElementUI,Vant，AntDesign等等。但是作为一个前端开发者，你知道一个UI组件库是如何被打造出来的吗?</p><p>读完这篇文章你将学会:</p><ul><li>如何使用pnpm搭建出一个Monorepo环境</li><li>如何使用vite搭建一个基本的Vue3脚手架项目</li><li>如何开发调试一个自己的UI组件库</li><li>如何使用vite打包并发布自己的UI组件库</li></ul><p>作为一个前端拥有一个属于自己的UI组件库是一件非常酷的事情。它不仅能让我们对组件的原理有更深的理解，还能在找工作的时候为自己增色不少。试问有哪个前端不想拥有一套属于自己的UI组件库呢？</p><p>本文将使用Vue3和TypeScript来编写一个组件库，使用Vite+Vue3来对这个组件库中的组件进行调试，最后使用vite来对组件库进行打包并且发布到npm上。最终的产物是一个名为kitty-ui的组件库。</p><p>话不多说~ 接下来让我们开始搭建属于我们自己的UI组件库吧</p><h2 id="monorepo环境" tabindex="-1">Monorepo环境 <a class="header-anchor" href="#monorepo环境" aria-label="Permalink to &quot;Monorepo环境&quot;">​</a></h2><p>首先我们要了解什么是Monorepo及它是如何搭建的吧</p><p>就是指在一个大的项目仓库中，管理多个模块/包（package），这种类型的项目大都在项目根目录下有一个packages文件夹，分多个项目管理。大概结构如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">-- packages</span></span>
<span class="line"><span style="color:#A6ACCD;">  -- pkg1</span></span>
<span class="line"><span style="color:#A6ACCD;">    --package.json</span></span>
<span class="line"><span style="color:#A6ACCD;">  -- pkg2</span></span>
<span class="line"><span style="color:#A6ACCD;">    --package.json</span></span>
<span class="line"><span style="color:#A6ACCD;">--package.json</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>简单来说就是<strong>单仓库 多项目</strong></p><p>目前很多我们熟知的项目都是采用这种模式，如Vant，ElementUI，Vue3等。打造一个Monorepo环境的工具有很多，如：lerna、pnpm、yarn等，这里我们将使用pnpm来开发我们的UI组件库。</p><p>为什么要使用pnpm?</p><p>因为它简单高效，它没有太多杂乱的配置，它相比于lerna操作起来方便太多</p><p>好了，下面我们就开始用pnpm来进行我们的组件库搭建吧</p><h2 id="使用pnpm" tabindex="-1">使用pnpm <a class="header-anchor" href="#使用pnpm" aria-label="Permalink to &quot;使用pnpm&quot;">​</a></h2><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm install pnpm -g</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="初始化package-json" tabindex="-1">初始化package.json <a class="header-anchor" href="#初始化package-json" aria-label="Permalink to &quot;初始化package.json&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">pnpm init</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="新建配置文件-npmrc" tabindex="-1">新建配置文件 .npmrc <a class="header-anchor" href="#新建配置文件-npmrc" aria-label="Permalink to &quot;新建配置文件 .npmrc&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">shamefully-hoist = true</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>这里简单说下为什么要配置<strong>shamefully-hoist</strong>。</p><p>如果某些工具仅在根目录的<strong>node_modules</strong>时才有效，可以将其设置为true来提升那些不在根目录的<strong>node_modules</strong>，就是将你安装的依赖包的依赖包的依赖包的...都放到同一级别（扁平化）。说白了就是不设置为true有些包就有可能会出问题。</p><h2 id="monorepo的实现" tabindex="-1">monorepo的实现 <a class="header-anchor" href="#monorepo的实现" aria-label="Permalink to &quot;monorepo的实现&quot;">​</a></h2><p>接下就是pnpm如何实现monorepo的了。</p><p>为了我们各个项目之间能够互相引用我们要新建一个<strong>pnpm-workspace.yaml</strong>文件将我们的包关联起来</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">packages:</span></span>
<span class="line"><span style="color:#A6ACCD;">    - &#39;packages/**&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">    - &#39;examples&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>这样就能将我们项目下的packages目录和examples目录关联起来了，当然如果你想关联更多目录你只需要往里面添加即可。根据上面的目录结构很显然你在根目录下新packages和examples文件夹，packages文件夹存放我们开发的包，examples用来调试我们的组件</p><p>examples文件夹就是接下来我们要<strong>使用vite搭建一个基本的Vue3脚手架项目</strong>的地方</p><h2 id="安装对应依赖" tabindex="-1">安装对应依赖 <a class="header-anchor" href="#安装对应依赖" aria-label="Permalink to &quot;安装对应依赖&quot;">​</a></h2><p>我们开发环境中的依赖一般全部安装在整个项目根目录下，方便下面我们每个包都可以引用,所以在安装的时候需要加个 <strong>-w</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">pnpm i vue@next typescript less -D -w</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>因为我们开发的是vue3组件， 所以需要安装vue3，当然ts肯定是必不可少的（当然如果你想要js开发也是可以的，甚至可以省略到很多配置和写法。但是ts可以为我们组件加上类型，并且使我们的组件有代码提示功能，未来ts也将成为主流)；less为了我们写样式方便，以及使用它的命名空间（这个暂时这里没用到，后面有时间再补</p><ul><li>配置tsconfig.json</li></ul><p>这里的配置就不细说了，可以自行搜索都是代表什么意思。或者你可以先直接复制</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npx tsc --init</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>tsconfig.json:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;compilerOptions&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;baseUrl&quot;: &quot;.&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;jsx&quot;: &quot;preserve&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;strict&quot;: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;target&quot;: &quot;ES2015&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;module&quot;: &quot;ESNext&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;skipLibCheck&quot;: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;esModuleInterop&quot;: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;moduleResolution&quot;: &quot;Node&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;lib&quot;: [&quot;esnext&quot;, &quot;dom&quot;]</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="手动搭建一个基于vite的vue3项目" tabindex="-1">手动搭建一个基于vite的vue3项目 <a class="header-anchor" href="#手动搭建一个基于vite的vue3项目" aria-label="Permalink to &quot;手动搭建一个基于vite的vue3项目&quot;">​</a></h2><p>其实搭建一个vite+vue3项目是非常容易的，因为vite已经帮我们做了大部分事情</p><h3 id="初始化仓库" tabindex="-1">初始化仓库 <a class="header-anchor" href="#初始化仓库" aria-label="Permalink to &quot;初始化仓库&quot;">​</a></h3><p>进入examples文件夹，执行</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">pnpm init</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="安装vite和-vitejs-plugin-vue" tabindex="-1">安装vite和@vitejs/plugin-vue <a class="header-anchor" href="#安装vite和-vitejs-plugin-vue" aria-label="Permalink to &quot;安装vite和@vitejs/plugin-vue&quot;">​</a></h3><p>@vitejs/plugin-vue用来支持.vue文件的转译</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">pnpm install vite @vitejs/plugin-vue -D -w</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>这里安装的插件都放在根目录下</p><h3 id="配置vite-config-ts" tabindex="-1">配置vite.config.ts <a class="header-anchor" href="#配置vite-config-ts" aria-label="Permalink to &quot;配置vite.config.ts&quot;">​</a></h3><p>新建vite.config.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import { defineConfig } from &#39;vite&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import vue from &#39;@vitejs/plugin-vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export default defineConfig({</span></span>
<span class="line"><span style="color:#A6ACCD;">    plugins:[vue()]</span></span>
<span class="line"><span style="color:#A6ACCD;">})</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="新建html文件" tabindex="-1">新建html文件 <a class="header-anchor" href="#新建html文件" aria-label="Permalink to &quot;新建html文件&quot;">​</a></h3><p>@vitejs/plugin-vue 会默认加载examples下的index.html</p><p>新建index.html</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;script src=&quot;main.ts&quot; type=&quot;module&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><b>注意：</b> vite 是基于esmodule的 所以type=&quot;module&quot;</p><h3 id="新建app-vue模板" tabindex="-1">新建app.vue模板 <a class="header-anchor" href="#新建app-vue模板" aria-label="Permalink to &quot;新建app.vue模板&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        启动测试</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="新建main-ts" tabindex="-1">新建main.ts <a class="header-anchor" href="#新建main-ts" aria-label="Permalink to &quot;新建main.ts&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import {createApp} from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import App from &#39;./app.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const app = createApp(App)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">app.mount(&#39;#app&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>此时会发现编译器会提示个错误：找不到模块“./app.vue”或其相应的类型声明</p><p>因为直接引入.vue文件 TS会找不到对应的类型声明；所以需要新建typings（命名没有明确规定，TS会自动寻找.d.ts文件）文件夹来专门放这些声明文件。</p><p>typings/vue-shim.d.ts</p><p>TypeScriptTS默认只认ES 模块。如果你要导入.vue文件就要declare module把他们声明出来。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">declare module &#39;*.vue&#39; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    import type { DefineComponent } from &quot;vue&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    const component:DefineComponent&lt;{},{},any&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="配置脚本启动项目" tabindex="-1">配置脚本启动项目 <a class="header-anchor" href="#配置脚本启动项目" aria-label="Permalink to &quot;配置脚本启动项目&quot;">​</a></h3><p>最后在package.json文件中配置scripts脚本</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;dev&quot;: &quot;vite&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>然后终端输入我们熟悉的命令：pnpm run dev</p><p>vite启动默认端口为3000；在浏览器中打开localhost:3000 就会看我们的“启动测试”页面。</p><h2 id="本地调试" tabindex="-1">本地调试 <a class="header-anchor" href="#本地调试" aria-label="Permalink to &quot;本地调试&quot;">​</a></h2><h3 id="新建包文件" tabindex="-1">新建包文件 <a class="header-anchor" href="#新建包文件" aria-label="Permalink to &quot;新建包文件&quot;">​</a></h3><p>本节可能和目前组件的开发关联不大，但是未来组件需要引入一些工具方法的时候会用到</p><p>接下来就是要往我们的packages文件夹冲填充内容了。</p><ul><li>utils包</li></ul><p>一般packages要有utils包来存放我们公共方法，工具函数等</p><p>既然它是一个包，所以我们新建utils目录后就需要初始化它，让它变成一个包；终端进入utils文件夹执行：pnpm init 然后会生成一个package.json文件；这里需要改一下包名，我这里将name改成@kitty-ui/utils表示这个utils包是属于kitty-ui这个组织下的。所以记住发布之前要登录npm新建一个组织；例如kitty-ui</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;name&quot;: &quot;@kitty-ui/utils&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;version&quot;: &quot;1.0.0&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;description&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;main&quot;: &quot;index.ts&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;test&quot;: &quot;echo \\&quot;Error: no test specified\\&quot; &amp;&amp; exit 1&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;keywords&quot;: [],</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;author&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;license&quot;: &quot;ISC&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>因为我们使用ts写的，所以需要将入口文件index.js改为index.ts，并新建index.ts文件:(先导出一个简单的加法函数)</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">export const testfun = (a:number,b:number):number=&gt;{</span></span>
<span class="line"><span style="color:#A6ACCD;">    return a + b</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>组件库包(这里命名为kitty-ui)</li></ul><p>components是我们用来存放各种UI组件的包</p><p>新建components文件夹并执行 pnpm init 生成package.json</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;name&quot;: &quot;kitty-ui&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;version&quot;: &quot;1.0.0&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;description&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;main&quot;: &quot;index.ts&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;test&quot;: &quot;echo \\&quot;Error: no test specified\\&quot; &amp;&amp; exit 1&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;keywords&quot;: [],</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;author&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;license&quot;: &quot;ISC&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>新建index.ts入口文件并引入utils包</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import {testfun} from &#39;@kitty-ui/utils&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const result = testfun (1,1)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(result)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>esno</li></ul><p>由于组件库是基于ts的，所以需要安装esno来执行ts文件便于测试组件之间的引入情况</p><p>控制台输入<strong>esno xxx.ts</strong>即可执行ts文件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm i esno -g</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h3 id="包之间本地调试" tabindex="-1">包之间本地调试 <a class="header-anchor" href="#包之间本地调试" aria-label="Permalink to &quot;包之间本地调试&quot;">​</a></h3><p>进入components文件夹执行</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">pnpm install @kitty-ui/utils</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>你会发现pnpm会自动创建个软链接直接指向我们的utils包；此时components下的packages：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;name&quot;: &quot;kitty-ui&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;version&quot;: &quot;1.0.0&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;description&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;main&quot;: &quot;src/index.ts&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;test&quot;: &quot;echo \\&quot;Error: no test specified\\&quot; &amp;&amp; exit 1&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;keywords&quot;: [],</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;author&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;license&quot;: &quot;ISC&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;dependencies&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;@kitty-ui/utils&quot;: &quot;workspace:^1.0.1&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>你会发现它的依赖@kitty-ui/utils对应的版本为：workspace:^1.0.0；因为pnpm是由workspace管理的，所以有一个前缀workspace可以指向utils下的工作空间从而方便本地调试各个包直接的关联引用。</p><p>到这里基本开发方法我们已经知道啦；接下来就要进入正题了，开发一个button组件</p><h2 id="试着开发一个button组件" tabindex="-1">试着开发一个button组件 <a class="header-anchor" href="#试着开发一个button组件" aria-label="Permalink to &quot;试着开发一个button组件&quot;">​</a></h2><p>在components文件夹下新建src,同时在src下新建button组件目录和icon组件目录(新建icon为了便于调试);此时components文件目录如下</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">-- components</span></span>
<span class="line"><span style="color:#A6ACCD;">  -- src</span></span>
<span class="line"><span style="color:#A6ACCD;">    -- button</span></span>
<span class="line"><span style="color:#A6ACCD;">    -- icon</span></span>
<span class="line"><span style="color:#A6ACCD;">    -- index.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">-- package.json</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>让我们先测试一下我们的button组件能否在我们搭建的examples下的vue3项目本引用~</p><p>首先在button下新建一个简单的button.vue</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;button&gt;测试按钮&lt;/button&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>然后在button/index.ts将其导出</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import Button from &#39;./button.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export default Button</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>因为我们开发组件库的时候不可能只有button，所以我们需要一个components/index.ts将我们开发的组件一个个的集中导出</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import Button from &#39;./button&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export {</span></span>
<span class="line"><span style="color:#A6ACCD;">    Button</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>好了，一个组件的大体目录差不多就是这样了，接下来请进入我们的examples来看看能否引入我们的button组件</p><h2 id="vue3项目使用button" tabindex="-1">vue3项目使用button <a class="header-anchor" href="#vue3项目使用button" aria-label="Permalink to &quot;vue3项目使用button&quot;">​</a></h2><p>上面已经说过执行在workspace执行 pnpm i xxx的时候pnpm会自动创建个软链接直接指向我们的xxx包。</p><p>所以这里我们直接在examples执行：pnpm i kitty-ui</p><p>此时你就会发现packages.json的依赖多了个</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&quot;kitty-ui&quot;: &quot;workspace:^1.0.0&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>这时候我们就能直接在我们的测试项目下引入我们本地的components组件库了，启动我们的测试项目，来到我们的 <strong>examples/app.vue</strong> 直接引入Button</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &lt;Button /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;script lang=&quot;ts&quot; setup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { Button } from &#39;kitty-ui&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>不出意外的话你的页面就会展示我们刚刚写的button组件了</p><p>好了万事具...(其实还差个打包，这个后面再说~)；接下来的工作就是专注于组件的开发了；让我们回到我们的button组件目录下（测试页面不用关，此时我们已经可以边开发边调试边看效果了）</p><p>因为我们的button组件是需要接收很多属性的，如type、size等等，所以我们要新建个types.ts文件来规范这些属性</p><p>在button目录下新建types.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">import { ExtractPropTypes } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export const ButtonType = [&#39;default&#39;, &#39;primary&#39;, &#39;success&#39;, &#39;warning&#39;, &#39;danger&#39;]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export const ButtonSize = [&#39;large&#39;, &#39;normal&#39;, &#39;small&#39;, &#39;mini&#39;];</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export const buttonProps = {</span></span>
<span class="line"><span style="color:#A6ACCD;">  type: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    type: String,</span></span>
<span class="line"><span style="color:#A6ACCD;">    values: ButtonType</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  size: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    type: String,</span></span>
<span class="line"><span style="color:#A6ACCD;">    values: ButtonSize</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export type ButtonProps = ExtractPropTypes&lt;typeof buttonProps&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><strong>TIPS</strong></p><p>import type 表示只导入类型；ExtractPropTypes是vue3中内置的类型声明,它的作用是接收一个类型，然后把对应的vue3所接收的props类型提供出来，后面有需要可以直接使用</p><p>很多时候我们在vue中使用一个组件会用的app.use 将组件挂载到全局。要使用app.use函数的话我们需要让我们的每个组件都提供一个install方法，app.use()的时候就会调用这个方法;</p><p>我们将button/index.ts调整为</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import button from &#39;./button.vue&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import type {App,Plugin} from &quot;vue&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">type SFCWithInstall&lt;T&gt; = T&amp;Plugin</span></span>
<span class="line"><span style="color:#A6ACCD;">const withInstall = &lt;T&gt;(comp:T) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    (comp as SFCWithInstall&lt;T&gt;).install = (app:App)=&gt;{</span></span>
<span class="line"><span style="color:#A6ACCD;">        //注册组件</span></span>
<span class="line"><span style="color:#A6ACCD;">        app.component((comp as any).name,comp)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">    return comp as SFCWithInstall&lt;T&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">const Button = withInstall(button)</span></span>
<span class="line"><span style="color:#A6ACCD;">export default Button</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>此时我们就可以使用app.use来挂载我们的组件啦</p><p>其实withInstall方法可以做个公共方法放到工具库里，因为后续每个组件都会用到，这里等后面开发组件的时候再调整</p><p>到这里组件开发的基本配置已经完成，最后我们对我们的组件库以及工具库进行打包，打包之前如果要发公共包的话记得将我们的各个包的协议改为MIT开源协议</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;license&quot;: &quot;MIT&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="vite打包" tabindex="-1">vite打包 <a class="header-anchor" href="#vite打包" aria-label="Permalink to &quot;vite打包&quot;">​</a></h2><h3 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to &quot;配置文件&quot;">​</a></h3><p>打包们这里选择vite，它有一个库模式专门为我们来打包这种库组件的。</p><p>前面已经安装过vite了，所以这里直接在components下直接新建vite.config.ts(配置参数文件中已经注释):</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">import { defineConfig } from &quot;vite&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">import vue from &quot;@vitejs/plugin-vue&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">export default defineConfig(</span></span>
<span class="line"><span style="color:#A6ACCD;">    {</span></span>
<span class="line"><span style="color:#A6ACCD;">        build: {</span></span>
<span class="line"><span style="color:#A6ACCD;">            target: &#39;modules&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            //打包文件目录</span></span>
<span class="line"><span style="color:#A6ACCD;">            outDir: &quot;es&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            //压缩</span></span>
<span class="line"><span style="color:#A6ACCD;">            minify: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">            //css分离</span></span>
<span class="line"><span style="color:#A6ACCD;">            //cssCodeSplit: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">            rollupOptions: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                //忽略打包vue文件</span></span>
<span class="line"><span style="color:#A6ACCD;">                external: [&#39;vue&#39;],</span></span>
<span class="line"><span style="color:#A6ACCD;">                input: [&#39;src/index.ts&#39;],</span></span>
<span class="line"><span style="color:#A6ACCD;">                output: [</span></span>
<span class="line"><span style="color:#A6ACCD;">                    {</span></span>
<span class="line"><span style="color:#A6ACCD;">                        format: &#39;es&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        //不用打包成.es.js,这里我们想把它打包成.js</span></span>
<span class="line"><span style="color:#A6ACCD;">                        entryFileNames: &#39;[name].js&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        //让打包目录和我们目录对应</span></span>
<span class="line"><span style="color:#A6ACCD;">                        preserveModules: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        //配置打包根目录</span></span>
<span class="line"><span style="color:#A6ACCD;">                        dir: &#39;es&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        preserveModulesRoot: &#39;src&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">                    },</span></span>
<span class="line"><span style="color:#A6ACCD;">                    {</span></span>
<span class="line"><span style="color:#A6ACCD;">                        format: &#39;cjs&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        entryFileNames: &#39;[name].js&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        //让打包目录和我们目录对应</span></span>
<span class="line"><span style="color:#A6ACCD;">                        preserveModules: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        //配置打包根目录</span></span>
<span class="line"><span style="color:#A6ACCD;">                        dir: &#39;lib&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        preserveModulesRoot: &#39;src&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">                    }</span></span>
<span class="line"><span style="color:#A6ACCD;">                ]</span></span>
<span class="line"><span style="color:#A6ACCD;">            },</span></span>
<span class="line"><span style="color:#A6ACCD;">            lib: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                entry: &#39;./index.ts&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                formats: [&#39;es&#39;, &#39;cjs&#39;]</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        plugins: [</span></span>
<span class="line"><span style="color:#A6ACCD;">            vue()</span></span>
<span class="line"><span style="color:#A6ACCD;">        ]</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>这里我们选择打包cjs(CommonJS)和esm(ESModule)两种形式,cjs模式主要用于服务端引用(ssr),而esm就是我们现在经常使用的方式，它本身自带treeShaking而不需要额外配置按需引入(前提是你将模块分别导出)，非常好用~</p><p>其实到这里就已经可以直接打包了；components下执行： pnpm run build你就会发现打包了es和lib两个目录</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd1f139224304b159fdf12ad5836a2c0~tplv-k3u1fbpfcp-watermark.image?" alt="kitty_1.jpg"></p><p>到这里其实打包的组件库只能给js项目使用,在ts项目下运行会出现一些错误，而且使用的时候还会失去代码提示功能，这样的话我们就失去了用ts开发组件库的意义了。所以我们需要在打包的库里加入声明文件(.d.ts)。</p><p>那么如何向打包后的库里加入声明文件呢？ 其实很简单，只需要引入<strong>vite-plugin-dts</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">pnpm i vite-plugin-dts -D -w</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>然后修改一下我们的vite.config.ts引入这个插件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import { defineConfig } from &quot;vite&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">import vue from &quot;@vitejs/plugin-vue&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">import dts from &#39;vite-plugin-dts&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export default defineConfig(</span></span>
<span class="line"><span style="color:#A6ACCD;">    {</span></span>
<span class="line"><span style="color:#A6ACCD;">        build: {...},</span></span>
<span class="line"><span style="color:#A6ACCD;">        plugins: [</span></span>
<span class="line"><span style="color:#A6ACCD;">            vue(),</span></span>
<span class="line"><span style="color:#A6ACCD;">            dts({</span></span>
<span class="line"><span style="color:#A6ACCD;">                //指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json</span></span>
<span class="line"><span style="color:#A6ACCD;">                tsConfigFilePath: &#39;../../tsconfig.json&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">            }),</span></span>
<span class="line"><span style="color:#A6ACCD;">            //因为这个插件默认打包到es下，我们想让lib目录下也生成声明文件需要再配置一个</span></span>
<span class="line"><span style="color:#A6ACCD;">            dts({</span></span>
<span class="line"><span style="color:#A6ACCD;">                outputDir:&#39;lib&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                tsConfigFilePath: &#39;../../tsconfig.json&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">            })</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        ]</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>因为这个插件默认打包到es下，我们想让lib目录下也生成声明文件需要再配置一个dts插件，暂时没有想到其它更好的处理方法~</p><p>然后执行打包命令你就会发现你的es和lib下就有了声明文件</p><p>其实后面就可以进行发布了，发布之前更改一下我们components下的package.json如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;name&quot;: &quot;kitty-ui&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;version&quot;: &quot;1.0.0&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;main&quot;: &quot;lib/index.js&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;module&quot;:&quot;es/index.js&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;build&quot;: &quot;vite build&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;files&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;es&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;lib&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  ],</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;keywords&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;kitty-ui&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;vue3组件库&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  ],</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;author&quot;: &quot;小月&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;license&quot;: &quot;MIT&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;description&quot;: &quot;&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;typings&quot;: &quot;lib/index.d.ts&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>解释一下里面部分字段</p><p><strong>pkg.module</strong></p><p>我们组件库默认入口文件是传统的CommonJS模块，但是如果你的环境支持ESModule的话，构建工具会优先使用我们的module入口</p><p><strong>pkg.files</strong></p><p>files是指我们1需要发布到npm上的目录，因为不可能components下的所有目录都被发布上去</p><h2 id="开始发布" tabindex="-1">开始发布 <a class="header-anchor" href="#开始发布" aria-label="Permalink to &quot;开始发布&quot;">​</a></h2><blockquote><p>如果打包和发布流程你想做到自动化控制,你可以先点个赞,然后直接阅读 <a href="https://juejin.cn/post/7126493560190271525" target="_blank" rel="noreferrer">从0搭建Vue3组件库:使用gulp自动化处理打包与发布</a> 当然你也可以继续往下阅读,看下本篇文章的处理方式</p></blockquote><p>做了那么多终于到发布的阶段了；其实npm发包是很容易的，就拿我们的组件库kitty-ui举例吧</p><p>发布之前记得到<a href="https://www.npmjs.com/" target="_blank" rel="noreferrer">npm</a>官网注册个账户,如果你要发布@xx/xx这种包的话需要在npm新建个组织组织组织名就是@后面的，比如我建的组织就是kitty-ui,注册完之后你就可以发布了</p><p>首先要将我们代码提交到git仓库，不然pnpm发布无法通过，后面每次发版记得在对应包下执行 <strong>pnpm version patch</strong>你就会发现这个包的版本号patch(版本号第三个数) +1 了，同样的 <strong>pnpm version major</strong> major和 <strong>pnpm version minor</strong> 分别对应版本号的第一和第二位增加。</p><p>如果你发布的是公共包的话，在对应包下执行</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">pnpm publish --access public</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>输入你的账户和密码（记得输入密码的时候是不显示的，不要以为卡了）正常情况下应该是发布成功了</p><p><strong>注意</strong></p><p>发布的时候要将npm的源切换到npm的官方地址(<a href="https://registry.npmjs.org/" target="_blank" rel="noreferrer">https://registry.npmjs.org/</a>); 如果你使用了其它镜像源的话</p><h2 id="样式问题" tabindex="-1">样式问题 <a class="header-anchor" href="#样式问题" aria-label="Permalink to &quot;样式问题&quot;">​</a></h2><p>引入我们打包后的组件你会发现没有样式，所以你需要在全局引入我们的style.css才行；如 main.ts中需要</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import &#39;kitty-ui/es/style.css&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>很显然这种组件库并不是我们想要的，我们需要的组件库是每个css样式放在每个组件其对应目录下，这样就不需要每次都全量导入我们的css样式。</p><p>下面就让我们来看下如何把样式拆分打包</p><h3 id="处理less文件" tabindex="-1">处理less文件 <a class="header-anchor" href="#处理less文件" aria-label="Permalink to &quot;处理less文件&quot;">​</a></h3><p>首先我们需要做的是将less打包成css然后放到打包后对应的文件目录下,我们在components下新建build文件夹来存放我们的一些打包工具,然后新建buildLess.ts,首先我们需要先安装一些工具cpy和fast-glob</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">pnpm i cpy fast-glob -D -w</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>cpy</li></ul><p>它可以直接复制我们规定的文件并将我们的文件copy到指定目录,比如buildLess.ts:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import cpy from &#39;cpy&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { resolve } from &#39;path&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const sourceDir = resolve(__dirname, &#39;../src&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">//lib文件</span></span>
<span class="line"><span style="color:#A6ACCD;">const targetLib = resolve(__dirname, &#39;../lib&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">//es文件</span></span>
<span class="line"><span style="color:#A6ACCD;">const targetEs = resolve(__dirname, &#39;../es&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">console.log(sourceDir);</span></span>
<span class="line"><span style="color:#A6ACCD;">const buildLess = async () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    await cpy(\`\${sourceDir}/**/*.less\`, targetLib)</span></span>
<span class="line"><span style="color:#A6ACCD;">    await cpy(\`\${sourceDir}/**/*.less\`, targetEs)</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">buildLess()</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>然后在package.json中新增命令</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;build&quot;: &quot;vite build&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;build:less&quot;: &quot;esno build/buildLess&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>终端执行 <strong>pnpm run build:less</strong> 你就会发现lib和es文件对应目录下就出现了less文件.</p><p>但是我们最终要的并不是less文件而是css文件,所以我们要将less打包成css,所以我们需要用的less模块.在ts中引入less因为它本身没有声明文件所以会出现类型错误,所以我们要先安装它的 <strong>@types/less</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">pnpm i --save-dev @types/less -D -w</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>buildLess.ts如下(详细注释都在代码中)</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import cpy from &#39;cpy&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { resolve, dirname } from &#39;path&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">import { promises as fs } from &quot;fs&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">import less from &quot;less&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">import glob from &quot;fast-glob&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">const sourceDir = resolve(__dirname, &#39;../src&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">//lib文件目录</span></span>
<span class="line"><span style="color:#A6ACCD;">const targetLib = resolve(__dirname, &#39;../lib&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">//es文件目录</span></span>
<span class="line"><span style="color:#A6ACCD;">const targetEs = resolve(__dirname, &#39;../es&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">//src目录</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const srcDir = resolve(__dirname, &#39;../src&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const buildLess = async () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    //直接将less文件复制到打包后目录</span></span>
<span class="line"><span style="color:#A6ACCD;">    await cpy(\`\${sourceDir}/**/*.less\`, targetLib)</span></span>
<span class="line"><span style="color:#A6ACCD;">    await cpy(\`\${sourceDir}/**/*.less\`, targetEs)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    //获取打包后.less文件目录(lib和es一样)</span></span>
<span class="line"><span style="color:#A6ACCD;">    const lessFils = await glob(&quot;**/*.less&quot;, { cwd: srcDir, onlyFiles: true })</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    //遍历含有less的目录</span></span>
<span class="line"><span style="color:#A6ACCD;">    for (let path in lessFils) {</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        const filePath = \`\${srcDir}/\${lessFils[path]}\`</span></span>
<span class="line"><span style="color:#A6ACCD;">        //获取less文件字符串</span></span>
<span class="line"><span style="color:#A6ACCD;">        const lessCode = await fs.readFile(filePath, &#39;utf-8&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">        //将less解析成css</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        const code = await less.render(lessCode, {</span></span>
<span class="line"><span style="color:#A6ACCD;">            //指定src下对应less文件的文件夹为目录</span></span>
<span class="line"><span style="color:#A6ACCD;">            paths: [srcDir, dirname(filePath)]</span></span>
<span class="line"><span style="color:#A6ACCD;">        })</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        //拿到.css后缀path</span></span>
<span class="line"><span style="color:#A6ACCD;">        const cssPath = lessFils[path].replace(&#39;.less&#39;, &#39;.css&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        //将css写入对应目录</span></span>
<span class="line"><span style="color:#A6ACCD;">        await fs.writeFile(resolve(targetLib, cssPath), code.css)</span></span>
<span class="line"><span style="color:#A6ACCD;">        await fs.writeFile(resolve(targetEs, cssPath), code.css)</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">buildLess()</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>执行打包命令之后你会发现对应文件夹下多了.css文件</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a4d62ff556a46cd8ecead9d98b327d4~tplv-k3u1fbpfcp-watermark.image?" alt="1657259623489.jpg"></p><p>现在我已经将css文件放入对应的目录下了,但是我们的相关组件并没有引入这个css文件;所以我们需要的是每个打包后组件的index.js中出现如:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import &quot;xxx/xxx.css&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>之类的代码我们的css才会生效;所以我们需要对vite.config.ts进行相关配置</p><p>首先我们先将.less文件忽略</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">external: [&#39;vue&#39;, /\\.less/],</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>这时候打包后的文件中如button/index.js就会出现</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import &quot;./style/index.less&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>然后我们再将打包后代码的.less换成.css就大功告成了</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">plugins: [</span></span>
<span class="line"><span style="color:#A6ACCD;">            ...</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">            {</span></span>
<span class="line"><span style="color:#A6ACCD;">                name: &#39;style&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                generateBundle(config, bundle) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    //这里可以获取打包后的文件目录以及代码code</span></span>
<span class="line"><span style="color:#A6ACCD;">                    const keys = Object.keys(bundle)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">                    for (const key of keys) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                        const bundler: any = bundle[key as any]</span></span>
<span class="line"><span style="color:#A6ACCD;">                        //rollup内置方法,将所有输出文件code中的.less换成.css,因为我们当时没有打包less文件</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">                        this.emitFile({</span></span>
<span class="line"><span style="color:#A6ACCD;">                            type: &#39;asset&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                            fileName: key,//文件名名不变</span></span>
<span class="line"><span style="color:#A6ACCD;">                            source: bundler.code.replace(/\\.less/g, &#39;.css&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">                        })</span></span>
<span class="line"><span style="color:#A6ACCD;">                    }</span></span>
<span class="line"><span style="color:#A6ACCD;">                }</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">        ...</span></span>
<span class="line"><span style="color:#A6ACCD;">        ]</span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>我们最终的vite.config.ts如下</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">import { defineConfig } from &quot;vite&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">import vue from &quot;@vitejs/plugin-vue&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">import dts from &#39;vite-plugin-dts&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">export default defineConfig(</span></span>
<span class="line"><span style="color:#A6ACCD;">    {</span></span>
<span class="line"><span style="color:#A6ACCD;">        build: {</span></span>
<span class="line"><span style="color:#A6ACCD;">            target: &#39;modules&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            //打包文件目录</span></span>
<span class="line"><span style="color:#A6ACCD;">            outDir: &quot;es&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            //压缩</span></span>
<span class="line"><span style="color:#A6ACCD;">            minify: false,</span></span>
<span class="line"><span style="color:#A6ACCD;">            //css分离</span></span>
<span class="line"><span style="color:#A6ACCD;">            //cssCodeSplit: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">            rollupOptions: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                //忽略打包vue和.less文件</span></span>
<span class="line"><span style="color:#A6ACCD;">                external: [&#39;vue&#39;, /\\.less/],</span></span>
<span class="line"><span style="color:#A6ACCD;">                input: [&#39;src/index.ts&#39;],</span></span>
<span class="line"><span style="color:#A6ACCD;">                output: [</span></span>
<span class="line"><span style="color:#A6ACCD;">                    {</span></span>
<span class="line"><span style="color:#A6ACCD;">                        format: &#39;es&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        //不用打包成.es.js,这里我们想把它打包成.js</span></span>
<span class="line"><span style="color:#A6ACCD;">                        entryFileNames: &#39;[name].js&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        //让打包目录和我们目录对应</span></span>
<span class="line"><span style="color:#A6ACCD;">                        preserveModules: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        //配置打包根目录</span></span>
<span class="line"><span style="color:#A6ACCD;">                        dir: &#39;es&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        preserveModulesRoot: &#39;src&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">                    },</span></span>
<span class="line"><span style="color:#A6ACCD;">                    {</span></span>
<span class="line"><span style="color:#A6ACCD;">                        format: &#39;cjs&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        //不用打包成.mjs</span></span>
<span class="line"><span style="color:#A6ACCD;">                        entryFileNames: &#39;[name].js&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        //让打包目录和我们目录对应</span></span>
<span class="line"><span style="color:#A6ACCD;">                        preserveModules: true,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        //配置打包根目录</span></span>
<span class="line"><span style="color:#A6ACCD;">                        dir: &#39;lib&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                        preserveModulesRoot: &#39;src&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">                    }</span></span>
<span class="line"><span style="color:#A6ACCD;">                ]</span></span>
<span class="line"><span style="color:#A6ACCD;">            },</span></span>
<span class="line"><span style="color:#A6ACCD;">            lib: {</span></span>
<span class="line"><span style="color:#A6ACCD;">                entry: &#39;./index.ts&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                formats: [&#39;es&#39;, &#39;cjs&#39;]</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        plugins: [</span></span>
<span class="line"><span style="color:#A6ACCD;">            vue(),</span></span>
<span class="line"><span style="color:#A6ACCD;">            dts({</span></span>
<span class="line"><span style="color:#A6ACCD;">                //指定使用的tsconfig.json为我们整个项目根目录下掉,如果不配置,你也可以在components下新建tsconfig.json</span></span>
<span class="line"><span style="color:#A6ACCD;">                tsConfigFilePath: &#39;../../tsconfig.json&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">            }),</span></span>
<span class="line"><span style="color:#A6ACCD;">            //因为这个插件默认打包到es下，我们想让lib目录下也生成声明文件需要再配置一个</span></span>
<span class="line"><span style="color:#A6ACCD;">            dts({</span></span>
<span class="line"><span style="color:#A6ACCD;">                outputDir: &#39;lib&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                tsConfigFilePath: &#39;../../tsconfig.json&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">            }),</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">            {</span></span>
<span class="line"><span style="color:#A6ACCD;">                name: &#39;style&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                generateBundle(config, bundle) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                    //这里可以获取打包后的文件目录以及代码code</span></span>
<span class="line"><span style="color:#A6ACCD;">                    const keys = Object.keys(bundle)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">                    for (const key of keys) {</span></span>
<span class="line"><span style="color:#A6ACCD;">                        const bundler: any = bundle[key as any]</span></span>
<span class="line"><span style="color:#A6ACCD;">                        //rollup内置方法,将所有输出文件code中的.less换成.css,因为我们当时没有打包less文件</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">                        this.emitFile({</span></span>
<span class="line"><span style="color:#A6ACCD;">                            type: &#39;asset&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                            fileName: key,//文件名名不变</span></span>
<span class="line"><span style="color:#A6ACCD;">                            source: bundler.code.replace(/\\.less/g, &#39;.css&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">                        })</span></span>
<span class="line"><span style="color:#A6ACCD;">                    }</span></span>
<span class="line"><span style="color:#A6ACCD;">                }</span></span>
<span class="line"><span style="color:#A6ACCD;">            }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        ]</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>最后我们将打包less与打包组件合成一个命令(package.json):</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">&quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;build&quot;: &quot;vite build &amp; esno build/buildLess&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">  },</span></span>
<span class="line"><span style="color:#A6ACCD;">...</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>后续直接执行pnpm run build 即可完成所有打包啦</p><h2 id="直接使用" tabindex="-1">直接使用 <a class="header-anchor" href="#直接使用" aria-label="Permalink to &quot;直接使用&quot;">​</a></h2><p>如果你不想一步步的搭建，想直接使用现成的话，你可以直接把项目clone下来-&gt;<strong><a href="https://gitee.com/geeksdidi/kittyui/tree/44e3268cf6e8bdb24d447341c545f80c075c456c" target="_blank" rel="noreferrer">kittyui第一版</a></strong>,然后你只需要以下几步便可将其完成</p><ul><li>安装pnpm npm i pnpm -g</li><li>安装esno npm i esno -g</li><li>安装所有依赖 pnpm install</li><li>本地测试 进入examples文件夹执行 pnpm run dev 启动vue3项目</li><li>打包 pnpm run build</li></ul><h2 id="写在最后" tabindex="-1">写在最后 <a class="header-anchor" href="#写在最后" aria-label="Permalink to &quot;写在最后&quot;">​</a></h2><p>由于作者水平有限，难免会存在一些错误或不妥之处，希望各位能够不吝指出，一定及时修改。如果你对这个项目有更好的想法或者建议也欢迎在评论区提出，不胜感激。</p><p>后续我会对一些常用组件进行开发，每个组件的开发都会以文章的形式展现出来以供大家参考。也欢迎大家将项目fork下来，提交自己组件或者对kittyui的修改到<a href="https://gitee.com/geeksdidi/kittyui" target="_blank" rel="noreferrer">kittyui</a></p><p>创作不易，你的点赞就是我的动力！如果感觉对自己有帮助的话就请点个赞吧，感谢~</p><p>如果你对组件开发感兴趣的话欢迎关注下面的<a href="https://juejin.cn/column/7118932817119019015" target="_blank" rel="noreferrer">专栏</a></p><p><strong>下一篇</strong></p><ul><li><a href="https://juejin.cn/post/7121381989864701982" target="_blank" rel="noreferrer">button组件的开发</a></li></ul><p>我正在参与掘金技术社区创作者签约计划招募活动，<a href="https://juejin.cn/post/7112770927082864653" title="https://juejin.cn/post/7112770927082864653" target="_blank" rel="noreferrer">点击链接报名投稿</a>。</p>`,207),o=[e];function t(c,i,r,C,A,u){return a(),n("div",null,o)}const d=s(l,[["render",t]]);export{D as __pageData,d as default};
