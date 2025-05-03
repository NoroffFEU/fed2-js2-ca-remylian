import{a as l}from"./authGuard-D1nHpxub.js";import{o as u,a as m}from"./logout-DD9NAVNW.js";import{r as f}from"./read-gL9pyNTq.js";import{a as h,A as p}from"./apiClient-TX8OfoMt.js";async function y(a,e=25,t=1){const n=new URLSearchParams({q:a,limit:String(e),page:String(t),_author:"true"}),o=`${p}/search?${n}`;return await h(o,"GET")}function g(a,e){const t=document.querySelector(a);if(!t)return;const n=t.querySelector('input[type="search"], input#search-input');t.addEventListener("submit",o=>{o.preventDefault();const c=n.value.trim();e(c)})}l();const r=document.getElementById("posts-container"),i=document.getElementById("logout-button"),s=document.getElementById("feed-spinner"),E=localStorage.getItem("username");function S(a){r.innerHTML="",a.forEach(e=>{const t=document.createElement("div");t.classList.add("post-card");let n=` 
			<h2>${e.title}</h2>
			${e.media?.url?`<img src="${e.media.url}" class="post-media" alt="Banner for ${e.title}" />`:""}
      <p>${e.body}</p>
      <p><small>
        By 
        <a href="profile/?user=${encodeURIComponent(e.author.name)}">
          ${e.author.name}
        </a>
      </small></p>
      <a class="post-card-view" href="/post/?id=${e.id}">View Post</a>`;e.author.name===E&&(n+=`
			<div class="post-card-edit">
      <a href="post/edit/?id=${e.id}" class="button">Edit</a>
      <button class="delete-button" data-post-id="${e.id}">Delete</button>
    </div>`),t.innerHTML=n,r.appendChild(t)}),r.querySelectorAll(".delete-button").forEach(e=>e.addEventListener("click",m))}async function d(a="",e=50,t=1){s.hidden=!1;try{let n=a?await y(a,e,t):await f(e,t);S(n.data)}catch(n){console.error("Error loading feed",n),r.textContent="Failed to load post. Please try again later."}finally{s.hidden=!0}}g("#search-form",a=>{d(a)});d();i&&i.addEventListener("click",u);
