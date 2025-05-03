import{a as d}from"./authGuard-D1nHpxub.js";import{a as c}from"./read-gL9pyNTq.js";import{a as m,o as u}from"./logout-DD9NAVNW.js";import"./apiClient-TX8OfoMt.js";d();(async function(){const a=new URLSearchParams(window.location.search).get("id");if(!a){window.location.href="/";return}const n=document.getElementById("post-spinner"),e=document.getElementById("single-post");let t;try{n.hidden=!1,e.textContent="",{data:t}=await c(a);const o=localStorage.getItem("username")?.toLowerCase(),s=t.author.name.toLowerCase()===o,i=`
      ${t.media?.url?`<img src="${t.media.url}" alt="Banner for ${t.title}">`:""}
      <div class="post-container-info">
        <h1>${t.title}</h1>
        <p>${t.body}</p>
        <p><small>
          By
          <a href="profile/?user=${encodeURIComponent(t.author.name)}">
            ${t.author.name}
          </a>
        </small></p>
      </div>
      <div class="post-actions">
        ${s?`<a href="post/edit/?id=${t.id}" class="button">Edit</a>
               <button id="delete-button" class="button">Delete</button>`:'<a href="/fed2-js2-ca-remylian/" class="button">Back to Feed</a>'}
      </div>
    `;e.innerHTML=i,s&&e.querySelector("#delete-button").addEventListener("click",async()=>{try{await m({target:{getAttribute:()=>t.id}})}catch(l){console.error(l),alert("Failed to delete post")}})}catch(o){console.error("Fialed to load post",o)}finally{n.hidden=!0}const r=document.getElementById("logout-button");r&&r.addEventListener("click",u)})();
