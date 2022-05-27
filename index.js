const users = [
  { name: "User0", uri: "/users/0", email: "user0@company343.com", uris: { company: "/companies/343" } },
  { name: "User1", uri: "/users/1", email: "user0@company518.com", uris: { company: "/companies/518" } },
];

const isName0 = (users) => {
  return users.name === "User0";
};

console.log(users.find(isName0));
