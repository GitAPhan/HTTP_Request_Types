// success function for submitting post
function submit_post_success(response) {
    var status_message = document.getElementById('status_message');
    status_message.innerText = "Post Successful!"
}

// failure function for submitting post
function submit_post_failure(error) {
    var status_message = document.getElementById('status_message');
    status_message.innerText = "Post FAIL!!"
}

// function to post text submitted in the form
function submit_post(event) {
    console.log(event);

    // grabbed the post title and body and stored in variable
    var post_title = event.path[1][0].value;
    var post_body = event.path[1][1].value;

    axios.request({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "POST",
        data: {
            title: post_title,
            body: post_body
        }
    }).then(submit_post_success).catch(submit_post_failure);
}

////////////// ############################## /////////

// success function for submitting post
function patch_post_success(response) {
    var status_message = document.getElementById('status_message');
    status_message.innerText = "Post UPDATE Successful!"
    console.log(status_message.innerText);
}

// failure function for submitting post
function patch_post_failure(error) {
    var status_message = document.getElementById('status_message');
    status_message.innerText = "Post UPDATE FAIL!!"
    console.log(status_message.innerText);
}

// function to patch post
function patch_post() {
    axios.request({
        url: "https://jsonplaceholder.typicode.com/posts/1",
        method: "PATCH",
        data: {
            title: "this is my title",
            body: "this is my super long body!! Wow so much text"
        }
    }).then(patch_post_success).catch(patch_post_failure);
}

////////////////////// ############################## //////////////////////////

// success function for submitting post
function delete_post_success(response) {
    var status_message = document.getElementById('status_message');
    status_message.innerText = "Post DELETED!"
    console.log(status_message.innerText);
}

// failure function for submitting post
function delete_post_failure(error) {
    var status_message = document.getElementById('status_message');
    status_message.innerText = "Post DELETE FAILED!!"
    console.log(status_message.innerText);
}

// function to patch post
function delete_post() {
    axios.request({
        url: "https://jsonplaceholder.typicode.com/posts/1",
        method: "DELETE"
    }).then(delete_post_success).catch(delete_post_failure);
}

////////////////////// ############################## /////////////////////////

// adding event to post_submit to call submit post function
var post_submit = document.getElementById('post_submit');
post_submit.addEventListener('click', submit_post);

// adding event to update last post button to call patch post function
var update_last_post = document.getElementById('update_post');
update_last_post.addEventListener('click', patch_post);

// adding event to delete last post to call delete post function
var delete_last_post = document.getElementById('delete_post');
delete_last_post.addEventListener('click', delete_post);

////////////////////// ############################## /////////////////////////

// success function for displaying posts
function post_get_success(response) {
    // post container to append posts to
    var post_container = document.getElementById('all_posts');

    // loop to create 'cards'
    for (var i = 0; i < response['data'].length; i++) {
        // div to contain post 'card'
        var new_post = document.createElement('div');
        // attributes to hide some values that we may use afterwards
        new_post.setAttribute('postID', response['data'][i]['id']);
        new_post.classList.add('post');

        // post title
        var new_post_title = document.createElement('h3');
        new_post_title.innerText = "Title: " + response['data'][i]['title'];
        new_post.appendChild(new_post_title);

        // post body
        var new_post_body = document.createElement('p');
        new_post_body.innerText = response['data'][i]['body'];
        new_post.appendChild(new_post_body);

        post_container.appendChild(new_post);
    }
}

// failure function for displaying posts
function post_get_failure(error) {
    var status_message = document.getElementById('status_message');
    status_message.innerText = "Loading POSTs FAILED!"
    console.log(status_message.innerText);
}

// get request to get all posts
axios.request({
    url: "https://jsonplaceholder.typicode.com/posts"
}).then(post_get_success).catch(post_get_failure);

/////////////////////////////// ############################################## ////////////////////////////////

// success function for grabbing comments
function comment_success(response) {

    // variable for post id
    var postID = response['data'][0]['postId'];
    var post_to_attach_comments = document.querySelector(`div[postId="${postID}"]`);

    // created details to hide comments in 
    var details_comment = document.createElement('details');
    var comment_title = document.createElement('summary');
    comment_title.innerText = "Comments";
    details_comment.appendChild(comment_title);

    // loop to add in comments
    for (var i = 0; i < response['data'].length; i++) {
        var new_comment_container = document.createElement('article');

        var comment_name = document.createElement('h4');
        comment_name.innerText = response['data'][i]['name'];
        new_comment_container.appendChild(comment_name);

        var comment_body = document.createElement('p');
        comment_body.innerText = response['data'][i]['body'];
        new_comment_container.appendChild(comment_body);

        var comment_email = document.createElement('a');
        comment_email.href = "mailto:" + response['data'][i]['email'];
        comment_email.innerText = response['data'][i]['email'];
        new_comment_container.appendChild(comment_email);

        details_comment.appendChild(new_comment_container);
    }
    post_to_attach_comments.appendChild(details_comment);
}

// failure function for grabbing comments
function comment_failure(error) {
    var status_message = document.getElementById('status_message');
    status_message.innerText = "Failed to load comments!!"
    console.log(status_message.innerText);
}

// function to grab comment per post
function comment_get(event) {
    // post container
    var post_container = document.getElementById('all_posts');
    var array_of_posts = post_container.children;

    // loop to grab all comments per post
    for (var i = 0; i < array_of_posts.length; i++) {
        axios.request({
            url: `https://jsonplaceholder.typicode.com/posts/${i + 1}/comments`
        }).then(comment_success).catch(comment_failure);
    }

}

// button to load comments
var load_comments_button = document.getElementById('comments_button');
load_comments_button.addEventListener('click', comment_get);
