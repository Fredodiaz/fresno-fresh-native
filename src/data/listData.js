const image = 'https://source.unsplash.com/user/erondu/200x200'

let post = (id) => {
     return {
        id: `${id}`,
        profileImg: image,
        posterName: 'John Doe',
        postTitle: 'Post Title Here',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        likes: 3
    }
}

let pushPost = {};

let POSTS = [];

for(let i = 0; i < 6; i++) {
    pushPost = post(i);
    POSTS.push(pushPost);
}

export default POSTS