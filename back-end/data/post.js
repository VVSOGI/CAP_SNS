import * as userRepository from "./auth.js";

let posts = [
  {
    id: "1",
    text: "드림코더분들 화이팅!",
    createdAt: new Date().toString(),
    userId: "1",
  },
  {
    id: "2",
    text: "안뇽!",
    createdAt: new Date().toString(),
    userId: "1",
  },
];

export async function getAll() {
  return Promise.all(
    posts.map(async (post) => {
      const { username, name, url } = await userRepository.findById(
        post.userId
      );
      return { ...post, username, name, url };
    })
  );
}

export async function getAllByUsername(username) {
  return getAll().then((posts) =>
    posts.filter((post) => post.username === username)
  );
}

export async function getById(id) {
  const found = posts.find((post) => post.id == id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text, userId) {
  const post = {
    id: Date.now(),
    text,
    createdAt: new Date(),
    userId,
  };

  posts = [post, ...posts];
  return getById(post.id);
}

export async function update(id, text) {
  const post = posts.find((post) => post.id == id);
  if (post) {
    post.text = text;
  }
  return getById(post.id);
}

export async function remove(id) {
  posts = posts.filter((post) => post.id != id);
}
