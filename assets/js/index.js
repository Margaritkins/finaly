"use strict";

const socials = new Map();
socials.set("www.facebook.com", "./assets/icons/facebook.svg");
socials.set("twitter.com", "./assets/icons/twitter.svg");
socials.set("www.instagram.com", "./assets/icons/instagram.svg");
const chosen = new Set();

const root = document.getElementById("root");
const div = document.querySelector(".wrapper");
const choose = document.getElementById("choose");

fetch("./assets/js/data.json")
  .then((response) => response.json())
  .then((actors) => {
    // console.table(actors);
    const actorItems = actors
      .filter((actor) => actor.firstName && actor.lastName)
      .map((actor) => createActorItem(actor));
    root.append(...actorItems);
  })
  .catch((error) => {
    const messageError = createElement(
      "p",
      {},
      "something goes wrong... try again"
    );
    // console.log(error);
    root.append(messageError);
  });

function createActorItem({ firstName, lastName, profilePicture, contacts }) {
  const name = `${firstName}, ${lastName}`;
  const h2Initials = createElement(
    "h2",
    {
      classNames: ["actor-initials"],
    },
    document.createTextNode(getInitials(name))
  );

  const divPhotoWrapper = createElement(
    "div",
    {
      classNames: ["actor-photo-wrapper"],
    },
    h2Initials
  );

  const imgActor = createElement("img", {
    classNames: ["actor-photo"],
    attributes: { src: profilePicture },
    events: { load: handleImgLoad(divPhotoWrapper) },
  });

  const links = contacts.map((contact) => {
    const hostname = new URL(contact).hostname;
    const img = createElement("img", {
      attributes: {
        src: socials.get(hostname),
      },
    });
    return createElement("a", {}, img);
  });

  const imgWrapper = createElement(
    "div",
    {
      styles: {
        display: "flex",
        justifyContent: " center",
        justifyContent: "space-evenly",
      },
    },
    ...links
  );

  const h3 = createElement("h3", {}, firstName + " " + lastName);

  const article = createElement(
    "article",
    { classNames: ["article-style"] },
    divPhotoWrapper,

    h3,
    imgWrapper
  );

  const liItem = createElement(
    "li",
    {
      classNames: ["liItem-class"],
      events: {
        click: ({ target }) => {
          choose.innerText = "";
          choose.classList.add("choose-wrapper");
          chosen.add(target.innerText);
          choose.append(...chosen);
        },
      },
    },
    article
  );

  // liItem.addEventListener("click", ({ target }) => {
  //   choose.innerText = "";
  //   chosen.add(target.innerText);
  //   choose.append(...chosen);
  // });
  return liItem;
}
