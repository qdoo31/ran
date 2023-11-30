import{_ as a,o as s,c as e,R as t}from"./chunks/framework.bu1i8zgF.js";const m=JSON.parse('{"title":"convertImageToBase64","description":"","frontmatter":{},"headers":[],"relativePath":"en/src/ranuts/utils/convertImageToBase64.md","filePath":"en/src/ranuts/utils/convertImageToBase64.md","lastUpdated":1701311924000}'),o={name:"en/src/ranuts/utils/convertImageToBase64.md"},n=t(`<h1 id="convertimagetobase64" tabindex="-1">convertImageToBase64 <a class="header-anchor" href="#convertimagetobase64" aria-label="Permalink to &quot;convertImageToBase64&quot;">​</a></h1><p>图片转<code>base64</code></p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="return" tabindex="-1">Return <a class="header-anchor" href="#return" aria-label="Permalink to &quot;Return&quot;">​</a></h3><table><thead><tr><th>参数</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td><code>success</code></td><td>是否转换成功</td><td><code>boolean</code></td></tr><tr><td><code>data</code></td><td>转换成功后的值</td><td><code>string</code>,<code>ArrayBuffer</code> , <code>null</code></td></tr><tr><td><code>message</code></td><td>转换成功或失败的原因</td><td><code>string</code></td></tr></tbody></table><h3 id="options" tabindex="-1">Options <a class="header-anchor" href="#options" aria-label="Permalink to &quot;Options&quot;">​</a></h3><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>file</td><td>传入的文件</td><td><code>File</code></td><td>无</td></tr></tbody></table><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { convertImageToBase64 } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;ranuts&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">convertImageToBase64</span><span style="color:#E1E4E8;">(file).</span><span style="color:#B392F0;">then</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(result);</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { convertImageToBase64 } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;ranuts&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">convertImageToBase64</span><span style="color:#24292E;">(file).</span><span style="color:#6F42C1;">then</span><span style="color:#24292E;">((</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(result);</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre></div>`,9),l=[n];function r(p,c,d,i,h,E){return s(),e("div",null,l)}const u=a(o,[["render",r]]);export{m as __pageData,u as default};
