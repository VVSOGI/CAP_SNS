let posts = [
  {
    id: "1",
    text: "취업 가즈아아아ㅏㅏ",
    createdAt: Date.now().toString(),
    name: "Tom",
    username: "Tom",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "2",
    text: "hi!",
    createdAt: Date.now().toString(),
    name: "Ellie",
    username: "Ellie",
  },
];

export async function getAll() {
  return posts;
}

export async function getAllByUsername(username) {
  return posts.filter((post) => post.username === username);
}

export async function getById(id) {
  return posts.find((post) => post.id === id);
}

export async function create(text, name, username) {
  const post = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  posts = [post, ...posts];
  return posts;
}

export async function update(id, text) {
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.text = text;
  }
  return post;
}

export async function remove(id) {
  posts = posts.filter((post) => post.id !== id);
}
