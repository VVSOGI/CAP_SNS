let users = [
  {
    id: "1",
    username: "bob",
    password: "$2b$12$t3FdrTaLrF7xUMs8vPDF3On6ddv6E/8WuCkc2Vws7U4OCJZMbIF4S",
    name: "Bob",
    email: "Bob@amail.com",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "2",
    username: "ellie",
    password: "$2b$12$t3FdrTaLrF7xUMs8vPDF3On6ddv6E/8WuCkc2Vws7U4OCJZMbIF4S",
    name: "Ellie",
    email: "ellie@amail.com",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id == id);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}
