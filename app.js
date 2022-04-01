// Register SW
let postSelect,postsContainer;
window.addEventListener('load', async function(){

    // register service worker : 
    // 1- check availiablity for sw : 
    postSelect=this.document.getElementById("postSelect");
    postsContainer=this.document.getElementById('postContainer');
    await fillSelect();
    postSelect.addEventListener('change',await displayDetails);
    if(this.navigator.serviceWorker){
        // available 

        // to register service worker use register with serviceWorker 
        await this.navigator.serviceWorker.register('./sw.js');
        console.log("Service Worker Exist ");

    }else{
        // not available
        console.log("Service Worker Not Exist ");
    }
});//end of load
async function fillSelect(){
    let allPosts = await fetch("https://jsonplaceholder.typicode.com/posts");
    let alljsbobjescts=await allPosts.json();
    postSelect.innerHTML=alljsbobjescts.map(post=>{
        return `<option value="${post.id}">${post.title}</option>`
    })
}

async function displayDetails(event){
    let targetPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${event.target.value}`);
    let jsObj = await targetPost.json();
    // title : body
    postsContainer.innerHTML=`
        <div style="border:2px solid black;padding:!0p ;margin:10px auto;width:80%">
            <h2 style="padding:10px ; border:2px solid black;text-align:center;background-color:gray;">${jsObj.title}</h2>
            <p style="margin:10px auto;text-align:center;background-color:orange;">${jsObj.body}</p>
        </div>
    `;
}