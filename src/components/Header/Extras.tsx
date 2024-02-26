import React from "react";

function Nav() {
  const links = [
    "News",
    "Sports",
    "Travel",
    "Lifestyle",
    "Technology",
    "Health",
    "Autos",
    "Business",
  ];
  return (
    <>
      <button>Manage Sources</button>
      <nav>
        {links.map((link) => (
          <React.Fragment key={link}>
            &nbsp;<a href="">{link}</a>&nbsp;
          </React.Fragment>
        ))}
      </nav>
      <section></section>
    </>
  );
}

export default Nav;
