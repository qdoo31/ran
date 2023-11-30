import{_ as e,o as a,c as s,R as t}from"./chunks/framework.bu1i8zgF.js";const k=JSON.parse('{"title":"统计执行时间","description":"","frontmatter":{},"headers":[],"relativePath":"en/src/ranuts/utils/task.md","filePath":"en/src/ranuts/utils/task.md","lastUpdated":1701311924000}'),o={name:"en/src/ranuts/utils/task.md"},n=t(`<h1 id="统计执行时间" tabindex="-1">统计执行时间 <a class="header-anchor" href="#统计执行时间" aria-label="Permalink to &quot;统计执行时间&quot;">​</a></h1><p>有的时候，我们需要统计一个函数的执行时间，用于分析性能。因此封装了<code>startTask</code>和<code>taskEnd</code>函数。同时介绍其他三种统计方法</p><ol><li><code>new Date().getTime()</code>,</li><li><code>console.time()</code> 和 <code>console.timeEnd()</code>,</li><li><code>performance.now()</code></li></ol><h2 id="一-starttask-taskend" tabindex="-1">一.<code>startTask</code>,<code>taskEnd</code> <a class="header-anchor" href="#一-starttask-taskend" aria-label="Permalink to &quot;一.\`startTask\`,\`taskEnd\`&quot;">​</a></h2><h3 id="_1-starttask" tabindex="-1">1.startTask <a class="header-anchor" href="#_1-starttask" aria-label="Permalink to &quot;1.startTask&quot;">​</a></h3><p>任务开始之前执行</p><h4 id="return" tabindex="-1">Return <a class="header-anchor" href="#return" aria-label="Permalink to &quot;Return&quot;">​</a></h4><table><thead><tr><th>参数</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td>taskId</td><td>任务标识</td><td><code>unique symbol </code></td></tr></tbody></table><h3 id="_2-taskend" tabindex="-1">2.taskEnd <a class="header-anchor" href="#_2-taskend" aria-label="Permalink to &quot;2.taskEnd&quot;">​</a></h3><p>任务结束的时候执行，需要传入<code>startTask</code>返回的任务标识</p><h4 id="options" tabindex="-1">Options <a class="header-anchor" href="#options" aria-label="Permalink to &quot;Options&quot;">​</a></h4><table><thead><tr><th>参数</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>taskId</td><td>任务标识</td><td><code>unique symbol </code></td><td>无默认值，参数必传，否则无法识别是哪个任务</td></tr></tbody></table><h4 id="return-1" tabindex="-1">Return <a class="header-anchor" href="#return-1" aria-label="Permalink to &quot;Return&quot;">​</a></h4><table><thead><tr><th>参数</th><th>说明</th><th>类型</th></tr></thead><tbody><tr><td><code>time</code></td><td><code>task</code>执行的时间</td><td><code>number</code></td></tr></tbody></table><h3 id="_3-使用例子" tabindex="-1">3.使用例子 <a class="header-anchor" href="#_3-使用例子" aria-label="Permalink to &quot;3.使用例子&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">taskId</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">startTask</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// do something</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">time</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">taskEnd</span><span style="color:#E1E4E8;">(taskId);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;task 执行花费的时间&#39;</span><span style="color:#E1E4E8;">, time);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">taskId</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">startTask</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// do something</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">time</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">taskEnd</span><span style="color:#24292E;">(taskId);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;task 执行花费的时间&#39;</span><span style="color:#24292E;">, time);</span></span></code></pre></div><h2 id="二-new-date-gettime" tabindex="-1">二.new Date().getTime() <a class="header-anchor" href="#二-new-date-gettime" aria-label="Permalink to &quot;二.new Date().getTime()&quot;">​</a></h2><p><code>new Date().getTime()</code> 返回一个数值，表示从 1970 年 1 月 1 日 0 时 0 分 0 秒（UTC，即协调世界时）距离该日期对象所代表时间的毫秒数。用来计算 JS 执行时间会有两个问题：</p><ol><li>某些情况下，毫秒级精度可能不够。</li><li><code>new Date()</code> 解析的时间在不同浏览器，或者不同设备上可能并不一致。<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date" target="_blank" rel="noreferrer">MDN 说明</a><blockquote><p>由于浏览器之间的差异与不一致性，强烈不推荐使用 Date 构造函数来解析日期字符串 (或使用与其等价的 Date.parse)。对 RFC 2822 格式的日期仅有约定俗成的支持。对 ISO 8601 格式的支持中，仅有日期的串 (例如 &quot;1970-01-01&quot;) 会被处理为 UTC 而不是本地时间，与其他格式的串的处理不同。</p></blockquote></li></ol><h2 id="三-console-time-console-timeend" tabindex="-1">三.<code>console.time()</code>, <code>console.timeEnd()</code> <a class="header-anchor" href="#三-console-time-console-timeend" aria-label="Permalink to &quot;三.\`console.time()\`, \`console.timeEnd()\`&quot;">​</a></h2><p>启动一个计时器来跟踪某一个操作的占用时长。每一个计时器必须拥有唯一的名字，页面中最多能同时运行 10,000 个计时器。当以此计时器名字为参数调用 console.timeEnd() 时，浏览器将以毫秒为单位，输出对应计时器所经过的时间。比起<code>new Date().getTime()</code>，统计时间更加精确，可以统计到 0.001 毫秒(比如：0.134ms)</p><h2 id="四-performance-now" tabindex="-1">四.<code>performance.now()</code> <a class="header-anchor" href="#四-performance-now" aria-label="Permalink to &quot;四.\`performance.now()\`&quot;">​</a></h2><p><code>performance.now()</code>返回的时间精度最高可达微秒级，且不会受到系统时间的影响（系统时钟可能会被手动调整或被 NTP 等软件篡改）。另外，<code>performance.timing.navigationStart + performance.now()</code> 约等于 <code>Date.now()</code>。因此对于统计 JS 执行耗时方面，更推荐使用<code>performance.now()</code>。</p><blockquote><p>注意：为了提供对定时攻击和指纹的保护，<code>performance.now()</code> 的精度可能会根据浏览器的设置而被舍弃。 在 <code>Firefox</code> 中，<code>privacy.reduceTimerPrecision</code> 偏好是默认启用的，默认值为 <code>1ms</code>。可以启用 <code>privacy.resistFingerprinting</code> 这将精度改为 100ms 或<code>privacy.resistFingerprinting.reduceTimerPrecision.microseconds</code> 的值，以较大者为准。</p></blockquote>`,24),l=[n];function c(r,d,p,i,h,m){return a(),s("div",null,l)}const E=e(o,[["render",c]]);export{k as __pageData,E as default};
