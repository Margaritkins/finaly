"use strict";

const socials = new Map();
socials.set("www.facebook.com", "./assets/icons/facebook.svg");
socials.set("twitter.com", "./assets/icons/twitter.svg");
socials.set("www.instagram.com", "./assets/icons/instagram.svg");

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
    // console.log(error);
    root.append("try again");
  });

function createActorItem({ firstName, lastName, profilePicture, contacts }) {
  const divPhotoWrapper = createElement("div", {
    classNames: ["actor-photo-wrapper"],
  });
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
      styles: { display: "inline- block" },
    },
    ...links
  );

  const h3 = createElement("h3", {}, firstName + " " + lastName);

  const article = createElement(
    "article",
    { classNames: ["article-style"] },
    divPhotoWrapper,
    imgActor,
    h3,
    imgWrapper
    // ...links
  );

  const divChooseWrapper = createElement("div", {
    classNames: ["choose-wrapper"],
  });

  const liItem = createElement(
    "li",
    {
      classNames: ["liItem-class"],
      event:{click: handleClick(divChooseWrapper)}
    },
    article
  );
  
  liItem.addEventListener("click", ({ target }) => {
    divChooseWrapper.append(target.innerText);
    const chosen = new Set();
    chosen.add(divChooseWrapper)
    choose.append(...chosen);
  });
  return liItem;
}



