import * as postRepository from "../data/post.js";

export async function getPosts(req, res) {
  const username = req.query.username;
  const data = await (username
    ? postRepository.getAllByUsername()
    : postRepository.getAll());
  return res.status(200).json(data);
}

export async function getById(req, res, next) {
  const id = req.params.id;
  const post = await postRepository.getById(id);
  if (post) {
    return res.status(200).json(post);
  } else {
    return res.status(404).json({ message: "Post id not found🤪" });
  }
}

export async function create(req, res) {
  const { text, name, username } = req.body;
  const posts = await postRepository.create(text, name, username);
  return res.status(201).json(posts);
}

export async function update(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const post = await postRepository.update(id, text);
  if (post) {
    return res.status(200).json(post);
  } else {
    return res.status(404).json({ message: "Post id not found🤪" });
  }
}

export async function remove(req, res, next) {
  const id = req.params.id;
  await postRepository.remove(id);
  return res.sendStatus(204);
}
