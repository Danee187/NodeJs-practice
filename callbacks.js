const posts = [
    { title: 'Post One', body: 'This is post one' },
    { title: 'Post Two', body: 'This is post Two' }
];

function getPosts() {
    setTimeout(()=> {
        let output = '';
        posts.forEach((post, index)=> {
            output += `<li>${post.title}</li>`;
        });

        document.body.innerHTML = output;
    }, 1000);
}

function createPost(post, callbacks) {
    setTimeout(()=> {
        posts.push(post);
        callbacks();
    }, 2000);
}

//getPosts();

createPost({ title: 'Post Three', body: 'This is post Three' }, getPosts);