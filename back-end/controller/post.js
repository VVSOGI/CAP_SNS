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
  const { text } = req.body;
  const posts = await postRepository.create(text, req.userId);
  return res.status(201).json(posts);
}

export async function update(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const posts = await postRepository.getById(id);

  if (!posts) {
    return res.sendStatus(404);
  } else if (posts.userId !== req.userId) {
    return res.sendStatus(403);
  }

  const updated = await postRepository.update(id, text);
  return res.status(200).json(updated);
}

export async function remove(req, res, next) {
  const id = req.params.id;
  const posts = await postRepository.getById(id);

  if (!posts) {
    return res.sendStatus(404);
  } else if (posts.userId !== req.userId) {
    return res.sendStatus(403);
  }

  await postRepository.remove(id);
  return res.sendStatus(204);
}
