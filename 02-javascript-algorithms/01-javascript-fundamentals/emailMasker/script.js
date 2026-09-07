function maskedEmail(email) {
  const ass = "*";
  let userName = email.slice(0, email.indexOf("@"));
  let index = email.indexOf("@");
  let count = index - 2;
  return (
    email?.slice(0, 1) +
    ass.repeat(count) +
    userName[userName.length - 2] +
    email?.slice(index)
  );
}

let email = "hello@world.com";
console.log(maskedEmail(email));
email = "cvorster5252@gmail.com";
console.log(maskedEmail(email));

/*
const ass = "*";
let userName = email.slice(0, email.indexOf("@"));
let index = email.indexOf("@");
let count = index - 2;
let maskedEmail =
  email?.slice(0, 1) +
  ass.repeat(count) +
  userName[userName.length - 2] +
  email?.slice(index);
console.log(maskedEmail); */
