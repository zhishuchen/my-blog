import{_ as s,c as n,o as a,N as l}from"./chunks/framework.0711c8a0.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"articles/gulp的使用.md"}'),p={name:"articles/gulp的使用.md"},e=l(`<h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>随着前端诸如webpack，rollup，vite的发展，gulp感觉似乎好像被取代了。其实并没有，只不过它从台前退居到了幕后。我们仍然可以在很多项目中看到它的身影，比如elementplus、vant等。现在gulp更多的是做流程化的控制。</p><blockquote><p>比如我们要把一个大象放进冰箱里就需要 打开冰箱门-&gt;把大象放进冰箱-&gt;关上冰箱门，这就是一个简单的流程，使用gulp就可以规定这些流程，将这个流程自动化。</p></blockquote><p>所以我们可以使用它在项目开发过程中自动执行常见任务。比如打包一个组件库，我们可能要移除文件、copy文件，打包样式、打包组件、执行一些命令还有一键打包多个package等等都可以由gulp进行自定义流程的控制，非常的方便。</p><p>本文将主要介绍gulp的一些常用功能</p><h2 id="安装gulp" tabindex="-1">安装gulp <a class="header-anchor" href="#安装gulp" aria-label="Permalink to &quot;安装gulp&quot;">​</a></h2><p>首先全局安装gulp的脚手架</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm install --global gulp-cli</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>然后我们新建文件夹gulpdemo，然后执行 <strong>npm init -y</strong>,然后在这个项目下安装本地依赖gulp</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm install gulp -D    </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>此时我们gulp便安装好了，接下来我们在根目录下创建<strong>gulpfile.js</strong>文件，当gulp执行的时候会自动寻找这个文件。</p><h2 id="创建一个任务task" tabindex="-1">创建一个任务Task <a class="header-anchor" href="#创建一个任务task" aria-label="Permalink to &quot;创建一个任务Task&quot;">​</a></h2><p>每个gulp任务（task）都是一个异步的JavaScript函数，此函数是一个可以接收callback作为参数的函数，或者返回一个Promise等异步操作对象，比如创建一个任务可以这样写</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">exports.default = (cb) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(&quot;my task&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">  cb();</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>或者这样写</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">exports.default = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(&quot;my task&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">  return Promise.resolve();</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>然后终端输入<strong>gulp</strong>就会执行我们这个任务</p><h2 id="串行-series-和并行-parallel" tabindex="-1">串行(series)和并行(parallel) <a class="header-anchor" href="#串行-series-和并行-parallel" aria-label="Permalink to &quot;串行(series)和并行(parallel)&quot;">​</a></h2><p>这两个其实很好理解，串行就是任务一个一个执行，并行就是所有任务一起执行。下面先看串行演示</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const { series, parallel } = require(&quot;gulp&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const task1 = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(&quot;task1&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">  return new Promise((resolve) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      resolve();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }, 5000);</span></span>
<span class="line"><span style="color:#A6ACCD;">  });</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">const task2 = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(&quot;task2&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">  return Promise.resolve();</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">exports.default = series(task1, task2);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>控制台输出结果如下</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/004e4de43da446b2863c0f361c676f62~tplv-k3u1fbpfcp-watermark.image?" alt="1659025931632.jpg"></p><p>可以看出执行task1用了5s，然后再执行task2，再看下并行</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const { series, parallel } = require(&quot;gulp&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const task1 = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(&quot;task1&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">  return new Promise((resolve) =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">    setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">      resolve();</span></span>
<span class="line"><span style="color:#A6ACCD;">    }, 5000);</span></span>
<span class="line"><span style="color:#A6ACCD;">  });</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">const task2 = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  console.log(&quot;task2&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">  return Promise.resolve();</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">exports.default = parallel(task1, task2);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60b5c9fb35584efb8cc4e80f1027d221~tplv-k3u1fbpfcp-watermark.image?" alt="1659026080863.jpg"></p><p>可以看出两个任务是同时执行的</p><h2 id="src-和dest" tabindex="-1">src()和dest() <a class="header-anchor" href="#src-和dest" aria-label="Permalink to &quot;src()和dest()&quot;">​</a></h2><p>src()和dest()这两个函数在我们实际项目中经常会用到。src()表示创建一个读取文件系统的流，dest()是创建一个写入到文件系统的流。我们直接写一个copy 的示例</p><h3 id="复制" tabindex="-1">复制 <a class="header-anchor" href="#复制" aria-label="Permalink to &quot;复制&quot;">​</a></h3><p>在写之前我们先在我们项目根目录下新建一个src目录用于存放我们被复制的文件，在src下随便新建几个文件，如下图</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f0a59a1ec7e45fd9690be15dc5a2187~tplv-k3u1fbpfcp-watermark.image?" alt="1659026890254.jpg"></p><p>然后我们在<strong>gulpfile.js</strong>写下我们的copy任务：将src下的所有文件复制到dist文件夹下</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const { src, dest } = require(&quot;gulp&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const copy = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return src(&quot;src/*&quot;).pipe(dest(&quot;dist/&quot;));</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">exports.default = copy;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>然后执行gulp(默认执行exports.default)，我们就会发现根目录下多了个dist文件夹</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d2b95ad250947ea9ecb8e5e7c5a1088~tplv-k3u1fbpfcp-watermark.image?" alt="1659027082559.jpg"></p><h3 id="处理less文件" tabindex="-1">处理less文件 <a class="header-anchor" href="#处理less文件" aria-label="Permalink to &quot;处理less文件&quot;">​</a></h3><p>下面我们写个处理less文件的任务，首先我们先安装<strong>gulp-less</strong></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm i -D gulp-less</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><pre><code>然后我们在src下新建一个style/index.less并写下一段less语法样式
</code></pre><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@color: #fff;</span></span>
<span class="line"><span style="color:#A6ACCD;">.wrap {</span></span>
<span class="line"><span style="color:#A6ACCD;">  color: @color;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>然后<strong>gulpfile.js</strong>写下我们的lessTask：将我们style下的less文件解析成css并写入dist/style中</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const { src, dest } = require(&quot;gulp&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">const less = require(&quot;gulp-less&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">const lessTask = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return src(&quot;src/style/*.less&quot;).pipe(less()).pipe(dest(&quot;dist/style&quot;));</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">exports.default = lessTask;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>然后我们执行gulp命令就会发现dist/style/index.css</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">.wrap {</span></span>
<span class="line"><span style="color:#A6ACCD;">  color: #fff;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>我们还可以给css加前缀</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm install gulp-autoprefixe -D</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>将我们的src/style/index.less改为</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">@color: #fff;</span></span>
<span class="line"><span style="color:#A6ACCD;">.wrap {</span></span>
<span class="line"><span style="color:#A6ACCD;">  color: @color;</span></span>
<span class="line"><span style="color:#A6ACCD;">  display: flex;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>然后在<strong>gulpfile.js</strong>中使用gulp-autoprefixe</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const { src, dest } = require(&quot;gulp&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">const less = require(&quot;gulp-less&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">const autoprefixer = require(&quot;gulp-autoprefixer&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">const lessTask = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return src(&quot;src/style/*.less&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    .pipe(less())</span></span>
<span class="line"><span style="color:#A6ACCD;">    .pipe(</span></span>
<span class="line"><span style="color:#A6ACCD;">      autoprefixer({</span></span>
<span class="line"><span style="color:#A6ACCD;">        overrideBrowserslist: [&quot;&gt; 1%&quot;, &quot;last 2 versions&quot;],</span></span>
<span class="line"><span style="color:#A6ACCD;">        cascade: false, //  是否美化属性值</span></span>
<span class="line"><span style="color:#A6ACCD;">      })</span></span>
<span class="line"><span style="color:#A6ACCD;">    )</span></span>
<span class="line"><span style="color:#A6ACCD;">    .pipe(dest(&quot;dist/style&quot;));</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">exports.default = lessTask;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>处理后的dist/style/index.css就变成了</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">.wrap {</span></span>
<span class="line"><span style="color:#A6ACCD;">  color: #fff;</span></span>
<span class="line"><span style="color:#A6ACCD;">  display: -webkit-box;</span></span>
<span class="line"><span style="color:#A6ACCD;">  display: -ms-flexbox;</span></span>
<span class="line"><span style="color:#A6ACCD;">  display: flex;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="监听文件更改browser-sync" tabindex="-1">监听文件更改browser-sync <a class="header-anchor" href="#监听文件更改browser-sync" aria-label="Permalink to &quot;监听文件更改browser-sync&quot;">​</a></h2><p><strong>browser-sync</strong>是一个十分好用的浏览器同步测试工具，它可以搭建静态服务器，监听文件更改，并刷新页面（HMR）,下面来看下它的使用</p><p>首先肯定要先安装</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm i browser-sync -D </span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>然后我们在根目录下新建index.html</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        hello world</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>然后在<strong>gulpfile.js</strong>中进行配置</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const browserSync = require(&quot;browser-sync&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">const browserTask = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  browserSync.init({</span></span>
<span class="line"><span style="color:#A6ACCD;">    server: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      baseDir: &quot;./&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">  });</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">exports.default = browserTask;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>这时候就会启动一个默认3000端口的页面. 下面我们看如何监听页面变化。</p><p>首先我们要监听文件的改变，可以使用browserSync的watch,监听到文件改变后再刷新页面</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const { watch } = require(&quot;browser-sync&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">const browserSync = require(&quot;browser-sync&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">const { series } = require(&quot;gulp&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const reloadTask = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  browserSync.reload();</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const browserTask = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  browserSync.init({</span></span>
<span class="line"><span style="color:#A6ACCD;">    server: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      baseDir: &quot;./&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">  });</span></span>
<span class="line"><span style="color:#A6ACCD;">  watch(&quot;。/*&quot;, series(reloadTask));</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">exports.default = browserTask;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>此时改动src下的文件浏览器便会刷新。</p><p>下面我们将index.html引入dist/style/index.css的样式,然后来模拟一个简单的构建流</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;title&gt;Document&lt;/title&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;link rel=&quot;stylesheet&quot; href=&quot;../dist/style/index.css&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/head&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;div class=&quot;wrap&quot;&gt;hello world&lt;/div&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  &lt;/body&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/html&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>此时我们的流程是 <strong>编译less文件</strong>-&gt;<strong>将css写入dist/style</strong>-&gt;<strong>触发页面更新</strong></p><p>我们<strong>gulpfile.js</strong>可以这样写</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">const { src, dest } = require(&quot;gulp&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">const { watch } = require(&quot;browser-sync&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">const browserSync = require(&quot;browser-sync&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">const { series } = require(&quot;gulp&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">const less = require(&quot;gulp-less&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">const autoprefixer = require(&quot;gulp-autoprefixer&quot;);</span></span>
<span class="line"><span style="color:#A6ACCD;">const lessTask = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  return src(&quot;src/style/*.less&quot;)</span></span>
<span class="line"><span style="color:#A6ACCD;">    .pipe(less())</span></span>
<span class="line"><span style="color:#A6ACCD;">    .pipe(</span></span>
<span class="line"><span style="color:#A6ACCD;">      autoprefixer({</span></span>
<span class="line"><span style="color:#A6ACCD;">        overrideBrowserslist: [&quot;&gt; 1%&quot;, &quot;last 2 versions&quot;],</span></span>
<span class="line"><span style="color:#A6ACCD;">        cascade: false, //  是否美化属性值</span></span>
<span class="line"><span style="color:#A6ACCD;">      })</span></span>
<span class="line"><span style="color:#A6ACCD;">    )</span></span>
<span class="line"><span style="color:#A6ACCD;">    .pipe(dest(&quot;dist/style&quot;));</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">//页面刷新</span></span>
<span class="line"><span style="color:#A6ACCD;">const reloadTask = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  browserSync.reload();</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">const browserTask = () =&gt; {</span></span>
<span class="line"><span style="color:#A6ACCD;">  browserSync.init({</span></span>
<span class="line"><span style="color:#A6ACCD;">    server: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      baseDir: &quot;./&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">  });</span></span>
<span class="line"><span style="color:#A6ACCD;">  watch(&quot;./*.html&quot;, series(reloadTask));</span></span>
<span class="line"><span style="color:#A6ACCD;">  //监听样式更新触发两个任务</span></span>
<span class="line"><span style="color:#A6ACCD;">  watch(&quot;src/style/*&quot;, series(lessTask, reloadTask));</span></span>
<span class="line"><span style="color:#A6ACCD;">};</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">exports.default = browserTask;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><p>此时无论我们更改的是样式还是html都可以触发页面更新。</p><h2 id="最后" tabindex="-1">最后 <a class="header-anchor" href="#最后" aria-label="Permalink to &quot;最后&quot;">​</a></h2><p>后面我会将正在开发的vue3组件库的样式打包部分使用gulp处理，如果你对组件库开发感兴趣的话可以关注<a href="https://juejin.cn/column/7118932817119019015" title="https://juejin.cn/column/7118932817119019015" target="_blank" rel="noreferrer">Vite+TypeScript从零搭建Vue3组件库 - 东方小月的专栏 - 掘金 (juejin.cn)</a>，后续会实现一些常用组件，并以文章形式呈现。</p><blockquote><p>创作不易，你的点赞就是我的动力！如果感觉这篇文章对你有帮助的话就请点个赞吧，感谢~</p></blockquote><p>我正在参与掘金技术社区创作者签约计划招募活动，<a href="https://juejin.cn/post/7112770927082864653" title="https://juejin.cn/post/7112770927082864653" target="_blank" rel="noreferrer">点击链接报名投稿</a>。</p>`,74),o=[e];function t(c,r,i,C,A,u){return a(),n("div",null,o)}const d=s(p,[["render",t]]);export{g as __pageData,d as default};
